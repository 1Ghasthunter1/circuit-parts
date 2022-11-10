import { Document, Types } from "mongoose";
import { DatabaseUser } from "../types/userTypes";
import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: Document<unknown, any, DatabaseUser> &
    DatabaseUser & {
      _id: Types.ObjectId;
    };
  token?: string;
}