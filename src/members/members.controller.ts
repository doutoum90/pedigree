import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('families/:famId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(
    @Param('famId') famID: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.membersService.create(famID, {
      ...createMemberDto,
      profileUrl: 'https://fakeimg.pl/100/',
      imageUrl: 'https://fakeimg.pl/100/',
    });
  }

  @Get()
  async findAll(@Param('famId') famID: string) {
    return (await this.membersService.findAll(famID)) as any;
  }

  @Get('/sibling/:id')
  async findSibling(@Param('id') id: string) {
    return (await this.membersService.findSibling(id)) as any;
  }

  @Get('parents/:id')
  findParents(@Param('id') id: string) {
    return this.membersService.findParents(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
