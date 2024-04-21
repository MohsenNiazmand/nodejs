import passport from 'passport';
import { User } from "../../models/index.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function createUser({
    fullname,
    username,
    password,
}) {
    return await User.create({
        fullname,
        username,
        password,
    });
}

export async function getUser({ username }) {
    return await User.findOne({ where: { username } });
}


function generateToken({ id, username }){

    const payload = {
        user: {
            id, username
        }
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 30 *60 * 60 * 24 });
}

function returnCreatedUser(req, res) {
    res.status(201).json({
        message:`User "${req.user.fullname}" has been created.`,
        token:generateToken(req.user),
    });
}

export const signup = [
    passport.authenticate('signup', { session: false }),
    returnCreatedUser,
];

function returnAuthInfo(req, res) {
    if (!req.user) {
        res.status(401).send('invalid user or pass');
        return;
    }

  const token = generateToken(req.user);

    res.json({
        token,
    });

}

export const login = [
    passport.authenticate('login', { session: false }),
    returnAuthInfo,
];