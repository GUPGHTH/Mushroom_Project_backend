
import express from "express";

import { getAllPotTypesController, getPotTypeByIdController, createPotTypeController, updatePotTypeByIdController, deletePotTypeByIdController } from "../controllers/potTypeController.js";

const router = express.Router();
router.get('/', getAllPotTypesController);
router.get('/:id', getPotTypeByIdController);
router.post('/', createPotTypeController);
router.put('/:id', updatePotTypeByIdController);
router.delete('/:id', deletePotTypeByIdController);

export default router;