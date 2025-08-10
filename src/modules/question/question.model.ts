import { Schema, model, Types } from 'mongoose';

const QuestionSchema = new Schema({
  examId: { type: Types.ObjectId, ref: 'Exam', required: true },
  competency: { type: String, required: true },
  level: { type: String, enum: ['A1','A2','B1','B2','C1','C2'], required: true },
  questionText: { type: String, required: true },
  options: [{ type: String }],  // Multiple choice options
  correctAnswerIndex: { type: Number, required: true }, // index of correct option
  duration: { type: Number, default: 60 }, // seconds, default 1 min per question
});

export const QuestionModel = model('Question', QuestionSchema);
