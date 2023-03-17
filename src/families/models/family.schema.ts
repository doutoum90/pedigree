import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Family {
  @Prop()
  name: String;
  
  @Prop()
  histoire: String;
}

export const FamilySchema = SchemaFactory.createForClass(Family);

export type FamilyDocument = Family & Document;
