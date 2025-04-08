import db from '../config/db.js';

export const getAllDevicesService = async () => {
    try {
        const item = await db.device.findMany({
            orderBy: { device_id: 'asc' } // ✅ เรียงลำดับ device_id จากน้อยไปมาก
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDeviceByIdService = async (id) => {
    try {
        const item = await db.device.findUnique({
            where: { device_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createDeviceService = async (data) => {
    try {
        const lastDevice = await db.device.findFirst({
            orderBy: { device_id: 'desc' } // ✅ หา device_id ล่าสุด
        });

        const newId = lastDevice ? lastDevice.device_id + 1 : 1; // ✅ ถ้ามีข้อมูล ให้เพิ่มทีละ 1 ถ้าไม่มีเริ่มที่ 1

        const item = await db.device.create({
            data: { ...data, device_id: newId },
        });

        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateDeviceByIdService = async (id, data) => {
    try {
        const item = await db.device.update({
            where: { device_id: parseInt(id) },
            data,
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteDeviceByIdService = async (id) => {
    try {
        const item = await db.device.delete({
            where: { device_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
}
