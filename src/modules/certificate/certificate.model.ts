import { Schema, model } from 'mongoose';
const CertificateSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserCollection',
      required: true,
    },
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    certificateUrl: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
export const CertificateModel = model('Certificate', CertificateSchema);
