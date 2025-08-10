import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as certificateService from './certificate.service';
import { CertificateModel } from './certificate.model';
import path from 'path';

export const getCertificates = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const certificates = await certificateService.getUserCertificates(userId);
  res.status(200).json({ success: true, data: certificates });
});

// export const downloadCertificate = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   const certificateId = req.params.id;

//   const certificate = await CertificateModel.findOne({ _id: certificateId, userId });
//   if (!certificate) {
//     return res.status(404).json({ success: false, message: 'Certificate not found' });
//   }

//   const filePath = path.join(__dirname, '../../../', certificate.certificateUrl);
//   res.download(filePath);
// });

export const downloadCertificate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const certificateId = req.params.id;

  const certificate = await CertificateModel.findOne({ _id: certificateId, userId });
  if (!certificate) {
    return res.status(404).json({ success: false, message: "Certificate not found" });
  }

  // Redirect client to Cloudinary URL
  res.redirect(certificate.certificateUrl);
});
