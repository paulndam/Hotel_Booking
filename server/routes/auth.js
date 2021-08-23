import express from "express";
import { logIn, signUp, getRequest } from "../controllers/authController";

const router = express.Router();

//router.get(`/:message`, showMessage);
router.post(`/sign-up`, signUp);
router.post(`/log-in`, logIn);
router.get(`/get`, getRequest);

module.exports = router;
