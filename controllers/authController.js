import bcrypt from "bcryptjs";
import { createUser, getUserByUsername, generateToken } from '../services/authService.js';

// ✅ ฟังก์ชันอัปเดตข้อมูลผู้ใช้
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("📌 Received ID from request:", id); // ✅ ตรวจสอบค่าที่ส่งมา
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const { username, password } = req.body;
        let updatedData = { username };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10); // ✅ Hash รหัสผ่านใหม่ก่อนบันทึก
        }

        console.log("📌 Backend - Updating user:", id, updatedData); // ✅ Debugging

        const updatedUser = await db.user.update({
            where: { user_id: parseInt(id) }, // ✅ Prisma ใช้ `user_id` เป็น Primary Key
            data: updatedData,
            select: { user_id: true, username: true },
        });

        console.log("✅ Backend - User updated:", updatedUser);
        res.json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("❌ Error updating user:", error);
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};


const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ username, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log({username,password});
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials1' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials2' });
        }

        const token = generateToken(user.id, user.username, user.password);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
//, updateUser

export { register, login };
 



