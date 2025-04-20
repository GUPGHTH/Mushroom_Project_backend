import db from '../config/db.js';

export const getAllCultivationsService = async () => {
    try {
        const items = await db.cultivationPot.findMany({
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

export const getCultivationByIdService = async (id) => {
    try {
        const item = await db.cultivationPot.findUnique({
            where: { cultivation_pot_id: parseInt(id) },
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

export const createCultivationService = async (data) => {
    try {
        const item = await db.cultivationPot.create({
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

export const updateCultivationByIdService = async (id, data) => {
    try {
        const item = await db.cultivationPot.update({
            where: { cultivation_pot_id: parseInt(id) },
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

export const deleteCultivationByIdService = async (id) => {
    try {
        const item = await db.cultivationPot.delete({
            where: { cultivation_pot_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Cultivation pot not found");
        }
        throw new Error(error.message);
    }
};