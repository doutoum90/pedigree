import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Link {
  @Prop()
  source: String;
  @Prop()
  target: String;
  @Prop()
  label: String;
  @Prop()
  famId: String;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

export type LinkDocument = Link & Document;
