import express from "express";
import { getFarm,createFarm,deleteFarm,updateFarm,getAllFarms } from "../controllers/farmController.js";

const router = express.Router();

router.get('/:id', getFarm);
router.post('/', createFarm);
router.delete('/:id', deleteFarm);
router.put('/:id', updateFarm);
router.get('/', getAllFarms);

export default router;
