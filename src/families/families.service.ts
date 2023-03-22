import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family } from './models/family.schema';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(Family.name)
    private readonly familiesModel: Model<Family>,
  ) {}

  create(createFamilyDto: CreateFamilyDto) {
    return new this.familiesModel(createFamilyDto).save();
  }

  async findAll() {
    const members = await this.familiesModel.find().exec();
    return members?.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }

  async findSibling(id: string) {
    const members = await this.familiesModel
      .find({
        parentIds: id,
      })
      .exec();
    return members.map(
      (mem: any) => <any>{ ...mem._doc, id: mem._doc._id.toString() },
    );
  }
  async findParents(id: string) {
    const member: any = await this.familiesModel.findById(id).exec();
    return <any>{ ...member._doc, id: member._doc._id.toString() };
  }

  findOne(id: string) {
    return this.familiesModel.findById(id).exec();
  }

  update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return this.familiesModel.findByIdAndUpdate(id, updateFamilyDto);
  }

  remove(id: string) {
    return this.familiesModel.findByIdAndDelete(id);
  }
}
