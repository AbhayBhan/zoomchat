import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import USER from '../models/userModel.js';

export const protect = asyncHandler( async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ");
            token = token[1];

            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = await USER.findById(decoded.id).select('-password');

            next();
        }
        catch(err){
            res.status(401);
            throw new Error("Unauthorized Access Error.");
        }
    }
    else{
        if(!token){
            res.status(400);
            throw new Error("No Token was provided.");
        }
    }
})