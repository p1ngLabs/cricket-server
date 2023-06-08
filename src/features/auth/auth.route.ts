import express, { Request, Response } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import * as authController from './auth.controller';

const router = express.Router();

router.post('/register', authController.register);
router.post(
  '/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'Login successfully' });
  }
);
router.post('/logout', authController.logout);

export default router;
