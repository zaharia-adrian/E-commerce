import express from 'express';
import requireAuth from '../middleware/requireAuth.js';

import { addToCart,getCart,removeFromCart } from '../controllers/cart.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getCart);

router.post('/add-to-cart', addToCart);

router.post('/remove-from-cart', removeFromCart);

export default router;

