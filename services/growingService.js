import db from '../config/db.js';
export const getAllGrowingsService = async () => {
    try {
        const item = await db.growing.findMany();
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getGrowingByIdService = async (id) => {
    try {
        const item = await db.growing.findUnique({
            where: { growing_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}   
export const createGrowingService = async (data) => {
    try {
        const item = await db.growing.create({
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const updateGrowingByIdService = async (id, data) => {
    try {
        const item = await db.growing.update({
            where: { growing_id: parseInt(id) },
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const deleteGrowingByIdService = async (id) => {
    try {
        const item = await db.growing.delete({
            where: { growing_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message); 
    }
}
