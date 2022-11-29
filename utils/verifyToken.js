import jwt from "jsonwebtoken"
import {creatorError} from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(creatorError('401'," You are not authenticated!"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(creatorError('401',"Token is not valid!"))
        }
        req.user = user
        next()
    } )
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(creatorError('401',"You are not authorization!"))
        }
    })

}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next,() => {
        if ( req.user.isAdmin) {
            next()
        } else {
            return next(creatorError('401',"You are not authorization!"))
        }
    })

}