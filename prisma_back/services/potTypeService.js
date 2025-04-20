import db from '../config/db.js';

export const getAllPotTypesService = async () => {
    try {
        const items = await db.typePot.findMany();
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPotTypeByIdService = async (id) => {
    try {
        const item = await db.typePot.findUnique({
            where: { type_pot_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createPotTypeService = async (data) => {
    try {
        const item = await db.typePot.create({
            data: {
                type_pot_name: data.type_pot_name,
                description: data.description,
                status: data.status !== undefined ? data.status : true
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updatePotTypeByIdService = async (id, data) => {
    try {
        const item = await db.typePot.update({
            where: { type_pot_id: parseInt(id) },
            data: {
                type_pot_name: data.type_pot_name,
                description: data.description,
                status: data.status
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deletePotTypeByIdService = async (id) => {
    try {
        const item = await db.typePot.delete({
            where: { type_pot_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Pot type not found");
        }
        throw new Error(error.message);
    }
};