import { PartialType } from '@nestjs/swagger';
import { Members } from '../entities/members.schema';

export class UpdateMemberDto extends PartialType(Members) {}
