// routes/user.js
import express from 'express';
import { signup, login, forgotPassword, resetPassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword );

export { router as UserRouter };
