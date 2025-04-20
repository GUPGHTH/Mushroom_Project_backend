import { getItemById, createItems, deleteItemById, updateItemById, getUserByUserNameService, changeUserPasswordService } from "../services/userService.js";
import bcrypt from "bcryptjs";

export const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await getItemById(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createItem = async (req, res) => {
    try {
        const data = req.body;
        const item = await createItems(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await deleteItemById(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const item = await updateItemById(id, data);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserByUserNameController = async (req, res) => {
    try {
        const { username } = req.params;
        const data = await getUserByUserNameService(username);

        if (!data) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const changePasswordController = async (req, res) => {
    try {
        const { user_id, currentPassword, newPassword } = req.body;

        if (!user_id || !currentPassword || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find user by ID
        const user = await getItemById(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Validate current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect current password" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in DB
        await changeUserPasswordService(user_id, hashedPassword);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

