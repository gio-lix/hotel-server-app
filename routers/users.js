import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";

const router = express.Router()



// update
router.put("/:id",verifyUser, updateUser)
// Delete
router.delete("/:id",verifyUser, deleteUser)
// Get
router.get("/:id", verifyUser,getUserById)
// Get All
router.get("/", verifyAdmin, getAllUsers)


export default router