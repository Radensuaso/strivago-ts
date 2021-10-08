import { Document, Model } from "mongoose";

export interface User {
  name: string;
  email: string;
  role: string;
  password: string;
  googleId: string;
}

export interface UserDocument extends Document, User {}

export interface Accommodation {
  name: string;
  host: string;
  description: string;
  maxGuests: number;
  city: string;
}

export interface AccommodationDocument extends Document, Accommodation {}
