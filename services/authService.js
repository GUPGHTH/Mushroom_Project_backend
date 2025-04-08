import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const createUser = async (data) => {
    return await db.user.create({
        data: {
            ...data,
            uuid: uuid4()
        }
    });
};

const getUserByUsername = async (username) => {
    return await db.user.findUnique({
        where: { username: username }
    });
};

const generateToken = (id, username,uuid) => {
    return jwt.sign({ id, username ,uuid}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export { createUser, getUserByUsername, generateToken };