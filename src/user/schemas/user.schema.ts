import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ select: false })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    fbId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);