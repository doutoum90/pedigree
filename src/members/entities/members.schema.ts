import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Members {
  @Prop()
  name: String;
  @Prop()
  imageUrl: String;
  @Prop()
  area: String;
  @Prop()
  profileUrl: String;
  @Prop()
  office: String;
  @Prop()
  tags: String;
  @Prop()
  isLoggedUser: String;
  @Prop()
  positionName: String;
  @Prop()
  motherId: String;
  @Prop()
  fatherId: String;
  @Prop()
  size: String;
  @Prop()
  surNom: String;
  @Prop()
  dateNaissanceExacte: boolean;
  @Prop()
  dateNaissance: String;
  @Prop()
  mort: boolean;
  @Prop()
  dateDecesExacte: boolean;
  @Prop()
  dateDeces: String;
  @Prop()
  histoire: String;
  @Prop()
  famId: String;
  @Prop()
  femalePartenersId: String[];
  @Prop()
  malPartenerIds: String[];
  @Prop()
  sex: String;
  @Prop()
  root: boolean = false;
}

export const MembersSchema = SchemaFactory.createForClass(Members);

export type MembersDocument = Members & Document;
