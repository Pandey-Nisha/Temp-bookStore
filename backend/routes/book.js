import express from 'express';
import uploadFile from '../multer/multer.js';
import { handlePostRoute, listBooks, removeBook } from '../controller/user.js';

const router2 = express.Router();

router2.post('/add', uploadFile.single("image"), handlePostRoute);
router2.get('/list', listBooks);
router2.delete('/remove/:id', removeBook);


export default router2;