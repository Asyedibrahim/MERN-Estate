import express from 'express'; // to use Router() import express
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',test);

export default router;