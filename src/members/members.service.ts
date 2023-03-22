import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Link } from './entities/link.schema';
import { Members } from './entities/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Members.name)
    private readonly membersModel: Model<Members>,
    @InjectModel(Link.name)
    private readonly LinkModel: Model<Link>,
  ) {}

  /******* Members */
  async create(famId: string, createMemberDto: CreateMemberDto) {
    const members = await this.membersModel.find({ famId }).exec();
    let partner: any;
    partner = await new this.membersModel({
      ...createMemberDto,
      root: members.length === 0,
      famId,
    }).save();
    if (partner.motherId && partner.fatherId) {
      return await new this.LinkModel({
        source: partner.motherId.toString(),
        target: partner._id.toString(),
        label: 'Mere',
        famId,
      }).save();
    } else if (partner.femalePartenersId.length > 0) {
      // update link
      await partner.femalePartenersId.map(async (fem) => {
        const link = await new this.LinkModel({
          source: partner._id.toString(),
          target: fem.toString(),
          label: 'Marie',
          famId,
        }).save();
      });
    } else if (partner.malPartenerIds.length > 0) {
      // update link
      await partner.malPartenerIds.map(async (male) => {
        return await new this.LinkModel({
          source: male.toString(),
          target: partner._id.toString(),
          label: 'Marie',
          famId,
        }).save();
      });
    }
    await this.membersModel.updateMany(
      { _id: partner.malPartenerIds },
      { $set: { femalePartenersId: partner._id } },
    );
    return partner;
  }

  async findAll(famId: string) {
    const members = await this.membersModel.find({ famId }).exec();
    return members.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }

  async findOne(id: string) {
    return this.membersModel.findById(id).exec();
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return this.membersModel.findByIdAndUpdate(id, updateMemberDto);
  }

  remove(id: string) {
    return this.membersModel.findByIdAndDelete(id);
  }

  removeAll() {
    return this.membersModel.deleteMany({});
  }

  /************ Links */

  async deleteAllLinks() {
    return await this.LinkModel.deleteMany({});
  }

  async findAllNodesAndRel(famId: string) {
    const members = await this.membersModel.find({ famId }).exec();
    const links = await this.LinkModel.find({ famId }).exec();
    const ret = {
      nodes: members.map(
        (mem: any) =>
          <any>{
            ...mem._doc,
            label: mem._doc.name,
            id: mem._doc._id.toString(),
          },
      ),
      links,
    };
    return ret;
  }
  /************ Sibling */
  async findSibling(famId: string, id: string, sex: string) {
    const members = await this.membersModel
      .find({
        famId,
        ...(sex === 'F' && { motherId: id }),
        ...(sex === 'H' && { fatherId: id }),
      })
      .exec();
    return members.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }

  /******* Partners */
  /**
   * get all partners of member in specific family
   * @param famId
   * @param partnerId
   * @returns
   */
  async findPartners(famId: string, partnerId: string) {
    const parts = await this.membersModel
      .find({
        famId,
        _id: partnerId,
      })
      .then(async (partners: any[]) => {
        const partnerss = [];
        for (const partnersOne of partners) {
          partnerss.push({
            ...partnersOne._doc,
            enfants: await this.membersModel
              .find({
                motherId: partnersOne._doc._id.toString(),
              })
              .exec(),
          });
        }
        return partnerss;
      });
    return parts;
  }
  /**
   * Add new partner for member in specific family
   * @param famId
   * @param partnerId
   * @param createMemberDto
   * @returns
   */
  async addPartner(
    famId: string,
    partnerId: string,
    createMemberDto: CreateMemberDto,
  ) {
    // recuperation de l'ancien Partener
    const existingParner = await this.membersModel.findById(partnerId);
    const partToBeAdded = await new this.membersModel({
      ...createMemberDto,
      famId,
    }).save();
    await this.membersModel.findByIdAndUpdate(partnerId, {
      ...(existingParner.sex === 'F' && {
        $push: { malPartenerIds: partToBeAdded._id },
      }),
      ...(existingParner.sex === 'H' && {
        $push: { femalePartenersId: partToBeAdded._id },
      }),
    });

    await new this.LinkModel({
      source:
        existingParner.sex === 'F'
          ? partToBeAdded._id.toString()
          : existingParner._id.toString(),
      target:
        existingParner.sex === 'F'
          ? existingParner._id.toString()
          : partToBeAdded._id.toString(),
      label: 'Marie',
      famId,
    }).save();

    return partToBeAdded;
  }

  /**
   *
   * @param famId
   * @param id
   * @param sex
   * @returns
   */
  async findPartner(famId: string, id: string, sex: string) {
    return await this.membersModel
      .find({
        famId,
        ...(sex === 'F' && { femalePartenersId: id }),
        ...(sex === 'H' && { malPartenerIds: id }),
      })
      .exec();
  }

  /************ Parent */
  async findParents(id: string) {
    return await this.membersModel.findById(id).exec();
  }
  async addParent(
    famId: string,
    siblingId: string,
    createMemberDto: CreateMemberDto,
  ) {
    const parent = await new this.membersModel({
      ...createMemberDto,
      parentId: null,
      famId,
    }).save();
    const member: any = await this.membersModel.findByIdAndUpdate(siblingId, {
      parentIds: parent._id,
    });
    return <any>{ ...member._doc, id: member._doc._id.toString() };
  }
}
