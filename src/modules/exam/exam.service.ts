import { ExamModel } from './exam.model';
import { QuestionModel } from '../question/question.model';

export const createExam = async (examData: any) => {
  return await ExamModel.create(examData);
};

export const getExamsByLevel = async (levels: string[]) => {
  return await ExamModel.find({ level: { $in: levels }, isActive: true });
};

export const getExamQuestions = async (examId: string) => {
  return await QuestionModel.find({ examId });
};