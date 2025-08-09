import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as certificateService from './certificate.service';

export const getCertificates = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const certificates = await certificateService.getUserCertificates(userId);
  res.status(200).json({ success: true, data: certificates });
});