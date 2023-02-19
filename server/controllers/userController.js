import bcryptjs from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import USER from '../models/userModel.js';

export const registerUser = asyncHandler( async (req,res) => {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please add all the fields.");
    }

    const userExists = await USER.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("The User Already Exists.")
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await USER.create({
        name : name,
        email : email,
        password : hashedPassword
    });

    if(user){
        res.status(201);
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : genToken(user.id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
});

export const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please add all the credentials.");
    }

    const user = await USER.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User not found.");
    }
    
    if(user && (await bcryptjs.compare(password , user.password))){
        res.status(200).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : genToken(user.id)
        });
    }else{
        res.status(400);
        throw new Error("Wrong Password!");
    }
})

const genToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{
        expiresIn : '1d'
    });
}