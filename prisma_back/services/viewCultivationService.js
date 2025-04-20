import db from '../config/db.js';

export const getViewCultivationByDeviceIdService = async (device_id) => {
    try {
        const items = await db.cultivationPot.findMany({
            where: { device_id: parseInt(device_id) },
            include: {
                TypePot: {
                    select: { type_pot_name: true }
                },
                Device: {
                    select: { device_name: true }
                }
            }
        });
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createViewCultivationByIdService = async (data) => {
    try {
        const item = await db.cultivationPot.create({
            data: {
                type_pot_id: parseInt(data.type_pot_id),
                farm_id: parseInt(data.farm_id),
                device_id: parseInt(data.device_id),
                img_path: data.img_path,
                status: data.status || 'active'
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateViewCultivationByIdService = async (id, data) => {
    try {
        const item = await db.cultivationPot.update({
            where: { cultivation_pot_id: parseInt(id) },
            data: {
                img_path: data.img_path,
                ai_result: data.ai_result,
                status: data.status,
                pot_name: data.pot_name
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteViewCultivationByIdService = async (cul_id) => {
    try {
        const item = await db.cultivationPot.delete({
            where: { cultivation_pot_id: parseInt(cul_id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Cultivation not found");
        }
        throw new Error(error.message);
    }
};

export const uploadBase64ImageService = async (cultivation_pot_id, imageBase64) => {
    try {
        const updatedItem = await db.cultivationPot.update({
            where: { cultivation_pot_id: parseInt(cultivation_pot_id) },
            data: { img_path: imageBase64 },
        });
        return updatedItem;
    } catch (error) {
        throw new Error(error.message);
    }
};