import express from "express";
import formidable from "express-formidable";
import { tokenValidation, validationForHotelOwner } from "../utils/verifyJWT";
import {
  createHotel,
  getAllHotel,
  hotelImage,
  hotelPostedBySeller,
  deleteHotelPostedBySeller,
  getOneHotel,
  updatingHotel,
  bookedHotelByUser,
  hotelIsAlreadyBookd,
  listSearchHotels,
  creatingHotel,
} from "../controllers/hotelController";

const router = express.Router();
// any route you expect to recieve form data , use formidable.

router.post("/createhotel", tokenValidation, formidable(), createHotel);
router.post("/creatingHotel", tokenValidation, creatingHotel);
router.get("/allhotels", getAllHotel);
router.get("/hotel-image/:hotelId", hotelImage);
router.get("/sellerhotel", tokenValidation, hotelPostedBySeller);
router.delete(
  "/delete-hotel/:hotelId",
  tokenValidation,
  validationForHotelOwner,
  deleteHotelPostedBySeller
);
router.get("/getonehotel/:hotelId", getOneHotel);
router.put(
  "/update-hotel/:hotelId",
  // tokenValidation,
  // hotelPostedBySeller,
  formidable(),
  updatingHotel
);

router.get("/users-booking", tokenValidation, bookedHotelByUser);
router.get(
  "/hotel-already-booked/:hotelId",
  tokenValidation,
  hotelIsAlreadyBookd
);
router.post("/hotel-search-list", listSearchHotels);

module.exports = router;
