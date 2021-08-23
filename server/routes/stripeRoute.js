import express from "express";
import {
  createStripeAccount,
  getAccountStatus,
  getStripeAccountBalance,
  payOutSetting,
  stripeSessionId,
  stripeSuccess,
} from "../controllers/stripeController";

// require token validation middleware
import { tokenValidation } from "../utils/verifyJWT";

const router = express.Router();

router.post("/create-connect-account", tokenValidation, createStripeAccount);
router.post("/get-account-status", tokenValidation, getAccountStatus);
router.post(
  "/get-stripe-account-balance",
  tokenValidation,
  getStripeAccountBalance
);
router.post("/payout-setting", tokenValidation, payOutSetting);
router.post("/stripe-session", tokenValidation, stripeSessionId);

router.post("/stripe-success", tokenValidation, stripeSuccess);

module.exports = router;
