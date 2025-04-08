import prisma from '../config/db.js';

export const getItemById = async (user_id) => {
    try {
        const item = await prisma.user.findUnique({
            where: { user_id: parseInt(user_id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserByUserNameService = async (username) => {
    try {
        const data = await prisma.user.findUnique({
            where: { username: username },
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createItems = async (data) => {
    try {
        const item = await prisma.user.create({
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteItemById = async (id) => {
    try {
        const item = await prisma.user.delete({
            where: { userId: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const updateItemById = async (id, data) => {
    try {
        const item = await prisma.user.update({
            where: { userId: parseInt(id) },
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
    ;


export const changeUserPasswordService = async (user_id, hashedPassword) => {
    try {
        return await prisma.user.update({
            where: { user_id },
            data: { password: hashedPassword },
        });
    } catch (error) {
        throw new Error(`Failed to update password: ${error.message}`);
    }
};