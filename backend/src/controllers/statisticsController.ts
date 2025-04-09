import { Request, Response } from 'express';
import statisticsService from '../services/statisticsService';

export const getStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract startDate and endDate from query parameters
    const { startDate, endDate } = req.query;

    // Validate that both parameters are provided
    if (!startDate || !endDate) {
      res.status(400).json({ success: false, message: 'startDate and endDate are required' });
      return;
    }

    // Convert query parameters to Date objects
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // Validate that the dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ success: false, message: 'Invalid startDate or endDate format' });
      return;
    }

    // Ensure startDate is before endDate
    if (start > end) {
      res.status(400).json({ success: false, message: 'startDate must be before endDate' });
      return;
    }

    // Call the service with the date range
    const statistics = await statisticsService.getStatistics(start, end);
    res.status(200).json({ success: true, statistics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
};