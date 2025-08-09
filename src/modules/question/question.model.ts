import { Schema, model } from 'mongoose';
const QuestionSchema = new Schema(
  {
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    questionText: { type: String, required: true },
    options: [{ text: String, isCorrect: Boolean }],
    marks: { type: Number, required: true },
  },
  { timestamps: true },
);
export const QuestionModel = model('Question', QuestionSchema);
