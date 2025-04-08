import express from 'express';
const router = express.Router();

import { testPrisma } from './hello.js';

router.get("/",testPrisma);

export default router;