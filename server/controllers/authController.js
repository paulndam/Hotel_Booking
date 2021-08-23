import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

// export const showMessage = (req, res) => {
//   res.status(200).send(`Your message: ${req.params.message}`);
// };

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  try {
    if (!isLength(firstName, { min: 2, max: 12 })) {
      return res.status(422).send(`firstname gotta be 2-12 characters long`);
    } else if (!isLength(lastName, { min: 2, max: 12 })) {
      return res.status(422).send(`lastname gotta be 2-12 characters long`);
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send(`password gotta be at least 6 characters long`);
    } else if (!isEmail(email)) {
      return res.status(422).send(`email is required, use valid email`);
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).send(`user with email already exist`);
    }

    const newUser = await new User({
      firstName,
      lastName,
      email,
      password,
    }).save();
    console.log(`=========== creating new user =======`);
    console.log({ newUser });

    //   creating token when creating a user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
    res.status(200).json({ newUser, token });

    // res.status(200).json({ msg: "success creating user", newUser });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).send(`error signing up user`);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .send(`no user exist with that email,please sign-up`);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
      });
      res.status(200).json({ user, token });
    } else {
      res.status(401).send("email or password do not match");
    }
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).send("error logging in user");
  }
};

export const getRequest = async (req, res) => {
  if (!"authorization" in req.headers) {
    return res.status(401).send(`Not Authorized Token`);
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.enc.JWT_SECRET
    );
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("invalid token");
  }
};
