import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const createUser = async (data) => {
    try {
        return await db.user.create({
            data: {
                username: data.username,
                password: data.password,
                uuid: uuid4()
            }
        });
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error("Username already exists");
        }
        throw new Error(error.message);
    }
};

export const getUserByUsername = async (username) => {
    if (!username || typeof username !== 'string') {
        throw new Error('Username is required and must be a string');
    }

    try {
        const user = await db.user.findUnique({
            where: { 
                username: username 
            },
            select: {
                user_id: true,
                username: true,
                password: true,
                uuid: true
                // Only include fields that exist in your database
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error in getUserByUsername:', error);
        
        // Handle specific Prisma errors
        if (error.code === 'P2025') {
            throw new Error('User not found');
        }
        
        throw new Error(error.message || 'Failed to fetch user');
    }
};

export const generateToken = (user) => {
    try {
        console.log(user)
        return jwt.sign(
            { 
                id: user.user_id, 
                username: user.username,
                uuid: user.uuid 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};