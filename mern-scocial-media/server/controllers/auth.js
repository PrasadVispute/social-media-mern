import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**Register user */
export const register = async (req, res) =>{
    try {

        //obj destructuring
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        //password hashing
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHashed,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 100),
            impressionsL: Math.floor(Math.random * 1000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}