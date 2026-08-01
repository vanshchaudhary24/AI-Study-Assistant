import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDashboardDataService } from "../services/dashboard.service";

export const getDashboardData = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const dashboard =
      await getDashboardDataService(
        req.userId!
      );

    res.status(200).json({
      success: true,
      data: dashboard,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};