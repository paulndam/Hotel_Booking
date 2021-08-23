import mongoose from "mongoose";

const { String, Number } = mongoose.Schema.Types;
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema(
  {
    hotel: {
      type: ObjectId,
      ref: "Hotel",
    },
    session: {},
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
