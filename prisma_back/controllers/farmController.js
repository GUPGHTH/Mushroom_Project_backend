import { updateFarmById, createFarms, deleteFarmById, getFarmById, getAllFarm } from "../services/farmService.js";
export const getFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getFarmById(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Farm not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const createFarm = async (req, res) => {
    try {
        const data = req.body;
        const item = await createFarms(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteFarmById(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Farm not found" });
        }
        res.status(200).json({ success: true, message: "Farm deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const updateFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateFarmById(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Farm not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getAllFarms = async (req, res) => {
    try {
        const items = await getAllFarm();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}