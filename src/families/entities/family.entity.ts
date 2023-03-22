import { ApiProperty } from '@nestjs/swagger';
export class Family {
  @ApiProperty()
  id: string;
  @ApiProperty()
  histoire: String;
}
