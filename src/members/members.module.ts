import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MembersSchema } from './entities/members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Members.name, schema: MembersSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
