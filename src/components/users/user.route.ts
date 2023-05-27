import express from 'express';
import * as userController from './user.controller';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;
