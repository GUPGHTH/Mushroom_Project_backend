import db from '../config/db.js';

export const updateFarmById = async (id, data) => {
    try {
        const item = await db.farm.update({
            where: { farm_id: parseInt(id) },
            data: {
                farm_name: data.farm_name,
                farm_type: data.farm_type,
                farm_description: data.farm_description,
                farm_status: data.farm_status === 'true' ? true : false, // ✅ แปลง `true/false` เป็น Boolean
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
        throw new Error(error.message);
    }
};


export const createFarms = async (data) => {
    try {

        const lastFarm = await db.farm.findFirst({
            orderBy: { farm_id: 'desc' }
        });

        const newId = lastFarm ? lastFarm.farm_id + 1 : 1; // ✅ ถ้าไม่มี ให้เริ่มที่ 1

        const item = await db.farm.create({
            data: {
                farm_id: newId,
                farm_name: data.farm_name,
                farm_description: data.farm_description,
                farm_type: data.farm_type,
                farm_status: data.farm_status === 'true' ? true : false,
            },
        });

        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getFarmById = async (id) => {
    try {
        const item = await db.farm.findUnique({
            where: { farm_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllFarm = async () => {
    try {
        const item = await db.farm.findMany({
            orderBy: { farm_id: 'asc' }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};
