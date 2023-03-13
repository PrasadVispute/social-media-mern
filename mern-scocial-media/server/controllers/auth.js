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

/**Login user */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbUser = await User.findOne( {email: email});

        if(!dbUser) return res.status(400).json({msg: "User does not exist"});
        const isMatched = await bcrypt.compare(password, dbUser.password);

        if(!isMatched) return res.status(400).json({msg: "Invalid Credentials"});

        const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET);
        delete dbUser.password
        //so that the pass is not sent to frontend

        res.status(200).json({ token, dbUser });
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}