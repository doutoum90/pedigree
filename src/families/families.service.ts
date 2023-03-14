import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Members } from '../families/models/members.schema';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(Members.name)
    private readonly membersModel: Model<Members>,
  ) {}

  create(createFamilyDto: CreateFamilyDto) {
    return new this.membersModel(createFamilyDto).save();
  }

  async findAll() {
    const members = await this.membersModel.find().exec();
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

  update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return this.membersModel.findByIdAndUpdate(id, updateFamilyDto);
  }

  remove(id: string) {
    return this.membersModel.findByIdAndDelete(id);
  }
}
