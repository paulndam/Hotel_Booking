import mongoose from "mongoose";

// const { String, Number } = mongoose.Schema.Types;
const { ObjectId } = mongoose.Schema.Types;

const HotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    images: {
      data: Buffer,
      contentType: String,
    },
    price: {
      type: Number,
      required: true,
    },
    bedRoom: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
