import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "seller", "admin", "root"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (error, hash) {
      if (error) {
        console.log(`Bcrypt  Error`, error);
        return next(error);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
