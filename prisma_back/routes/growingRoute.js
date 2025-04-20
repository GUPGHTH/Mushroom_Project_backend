import express from 'express';
import { getAllGrowingsController,getGrowingByIdController,createGrowingController,updateGrowingByIdController,deleteGrowingByIdController } from '../controllers/growingController.js';
const router = express.Router();
router.get('/', getAllGrowingsController);
router.get('/:id', getGrowingByIdController);
router.post('/', createGrowingController);
router.put('/:id', updateGrowingByIdController);
router.delete('/:id', deleteGrowingByIdController);


export default router;