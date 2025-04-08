import { getAllDevicesService, getDeviceByIdService, createDeviceService, updateDeviceByIdService, deleteDeviceByIdService } from "../services/deviceService.js";

export const getAllDevicesController = async (req, res) => {
    try {
        const item = await getAllDevicesService();
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getDeviceByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getDeviceByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createDeviceController = async (req, res) => {
    try {
        const data = req.body;
        const item = await createDeviceService(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateDeviceByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateDeviceByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteDeviceByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteDeviceByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }
        res.status(200).json({ success: true, message: "Device deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}