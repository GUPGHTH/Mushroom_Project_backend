import express from 'express';
import { register, login , updateUser} from '../controllers/authController.js';
//, getUserProfile
// import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.put("/update/:id", updateUser);

// router.get("/me", authenticateToken, getUserProfile);
export default router;