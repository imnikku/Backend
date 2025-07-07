import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
 
@Prop({ required: true, index: { unique: true, collation: { locale: 'en', strength: 2 }  }})
email: string;

@Prop({ required: true })
fullname: string;

@Prop({ required: true })
password: string;
 
}

export const UserSchema = SchemaFactory.createForClass(User);
