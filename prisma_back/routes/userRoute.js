import express from 'express';
import { getItem,createItem ,deleteItem , updateItem, getUserByUserNameController, changePasswordController} from '../controllers/userController.js';

const router = express.Router();

router.get('/:username', getUserByUserNameController)
// router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post('/changePassword',changePasswordController);
export default router;