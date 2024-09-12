import express from 'express';
import { handleLoginRoute,handleAddToCart, handleLogoutRoute, getUserCart } from '../controller/login.js';

const router = express.Router();

router.post('/login', handleLoginRoute);
router.post('/cart', handleAddToCart); 
router.delete('/logout', handleLogoutRoute);
router.get('/cart/:email', getUserCart);

export default router;