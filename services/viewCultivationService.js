import db from '../config/db.js';

export const getViewCultivationByIdService = async (cul_id) => {
    try {
        const items = await db.cultivationPot.findMany({
            where: { cultivation_id: parseInt(cul_id) },
            include: {
                typePot: {  // ✅ JOIN กับตาราง typePot
                    select: { type_pot_name: true }
                }
            }
        });
        

        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

// export const getAllViewCultivationService = async () => {
//     try {
//         const items = await db.cultivationPot.findMany();
//         return items;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
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
export const updateViewCultivationByIdService = async (id, data) => {
    try {
        const item = await db.cultivationPot.update({
            where: { cultivation_pot_id: parseInt(id) }, // ✅ ใช้ `cultivation_pot_id`
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteViewCultivationByIdService = async (cul_id) => {
    try {
        const item = await db.cultivationPot.delete({
            where: { cultivation_pot_id: parseInt(cul_id) }, // ✅ แก้เป็น `cultivation_pot_id`
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
            data: { image_base64: imageBase64 },
        });

        return updatedItem;
    } catch (error) {
        throw new Error(error.message);
    }
};


export default db;
