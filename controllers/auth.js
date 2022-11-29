import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {creatorError} from "../utils/error.js";



export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.name,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(200).send("User has been created.")
    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.name})
        if (!user) return next(creatorError(404, "User Not Found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) return next(creatorError(400, "Wrong Password or Username"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...otherDetails})
    } catch (err) {
        next(err)
    }
}