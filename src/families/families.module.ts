import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { Members, MembersSchema } from './models/members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Members.name, schema: MembersSchema }]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
