import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';

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
  @Get('/node')
  async findAllNodesAndRel(@Param('famId') famID: string) {
    return (await this.membersService.findAllNodesAndRel(famID)) as any;
  }

  @Get('/sibling/:id')
  async findSibling(
    @Query() req: { sex: string },
    @Param('famId') famID: string,
    @Param('id') id: string,
  ) {
    return (await this.membersService.findSibling(famID, id, req.sex)) as any;
  }

  @Get('parents/:id')
  async findParents(@Param('id') id: string) {
    return await this.membersService.findParents(id);
  }
  @Get('partner/:id')
  findPartner(
    @Param('famId') famID: string,
    @Param('id') id: string,
    @Query() req: { sex: string },
  ) {
    return this.membersService.findPartner(famID, id, req.sex);
  }
  @Get('partners')
  findPartners(
    @Param('famId') famID: string,
    @Query() req: { sex: string; partnerId: string },
  ) {
    return this.membersService.findPartners(famID, req.partnerId);
  }

  @Post('parents/:siblingId')
  addParent(
    @Param('famId') famID: string,
    @Body() createMemberDto: CreateMemberDto,
    @Param('siblingId') siblingId: string,
  ) {
    return this.membersService.addParent(famID, siblingId, createMemberDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete('liens')
  deleteAllLinks() {
    return this.membersService.deleteAllLinks();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.membersService.removeAll();
  }
}
