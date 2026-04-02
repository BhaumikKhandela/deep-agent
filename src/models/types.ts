import { Document } from "mongoose";

export interface IUSER extends Document {
  name?: string;
  email: string;
  image?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleId: string;
}
