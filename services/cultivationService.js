import db from '../config/db.js';
export const getAllCultivationsService = async () => {
    try {
        const item = await db.cultivation.findMany();
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getCultivationByIdService = async (id) => {
    try {
        const item = await db.cultivation.findUnique({
            where: { cultivation_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createCultivationService = async (data) => {
    try {
        const item = await db.cultivation.create({
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const updateCultivationByIdService = async (id, data) => {
    try {
        const item = await db.cultivation.update({
            where: { cultivation_id: parseInt(id) },
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const deleteCultivationByIdService = async (id) => {
    try {
        const item = await db.cultivation.delete({
            where: { cultivation_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message); 
    }
}
export const createViewCultivationByIdService = async (data) => {
    try {
        const item = await db.cultivationPot.create({
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
