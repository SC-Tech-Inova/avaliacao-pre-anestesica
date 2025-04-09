import { Response } from 'express';
import logger from '../config/logger';

export class BaseController {
  protected sendSuccess(res: Response, data: any, status: number = 200) {
    res.status(status).json({
      success: true,
      data
    });
  }

  protected sendError(res: Response, message: string, status: number = 500) {
    logger.error(message);
    res.status(status).json({
      success: false,
      error: message
    });
  }
}