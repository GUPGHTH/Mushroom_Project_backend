import db from '../config/db.js';

export const getAllFarm = async () => {
    try {
        const items = await db.farm.findMany({
            orderBy: { farm_id: 'asc' },
            include: {
                Device: true,
                CultivationPot: true,
                GrowingPot: true
            }
        });
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getFarmById = async (id) => {
    try {
        const item = await db.farm.findUnique({
            where: { farm_id: parseInt(id) },
            include: {
                Device: true,
                CultivationPot: true,
                GrowingPot: true
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createFarms = async (data) => {
    try {
        const item = await db.farm.create({
            data: {
                farm_name: data.farm_name,
                farm_type: data.farm_type,
                farm_description: data.farm_description,
                farm_status: data.farm_status !== undefined ? Boolean(data.farm_status) : true,
                temperature: data.temperature ? parseFloat(data.temperature) : null,
                humidity: data.humidity ? parseFloat(data.humidity) : null
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateFarmById = async (id, data) => {
    try {
        const item = await db.farm.update({
            where: { farm_id: parseInt(id) },
            data: {
                farm_name: data.farm_name,
                farm_type: data.farm_type,
                farm_description: data.farm_description,
                farm_status: data.farm_status !== undefined ? Boolean(data.farm_status) : undefined,
                temperature: data.temperature ? parseFloat(data.temperature) : undefined,
                humidity: data.humidity ? parseFloat(data.humidity) : undefined
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteFarmById = async (id) => {
    try {
        const item = await db.farm.delete({
            where: { farm_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Farm not found");
        }
        throw new Error(error.message);
    }
};