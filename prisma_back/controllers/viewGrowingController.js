import { getViewGrowingByIdService ,createViewGrowingByIdService,deleteViewGrowingByIdService,updateViewGrowingByIdService,uploadBase64ImageService } from "../services/viewGrowingService.js";
export const getViewGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getViewGrowingByIdService(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// export const getAllViewGrowingController = async (req, res) => {
//     try {
//         const item = await getAllViewGrowingService();
//         res.status(200).json({ success: true, data: item });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

 
export const createViewGrowingController = async (req, res) => {
    try {
        console.log("🔹 Request Body in createViewGrowingnController:", req.body); // ✅ Debug ดูค่าที่ถูกส่งมาจาก Frontend

        const data = req.body;
        const item = await createViewGrowingByIdService(data);

        console.log("✅ Successfully created item:", item); // ✅ Debug ดูค่าหลังจากสร้างสำเร็จ

        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error("❌ Error in createViewGrowingController:", error.message); // ✅ Debug ดู Error
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateViewGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateViewGrowingByIdService(id, data);
        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteViewGrowingByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteViewGrowingByIdService(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Growing not found" });
        }

        res.status(200).json({ success: true, message: "Growing deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// API Endpoint รับ Base64 จาก Node-RED
export const uploadBase64ImageController = async (req, res) => {
    try {
        const { growing_pot_id, image_base64 } = req.body;

        if (!growing_pot_id || !image_base64) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const updatedItem = await uploadBase64ImageService(growing_pot_id, image_base64);
        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
