import db from '../config/db.js';

export const getAllDevicesService = async () => {
    try {
        // Verify database connection first
        await db.$queryRaw`SELECT 1`;

        const devices = await db.device.findMany({
            include: {
                farm: {  // Matches your schema's relation name
                    select: {
                        farm_id: true,
                        farm_name: true,
                        farm_status: true
                    }
                },
                CultivationPot: {
                    select: {
                        cultivation_pot_id: true,
                        pot_name: true,
                        status: true,
                        TypePot: {
                            select: {
                                type_pot_name: true
                            }
                        }
                    },
                    take: 10  // Limit to prevent over-fetching
                },
                GrowingPot: {
                    select: {
                        growing_pot_id: true,
                        pot_name: true,
                        status: true,
                        TypePot: {
                            select: {
                                type_pot_name: true
                            }
                        }
                    },
                    take: 10
                }
            },
            orderBy: {
                device_id: 'asc'
            }
        });

        if (!devices || devices.length === 0) {
            console.warn('No devices found in database');
            return [];
        }

        // Transform data for cleaner response
        return devices.map(device => ({
            device_id: device.device_id,
            device_name: device.device_name,
            status: device.status,
            device_type: device.device_type,
            farm_info: device.farm ? {
                farm_id: device.farm.farm_id,
                name: device.farm.farm_name,
                status: device.farm.farm_status
            } : null,
            cultivation_pots: device.CultivationPot.map(pot => ({
                id: pot.cultivation_pot_id,
                name: pot.pot_name,
                status: pot.status,
                type: pot.TypePot.type_pot_name
            })),
            growing_pots: device.GrowingPot.map(pot => ({
                id: pot.growing_pot_id,
                name: pot.pot_name,
                status: pot.status,
                type: pot.TypePot.type_pot_name
            })),
            stats: {
                total_cultivation: device.CultivationPot.length,
                total_growing: device.GrowingPot.length
            }
        }));

    } catch (error) {
        console.error('Database operation failed:', {
            error: error.message,
            stack: error.stack,
            code: error.code
        });

        // Handle specific Prisma errors
        if (error.code === 'P2025') {
            throw new Error('Device data not found');
        }
        if (error.code === 'P1017') {
            throw new Error('Database connection issues');
        }

        throw new Error('Failed to fetch device data. Please try again later.');
    }
};

export const getDeviceByIdService = async (id) => {
    try {
        const item = await db.device.findUnique({
            where: { device_id: parseInt(id) },
            include: {
                farm: true,
                CultivationPot: true,
                GrowingPot: true
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createDeviceService = async (data) => {
    try {
        const item = await db.device.create({
            data: {
                device_name: data.device_name,
                description: data.description,
                status: data.status || 'inactive',
                device_type: data.device_type,
                farm_id: data.farm_id ? parseInt(data.farm_id) : null
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateDeviceByIdService = async (id, data) => {
    try {
        const item = await db.device.update({
            where: { device_id: parseInt(id) },
            data: {
                device_name: data.device_name,
                description: data.description,
                status: data.status,
                device_type: data.device_type,
                farm_id: data.farm_id ? parseInt(data.farm_id) : null
            }
        });
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteDeviceByIdService = async (id) => {
    try {
        const item = await db.device.delete({
            where: { device_id: parseInt(id) },
        });
        return item;
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error("Device not found");
        }
        throw new Error(error.message);
    }
};