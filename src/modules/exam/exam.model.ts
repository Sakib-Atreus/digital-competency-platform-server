import { Schema, model } from 'mongoose';

const ExamSchema = new Schema({
  title: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], 
    required: true 
  },
  step: { type: Number, enum: [1, 2, 3], required: true }, 
  description: { type: String },
  duration: { type: Number, required: true }, 
  passMark: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const ExamModel = model('Exam', ExamSchema);
