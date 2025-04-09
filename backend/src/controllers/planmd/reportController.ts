import { Request, Response } from 'express';
import logger from '../../config/logger'; // Fixed path
import reportService from '../../services/reportService'; // Fixed path

export const generateReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await reportService.generateReport();
    res.status(200).json({ success: true, report });
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({ success: false, message: 'Failed to generate report' });
  }
};