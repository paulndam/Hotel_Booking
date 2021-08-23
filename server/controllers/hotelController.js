import User from "../models/User";
import Hotel from "../models/Hotel";
import fs from "fs";
import isLength from "validator/lib/isLength";
import Order from "../models/Order";

export const createHotel = async (req, res) => {
  console.log("----request fields----->", req.fields);
  console.log("----request files----->", req.files);

  try {
    const fields = req.fields;
    const files = req.files;

    const hotel = new Hotel(fields);
    hotel.postedBy = req.user.userId;

    // handling the image
    // read the image synchronously.
    if (files.images) {
      // then add the images.
      hotel.images.data = fs.readFileSync(files.images.path);
      hotel.images.contentType = files.images.type;
    }
    hotel.save((error, result) => {
      if (error) {
        console.log(error);
        res.status(400).send("Please Fill In All Inputs.");
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const creatingHotel = async (req, res) => {
  console.log("------ Req Body----");
  console.log(req.body);
  const files = req.files;
  if (files.images) {
    // then add the images.
    hotel.images.data = fs.readFileSync(files.images.path);
    hotel.images.contentType = files.images.type;
  }
  const hotel = await Hotel.create(req.body);

  console.log("----Hotel-----");
  console.log(hotel);

  res.status(200).json(hotel);
};

export const getAllHotel = async (req, res) => {
  // to show only hotels that are avaliable from duration date.
  // inside the find method do this.
  // find({duration:{$gte: new Date()}})
  const allhotel = await Hotel.find({})
    .limit(26)
    .select("-images.data")
    .populate("postedBy", "_id firstName")
    .exec();
  console.log(allhotel);
  // res.status(200).json({
  //   data: allhotel.length,
  //   allhotel,
  // });
  res.status(200).json(allhotel);
};

export const hotelImage = async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.images && hotel.images.data !== null) {
    res.set("contentType", hotel.images.contentType);
    return res.status(200).send(hotel.images.data);
  }
};

export const hotelPostedBySeller = async (req, res) => {
  const hotelPosted = await Hotel.find({ postedBy: req.user.userId })
    .select("-image.data")
    .populate("postedBy", "_id firstName")
    .exec();
  console.log("----hotel posted by seller ---", hotelPosted);
  res.status(200).send(hotelPosted);
};

export const deleteHotelPostedBySeller = async (req, res) => {
  const remove = await Hotel.findByIdAndDelete(req.params.hotelId).exec();
  console.log("deleting hotel ------>", remove);
  res.json({ msg: "---- success deleting hotel ----" });
};

export const updatingHotel = async (req, res) => {
  console.log("-----updatingHotel Hotel ----");
  try {
    const fields = req.fields;
    const files = req.files;

    const data = { ...fields };
    console.log("----- Data Fields ---->", data);

    if (files.images) {
      const images = {};
      images.data = fs.readFileSync(files.images.path);
      images.contentType = files.images.type;
      data.images = images;
    }

    const update = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    });

    //res.json({ msg: `Updated Hotel Successfuly`, update });
    res.json(update);
    console.log("------ Hotel Updated ----", update);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Failed Updating Hotel` });
  }
};

export const getOneHotel = async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id firstName")
    .select("-images.data")
    .exec();
  console.log("----- getting one hotel ---", hotel);
  res.json(hotel);
};

export const bookedHotelByUser = async (req, res) => {
  const bookedHotels = await Order.find({ orderedBy: req.user.userId })
    .select("session")
    .populate("hotel", "-images.data")
    .populate("orderedBy", "_id firstName");
  console.log("----- Booked Hotels By User ----", bookedHotels);
  res.json(bookedHotels);
};

export const hotelIsAlreadyBookd = async (req, res) => {
  const { hotelId } = req.params;
  //  find all orders of the curent logged in user
  const allUserOrder = await Order.find({ orderedBy: req.user.userId })
    .select("hotel")
    .exec();
  // check if hotel id is among the users orders.
  let IDS = [];
  // loop thru the orders and put the hotel ids in the empty array of ids.
  for (let i = 0; i < allUserOrder.length; i++) {
    IDS.push(allUserOrder[i].hotel.toString());
  }
  res.json({ success: IDS.includes(hotelId) });
};

export const listSearchHotels = async (req, res) => {
  const { location, duration, bedRoom } = req.body;
  console.log("---Req body of list of search hotels---");
  console.log(location, duration, bedRoom);

  const results = await Hotel.find({
    duration,
    location,
    bedRoom,
  })
    .select("-images.data")
    .exec();

  // if (!results) {
  //   return await Hotel.find({}).select("-images.data").exec();
  // }

  console.log("==== Results when searching hotels ====");
  console.log(results);

  res.json(results);

  // console.log("------query----");
  // console.log(req.query);
  // try {
  //   const search =
  //     req.query.location && req.query.duration && req.query.bedRoom;
  //   const result = await Hotel.find({
  //     location: { $regex: `${search}`, $options: "$i" },
  //     //duration: { $regex: `${search}`, $options: "$i" },
  //     // bedRoom: { $regex: `${search}`, $options: "$i" },
  //   })
  //     .select("-images.data")
  //     .exec();
  //   console.log("----Data Response in Search User Api ---");
  //   console.log(result);
  //   res.json({
  //     data: result.length,
  //     result,
  //   });
  // } catch (error) {
  //   console.log("Error From Search API in Back End, could not get search");
  //   console.log(error);
  // }
};
