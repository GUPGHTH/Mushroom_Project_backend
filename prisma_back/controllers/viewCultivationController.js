import { getViewCultivationByDeviceIdService, createViewCultivationByIdService, updateViewCultivationByIdService , deleteViewCultivationByIdService} from "../services/viewCultivationService.js";
// ,getAllViewCultivationService , updateViewCultivationByIdService , deleteViewCultivationByIdService, createViewCultivationByIdService
export const getViewCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getViewCultivationByDeviceIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// export const getAllViewCultivationController = async (req, res) => {
//     try {
//         const item = await getAllViewCultivationService();
//         res.status(200).json({ success: true, data: item });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

 
export const createViewCultivationController = async (req, res) => {
    try {
        console.log("🔹 Request Body in createViewCultivationController:", req.body); // ✅ Debug ดูค่าที่ถูกส่งมาจาก Frontend

        const data = req.body;
        const item = await createViewCultivationByIdService(data);

        console.log("✅ Successfully created item:", item); // ✅ Debug ดูค่าหลังจากสร้างสำเร็จ

        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error("❌ Error in createViewCultivationController:", error.message); // ✅ Debug ดู Error
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateViewCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateViewCultivationByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteViewCultivationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteViewCultivationByIdService(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Cultivation not found" });
        }

        res.status(200).json({ success: true, message: "Cultivation deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// API Endpoint รับ Base64 จาก Node-RED
export const uploadBase64ImageController = async (req, res) => {
    try {
        const { cultivation_pot_id, image_base64 } = req.body;

        if (!cultivation_pot_id || !image_base64) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const updatedItem = await uploadBase64ImageService(cultivation_pot_id, image_base64);
        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};