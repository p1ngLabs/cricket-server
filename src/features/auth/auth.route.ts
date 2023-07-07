import express from 'express';
import passport from 'passport';
import * as authController from './auth.controller';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);

export default router;
