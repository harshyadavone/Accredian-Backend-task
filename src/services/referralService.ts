import prisma from '../config/client';
import { Referral } from '../models/referral';
import { sendReferralEmail } from '../utils/email';

export const createReferral = async (data: Referral) => {
  const referral = await prisma.referral.create({ data });
  await sendReferralEmail(data.refereeEmail, data.referrerName, data.refereeName, data.course);
  return referral;
};
