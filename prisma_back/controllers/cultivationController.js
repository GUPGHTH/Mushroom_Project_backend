import {getAllCultivationsService,createCultivationService,deleteCultivationByIdService,updateCultivationByIdService,getCultivationByIdService} from "../services/cultivationService.js";
export const getAllCultivationsController = async (req, res) => {
    try {
        const item = await getAllCultivationsService();
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getCultivationByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const createCultivationController = async (req, res) => {
    try {
        const data = req.body;
        const item = await createCultivationService(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const updateCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateCultivationByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const deleteCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteCultivationByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }
        res.status(200).json({ success: true, message: "Cultivation deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
