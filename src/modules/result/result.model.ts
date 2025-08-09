import { Schema, model } from 'mongoose';
const ResultSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserCollection',
      required: true,
    },
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
export const ResultModel = model('Result', ResultSchema);
