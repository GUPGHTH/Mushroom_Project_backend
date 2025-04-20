import db from '../config/db.js';

export const getViewGrowingByIdService = async (gro_id) => {
    try {
        const items = await db.growingPot.findMany({
            where: { growing_pot_id: parseInt(gro_id) },
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

export const createViewGrowingByIdService = async (data) => {
    try {
        const item = await db.growingPot.create({
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

export const updateViewGrowingByIdService = async (id, data) => {
    try {
        const item = await db.growingPot.update({
            where: { growing_pot_id: parseInt(id) },
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

export const deleteViewGrowingByIdService = async (gro_id) => {
    try {
        const item = await db.growingPot.delete({
            where: { growing_pot_id: parseInt(gro_id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Growing not found");
        }
        throw new Error(error.message);
    }
};

export const uploadBase64ImageService = async (growing_pot_id, imageBase64) => {
    try {
        const updatedItem = await db.growingPot.update({
            where: { growing_pot_id: parseInt(growing_pot_id) },
            data: { img_path: imageBase64 },
        });
        return updatedItem;
    } catch (error) {
        throw new Error(error.message);
    }
};