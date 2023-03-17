import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Members } from './entities/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Members.name)
    private readonly membersModel: Model<Members>,
  ) {}

  create(famId: string, createMemberDto: CreateMemberDto) {
    return new this.membersModel({ ...createMemberDto, famId }).save();
  }

  async findAll(famID: string) {
    const members = await this.membersModel.find({ famID }).exec();
    return members.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }

  async findSibling(id: string) {
    const members = await this.membersModel
      .find({
        parentId: id,
      })
      .exec();
    return members.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }
  async findParents(id: string) {
    const member: any = await this.membersModel.findById(id).exec();
    return <any>{ ...member._doc, id: member._doc._id.toString() };
  }

  findOne(id: string) {
    return this.membersModel.findById(id).exec();
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return this.membersModel.findByIdAndUpdate(id, updateMemberDto);
  }

  remove(id: string) {
    return this.membersModel.findByIdAndDelete(id);
  }
}
