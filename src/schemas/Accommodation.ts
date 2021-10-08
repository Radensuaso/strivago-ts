import mongoose from "mongoose";
import { AccommodationDocument } from "src/typings";

const { Schema, model } = mongoose;

const accommodationSchema = new Schema<AccommodationDocument>(
  {
    name: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AccommodationModel = model("accommodation", accommodationSchema);

export default AccommodationModel;
