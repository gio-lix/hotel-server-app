import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const saveRoom  = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: saveRoom._id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json(saveRoom)
    } catch (err) {
        next(err)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updateRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const updateRoomAvailability = async (req, res, next) => {

    try {
        await Room.updateOne(
            {"roomNumber._id": req.params.id },
            {$push: {"roomNumber.$.unavailableDates": req.body.dates}}
        )

        res.status(200).json({text: "Room status has been updated"})
    } catch (err) {
        res.status(500).json(err)
    }
}


export const getRoomById = async (req, res, next) => {
    try {
        const hotel = await Room.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const getAllRooms = async (req, res, next) => {

    try {
        const Rooms = await Room.find()
        res.status(200).json(Rooms)
    } catch (err) {
        next(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
}