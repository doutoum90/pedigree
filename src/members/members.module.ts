import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MembersSchema } from './entities/members.schema';
import { Link, LinkSchema } from './entities/link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Members.name, schema: MembersSchema }]),
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
