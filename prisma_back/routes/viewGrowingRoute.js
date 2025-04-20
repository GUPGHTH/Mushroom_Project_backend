import express from 'express';
import { getViewGrowingByIdController ,createViewGrowingController,deleteViewGrowingByIdController,updateViewGrowingByIdController,uploadBase64ImageController} from '../controllers/viewGrowingController.js';
const router = express.Router();

router.get('/:id', getViewGrowingByIdController);
router.post('/', createViewGrowingController);
router.put('/:id', updateViewGrowingByIdController); 
router.delete('/:id', deleteViewGrowingByIdController);  
router.post('/uploadBase64', uploadBase64ImageController);

export default router;