import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password } = req.body;
    const isProduction = process.env.NODE_ENV == 'production';

    const cookieOptions = (maxAge?: number) => {
      const base: any = {
        httpOnly: true,
        secure: isProduction,            // must be true in prod (HTTPS)
        sameSite:'None', // cross-site in prod
        path: '/',
      };
      if (typeof maxAge === 'number') base.maxAge = maxAge;
      return base;
    };

    const result: any = await this.authService.login({ identifier, password });
    console.log("isProduction :",isProduction)

    console.log("Login Result:", result);
    
    if (result.token) {
      res.cookie('yuvax_token', result.token, cookieOptions(60 * 60 * 1000));
    }

    if (result.refreshToken) {
      res.cookie('yuvax_refresh', result.refreshToken,cookieOptions(7 * 24 * 60 * 60 * 1000));
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: result.user,
    });
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;

    const result: any = await this.authService.register(userData);
    const isProduction = process.env.NODE_ENV == 'production';
    console.log("isProduction :",isProduction)

    if (result.token) {
      res.cookie('yuvax_token', result.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000,
        path: '/',
      });
    }

    if (result.refreshToken) {
      res.cookie('yuvax_refresh', result.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await this.authService.forgotPassword(email);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;

    const result = await this.authService.resetPassword(token, password);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });



  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    // Get refresh token from httpOnly cookie
    console.log("Cookies:", req);
    const refreshToken = req.cookies?.yuvax_refresh;
    const isProduction = process.env.NODE_ENV == 'production';

    if (!refreshToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // Refresh the token
    const result = await this.authService.refreshTokenWithCookie(refreshToken);

    // Set new access token cookie
    res.cookie('yuvax_token', result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });

    // Optionally set new refresh token (token rotation)
    if (result.refreshToken) {
      res.cookie('yuvax_refresh', result.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Token refreshed successfully',
    });
  });


  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.user_id;
    console.log("userID : ", userId)

    if (!userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const user = await this.authService.getUserProfile(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        user: user,
      },
    });
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'User ID required.',
      });
    }

    const { currentPassword, newPassword } = req.body;

    const result = await this.authService.changePassword(userId, currentPassword, newPassword);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const isProduction = process.env.NODE_ENV == 'production';

    res.cookie('yuvax_token', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      expires: new Date(0),
      path: '/',
    });

    res.cookie('yuvax_refresh', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      expires: new Date(0),
      path: '/',
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Logout successful',
    });
  });
 
}



// Export controller instance
export const authController = new AuthController();
