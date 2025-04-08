import db from '../config/db.js';
 
export const getViewGrowingByIdService = async (gro_id) => {
    try {
        const items = await db.growingPot.findMany({
            where: { growing_id: parseInt(gro_id) },
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
export const createViewGrowingByIdService = async (data) => {
    try {
        const item = await db.growingPot.create({
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const updateViewGrowingByIdService = async (id, data) => {
    try {
        const item = await db.growingPot.update({
            where: { growing_pot_id: parseInt(id) }, // ✅ ใช้ `growing_pot_id`
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteViewGrowingByIdService = async (gro_id) => {
    try {
        const item = await db.growingPot.delete({
            where: { growing_pot_id: parseInt(gro_id) }, // ✅ แก้เป็น `growing_pot_id`
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
            data: { image_base64: imageBase64 },
        });

        return updatedItem;
    } catch (error) {
        throw new Error(error.message);
    }
};
export default db;
