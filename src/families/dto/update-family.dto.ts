import { PartialType } from '@nestjs/mapped-types';
import { Family } from '../models/family.schema';

export class UpdateFamilyDto extends PartialType(Family) {}
