import User from "../models/User";
import Hotel from "../models/Hotel";
import Order from "../models/Order";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import dollarToCent from "dollars-to-cents";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeAccount = async (req, res) => {
  // find user

  const user = await User.findById(req.user.userId).exec();
  console.log(user);
  // create stripe account if user doesn't have one
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("creating stripe account ----->", account);

    user.stripe_account_id = account.id;
    user.save();
  }

  // create login link based on user account and send it to front end
  // use query-string for that
  // first make request to stripe again
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  // prefil any account info
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log("Account Link ----------", accountLink);

  const stripeLink = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log(stripeLink);

  res.send(stripeLink);
};

const delayPaymentDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  console.log("------- getting account status ------->");
  // make request to stripe.
  // need access to our current login user by query DB .
  const user = await User.findById(req.user.userId).exec();
  // get user account from stripe api.
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  console.log("------stripe user account retrieve info ----->", account);
  // Delay payment days for seller(optional by the way but for now we are doing it)
  const updateUserPayment = await delayPaymentDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      //stripe_seller: account,
      stripe_seller: updateUserPayment,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  console.log("----UpdatedUser stripe Info ----->", updatedUser);
  res.send(updatedUser);
};

export const getStripeAccountBalance = async (req, res) => {
  // get user
  const user = await User.findById(req.user.userId).exec();
  try {
    // get user balamce.
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    console.log("----user stripe balance ---", balance);
    res.json(balance);
  } catch (error) {
    console.log(error);
  }
};

export const payOutSetting = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.user.userId).exec();
    //use that user stripe account id.
    const logInLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    console.log("--- user stripe login link --->", logInLink);
    res.json(logInLink);
  } catch (error) {
    console.log(`--Stripe payout error ${error}`);
  }
};

export const stripeSessionId = async (req, res) => {
  console.log("---- Stripe Session Id From BackEnd --->", req.body.hotelId);
  // 1. get hotelId from req.body.
  const { hotelId } = req.body;
  console.log(
    "----****** Hotel ID Info From stripeSessionId Method *****----- ",
    hotelId
  );
  //2. find the hotel based on hotelId from DB.
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();
  // 3. charge percentage for application fee.
  const chargeFee = (item.price * 20) / 100;

  // 4. create a session for secure checkout.
  const session = await stripe.checkout.sessions.create({
    // 5. purchasing item details, that will be shown to user upon checkout.

    payment_method_types: ["card"],
    line_items: [
      {
        name: item.title,
        amount: dollarToCent(item.price),
        currency: "usd",
        quantity: 1,
      },
    ],
    // 6. create paymnet intent with application fee and the destination to charge.

    payment_intent_data: {
      application_fee_amount: dollarToCent(chargeFee),
      // seller will be able to see value on the seller account page
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // 7. success and cancel urls.

    mode: "payment",
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  // 8. add session object to user in DB.
  await User.findByIdAndUpdate(req.user.userId, {
    stripeSession: session,
  }).exec();
  // send session Id to Front End.
  res.send({ sessionId: session.id });
  //console.log("---- Session Object From BackEnd ---->", session);
};

export const stripeSuccess = async (req, res) => {
  try {
    // 1. get the hotel id from req.bdoy.
    //const { hotelId } = req.body.hotelId;
    //console.log("----- Hotel ID From stripe Success ----", hotelId);
    // 2. look for the current user that is logged in.
    const user = await User.findById(req.user.userId).exec();
    // check if user have stripe session.
    if (!user.stripeSession) return;
    console.log("----User stripe success Info ----", user);
    // 3. get stripe session due to the session id, that is save in the user collection in DB.
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    console.log("---- Session Info from stripe success ------", session);
    // 4. chek=ck if the payment status is paid.
    if (session.payment_status === "paid") {
      // 5. check if order with the same session id is already existant.
      const orderExist = await Order.findOne({
        "session.id": session.id,
      }).exec();

      console.log("----- Existng Order Info -----", orderExist);

      if (orderExist) {
        // 6. if order is existant, send a true success msg.
        res.json({ success: true });
      } else {
        // 7. create a new order and send a true success as well.
        const newOrder = await new Order({
          hotel: req.body.hotelId,
          session,
          orderedBy: req.user.userId,
        }).save();
        console.log("---- Creating Stripe New Order ----", newOrder);

        // 8. now remove the user stripe session
        await User.findByIdAndUpdate(req.user.userId, {
          $set: { stripeSession: {} },
        });
        // 9. send success response back to front end or client.
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log("----- Stripe Success Req Error ----", error);
  }
};
