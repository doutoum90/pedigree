import { PartialType } from '@nestjs/mapped-types';
import { Members } from '../models/members.schema';

export class UpdateFamilyDto extends PartialType(Members) {}
