import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updateHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const getHotelByQueryName = async (req, res, next) => {
    try {
        const hotel = await Hotel.find({city: req.query.city})
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getAllHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query

    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1, $lt: max || 999}})
            .limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
}


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const lists = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(lists)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})

        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ])
    } catch (err) {
        next(err)
    }
}

export const getHotelRoom = async (req, res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const lists = await Promise.all(hotel.rooms.map(room =>  {
            return Room.findById(room)
        }))
        res.status(200).json(lists)
    } catch (err) {

    }
}