import { ApiProperty } from '@nestjs/swagger';
export class Family {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: String;
  @ApiProperty()
  imageUrl: String;
  @ApiProperty()
  area: String;
  @ApiProperty()
  profileUrl: String;
  @ApiProperty()
  office: String;
  @ApiProperty()
  tags: String;
  @ApiProperty()
  isLoggedUser: String;
  @ApiProperty()
  positionName: String;
  @ApiProperty()
  parentId: String;
  @ApiProperty()
  size: String;
}
