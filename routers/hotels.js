import express from "express";

import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotelById, getHotelByQueryName, getHotelRoom,
    updateHotel
} from "../controllers/hotel.js";

import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router()

// create
router.post("/", verifyAdmin, createHotel)
// update
router.put("/:id", verifyAdmin, updateHotel)
// Delete
router.delete("/:id", verifyAdmin, deleteHotel)

// Get
router.get("/find/:id", getHotelById)

router.get("/cities", getHotelByQueryName)

// room
router.get("/room/:id", getHotelRoom)
// Get All
router.get("/", getAllHotels)

// get count by city
router.get("/countByCity", countByCity)

//  get count by type
router.get("/countByType", countByType)

export default router