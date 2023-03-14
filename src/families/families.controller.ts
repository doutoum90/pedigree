import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family } from './entities/family.entity';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familiesService.create(createFamilyDto);
  }

  @Get()
  async findAll() {
    return (await this.familiesService.findAll()) as any;
  }

  @Get('/sibling/:id')
  async findSibling(@Param('id') id: string) {
    return (await this.familiesService.findSibling(id)) as any;
  }

  @Get('parents/:id')
  findParents(@Param('id') id: string) {
    return this.familiesService.findParents(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familiesService.update(id, updateFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(id);
  }
}
