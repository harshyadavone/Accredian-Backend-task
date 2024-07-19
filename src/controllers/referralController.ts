import { Request, Response, NextFunction } from "express";
import { createReferral } from "../services/referralService";
import { referralSchema } from "../validations/referralValidation";

export const createReferralHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = referralSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.errors,
      });
    }

    const referral = await createReferral(result.data);
    res
      .status(201)
      .json({ message: "Referral created successfully", referral });
  } catch (error) {
    next(error);
  }
};
