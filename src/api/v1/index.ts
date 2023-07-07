import express from 'express';
import authRoutes from '../../features/auth/auth.route';
import userRoutes from '../../modules/users/user.route';
import bookRoutes from '../../modules/books/book.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);

export default router;
