import express from "express";

import {
 getUserProfile,
 updateUser,
 deleteUser
} from "../controllers/users.controller.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
 "/profile",
 verifyToken,
 getUserProfile
);

router.put(
 "/profile",
 verifyToken,
 updateUser
);

router.delete(
 "/profile",
 verifyToken,
 deleteUser
);

export default router;