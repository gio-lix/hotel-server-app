import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    updateRoomAvailability
} from "../controllers/room.js";

const router = express.Router()

router.put("/availability/:id", updateRoomAvailability)

// create
router.post("/:hotelId",verifyAdmin, createRoom)
// update
router.put("/:id",verifyAdmin, updateRoom)
// Delete
router.delete("/:id/:hotelId",verifyAdmin,  deleteRoom)
// Get
router.get("/:id", getRoomById)
// Get All
router.get("/", getAllRooms)
export default router