import { Document, Model } from "mongoose";

export interface User {
  name: string;
  email: string;
  role: string;
  password: string;
  googleId: string;
}

export interface UserDocument extends Document, User {}

export interface UserModelType extends Model<UserDocument> {
  checkCredentials(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}

export interface Accommodation {
  name: string;
  host: UserDocument;
  description: string;
  maxGuests: number;
  city: string;
}

export interface AccommodationDocument extends Document, Accommodation {}

export interface AccommodationModelType extends Model<AccommodationDocument> {}

declare global {
  namespace Express {
    interface Request {
      user: UserModel;
    }
  }
}
