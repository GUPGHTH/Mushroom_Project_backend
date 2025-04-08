import express from 'express';

import { getAllDevicesController, getDeviceByIdController, createDeviceController, updateDeviceByIdController, deleteDeviceByIdController } from '../controllers/deviceController.js';

const router = express.Router();
router.get('/', getAllDevicesController);
router.get('/:id', getDeviceByIdController);
router.post('/', createDeviceController);
router.put('/:id', updateDeviceByIdController);
router.delete('/:id', deleteDeviceByIdController);

export default router;