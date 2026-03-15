import express from 'express';
const { registerUser } = require("../controllers/auth.Register.controller");
const { loginUser } = require("../controllers/auth.login.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;