import express from 'express';
import userRoutes from '../../components/users/user.route';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
