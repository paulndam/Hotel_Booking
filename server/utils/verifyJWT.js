import expressJwt from "express-jwt";
import Hotel from "../models/Hotel";

export const tokenValidation = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const validationForHotelOwner = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId).exec();
  // access hotel posted by the seller
  const hotelPostedBySeller =
    hotel.postedBy._id.toString() === req.user.userId.toString();

  if (!hotelPostedBySeller) {
    return res.status(403).send("not authorized");
  }
  next();
};
