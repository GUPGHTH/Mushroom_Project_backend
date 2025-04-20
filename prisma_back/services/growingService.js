import db from '../config/db.js';

export const getAllGrowingsService = async () => {
    try {
        const items = await db.growingPot.findMany({
            include: {
                TypePot: true,
                Device: true,
                Farm: true
            }
        });
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getGrowingByIdService = async (id) => {
    try {
        const item = await db.growingPot.findUnique({
            where: { growing_pot_id: parseInt(id) },
            include: {
                TypePot: true,
                Device: true,
                Farm: true
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createGrowingService = async (data) => {
    try {
        const item = await db.growingPot.create({
            data: {
                type_pot_id: parseInt(data.type_pot_id),
                index: data.index ? parseInt(data.index) : null,
                farm_id: parseInt(data.farm_id),
                device_id: parseInt(data.device_id),
                img_path: data.img_path,
                ai_result: data.ai_result,
                status: data.status || 'active',
                pot_name: data.pot_name,
                age: data.age ? parseInt(data.age) : 1,
                create_pot: data.create_pot || new Date()
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateGrowingByIdService = async (id, data) => {
    try {
        const item = await db.growingPot.update({
            where: { growing_pot_id: parseInt(id) },
            data: {
                type_pot_id: data.type_pot_id ? parseInt(data.type_pot_id) : undefined,
                index: data.index ? parseInt(data.index) : undefined,
                farm_id: data.farm_id ? parseInt(data.farm_id) : undefined,
                device_id: data.device_id ? parseInt(data.device_id) : undefined,
                img_path: data.img_path,
                ai_result: data.ai_result,
                status: data.status,
                pot_name: data.pot_name,
                age: data.age ? parseInt(data.age) : undefined
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteGrowingByIdService = async (id) => {
    try {
        const item = await db.growingPot.delete({
            where: { growing_pot_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Growing pot not found");
        }
        throw new Error(error.message);
    }
};