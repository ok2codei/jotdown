import express from 'express';
import registerUser from '../controllers/authRegister.controller.js';
import loginUser from '../controllers/auth.login.controller';
import {
 validateRegister,
 validateLogin
} from "../middleware/validateUser.js";

const router = express.Router();

router.post(
 "/register",
 validateRegister,
 registerUser
);

router.post(
 "/login",
 validateLogin,
 loginUser
);

export default router;