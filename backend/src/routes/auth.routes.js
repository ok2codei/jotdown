import express from 'express';
import registerUser from '../controllers/authRegister.controllers.js';
import loginUser from '../controllers/auth.login.controllers.js';
import {
    validateRegister,
    validateLogin
} from "../middleware/validateUser.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;