
import { getAllPotTypesService, getPotTypeByIdService, createPotTypeService, updatePotTypeByIdService, deletePotTypeByIdService } from "../services/potTypeService.js";

export const getAllPotTypesController = async (req, res) => {
    try {
        const item = await getAllPotTypesService();
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getPotTypeByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getPotTypeByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Pot Type not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createPotTypeController = async (req, res) => {
    try {
        const data = req.body;
        const item = await createPotTypeService(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updatePotTypeByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updatePotTypeByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Pot Type not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deletePotTypeByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deletePotTypeByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Pot Type not found" });
        }
        res.status(200).json({ success: true, message: "Pot Type deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}