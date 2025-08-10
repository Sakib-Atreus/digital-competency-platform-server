import { CertificateModel } from './certificate.model';
import { UserModel } from '../user/user.model';
import { ExamModel } from '../exam/exam.model';
import { generatePDF } from '../../util/pdfGenerator';
import { uploadPdfToCloudinary } from '../../util/uploadImgToCludinary';

// export const generateCertificate = async (userId: string, examId: string, certificationLevel: string) => {
//   const user = await UserModel.findById(userId);
//   const exam = await ExamModel.findById(examId);
//   if (!user || !exam) throw new Error('User or Exam not found');

//   const certificateUrl = await generatePDF({
//     userName: user.name,
//     examTitle: exam.title,
//     level: certificationLevel,
//     date: new Date().toISOString(),
//   });

//   return await CertificateModel.create({
//     userId,
//     examId,
//     certificateUrl,
//     issuedAt: new Date(),
//   });
// };

export const generateCertificate = async (
  userId: string,
  examId: string,
  certificationLevel: string,
) => {
  const user = await UserModel.findById(userId);
  const exam = await ExamModel.findById(examId);
  if (!user || !exam) throw new Error("User or Exam not found");

  // Generate local PDF file
  const localPdfPath = await generatePDF({
    userName: user.name,
    examTitle: exam.title,
    level: certificationLevel,
    date: new Date().toISOString(),
  });

  // Upload PDF to Cloudinary
  const uploadResult = await uploadPdfToCloudinary(
    `${user.name}_${exam.title}_${certificationLevel}`,
    localPdfPath
  );

  // uploadResult.secure_url is the Cloudinary URL
  const certificateUrl = uploadResult.secure_url;

  // Save the certificate record with Cloudinary URL
  return await CertificateModel.create({
    userId,
    examId,
    certificateUrl,
    issuedAt: new Date(),
  });
};


export const getUserCertificates = async (userId: string) => {
  return await CertificateModel.find({ userId }).populate('examId');
};