import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as authService from './auth.service';
import asyncHandler from '../../utils/asyncHandler';
import { PassportUser } from '../../@types/components/user';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await authService.register(req.body);
  res.status(httpStatus.CREATED).json({ success: true, user: newUser });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const authenticatedUser = await authService.login(req.user as PassportUser);
  res.status(httpStatus.OK).json({ success: true, user: authenticatedUser });
});

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) next(err);
      res
        .status(httpStatus.NO_CONTENT)
        .json({ success: true, message: 'Logout successfully' });
    });
  }
);

export const forgotPassword = () => {};
