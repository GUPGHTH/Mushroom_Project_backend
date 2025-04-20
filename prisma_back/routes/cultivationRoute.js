import express from 'express';
import { getAllCultivationsController, getCultivationByIdController, createCultivationController, updateCultivationByIdController, deleteCultivationByIdController } from '../controllers/cultivationController.js';
const router = express.Router();
router.get('/', getAllCultivationsController);
router.get('/:id', getCultivationByIdController);
router.post('/', createCultivationController);
router.put('/:id', updateCultivationByIdController);
router.delete('/:id', deleteCultivationByIdController);
export default router;