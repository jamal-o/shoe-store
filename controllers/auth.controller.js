import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

const collection = db.collection('users');

export const signup = async(req,res, next)=>{
    try{
        const { username,email, password, is_admin} = req.body;
        const query = {
            $or: [{email},{username}],
        };

        const existingUser = await collection.findOne(query);
        if (existingUser) {
            return next({
                status:422,
                message: 'Email or Username is already registered',
            });
        }
            const hashedPassword = await bcrypt.hash(password,10);

            const user = {
                username,
                email,
                password: hashedPassword,
                is_admin: is_admin,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        const {insertedId} = await collection.insertOne(user);
        const token = jwt.sign({id:insertedId}, process.env.AUTH_SECRET);
        user._id = insertedId;

        const {password: pass, updatedAt, createdAt, is_admin: is_admin_, ...rest}= user;

        res.cookie('barb_token', token, { httpOnly:true})
        .status(200)
        .json(rest);
    }catch(error){
        next({status:500, error});
    }
}

export const signin = async (req,res, next) => {
    const {email, password} = req.body;

    try {
        const validUser = await collection.findOne({email});
        if(!validUser){
            return next({status:404, message: 'User not found!'});
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next({status: 401, message: 'Wrong password!'});


        }

        const token = jwt.sign({id: validUser._id}, process.env.AUTH_SECRET);
        
        const {password: pass, updatedAt, createdAt, is_admin: is_admin_, ...rest}= validUser;

        res.cookie('barb_token', token, { httpOnly:true})
        .status(200)
        .json(rest);
    } catch (error) {
        next({status:500, error});
    }
    
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('barb_token');
        res.status(200).json({message: 'Sign out successful'});
    } catch (error) {
        next({status:500, error});
    }
    
}