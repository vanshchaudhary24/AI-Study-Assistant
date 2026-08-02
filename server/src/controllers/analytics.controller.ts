import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getAnalyticsService } from "../services/analytics.service";

export const getAnalytics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const analytics = await getAnalyticsService(
      req.userId!
    );

    res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};