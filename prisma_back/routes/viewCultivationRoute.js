import express from 'express';
import { getViewCultivationByIdController, createViewCultivationController, updateViewCultivationByIdController , deleteViewCultivationByIdController , uploadBase64ImageController   } from '../controllers/viewCultivationController.js';
// ,getAllViewCultivationController  ,deleteViewCultivationByIdController , updateViewCultivationByIdController, createViewCultivationController
const router = express.Router();

router.get('/:id', getViewCultivationByIdController);
// router.get('/', getAllViewCultivationController);
router.post('/', createViewCultivationController);
router.put('/:id', updateViewCultivationByIdController);
router.delete('/:id', deleteViewCultivationByIdController);
router.post('/uploadBase64', uploadBase64ImageController);



export default router;