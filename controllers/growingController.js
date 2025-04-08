import {getAllGrowingsService,getGrowingByIdService,createGrowingService,deleteGrowingByIdService,updateGrowingByIdService} from "../services/growingService.js";
export const getAllGrowingsController = async (req, res) => {
    try {
        const item = await getAllGrowingsService();
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getGrowingByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const createGrowingController = async (req, res) => {
    try {
        const data = req.body;
        const item = await createGrowingService(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const updateGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateGrowingByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const deleteGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteGrowingByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }
        res.status(200).json({ success: true, message: "Growing deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
