import { QuestionModel } from './question.model';

export const createQuestion = async (questionData: any) => {
  return await QuestionModel.create(questionData);
};

export const getQuestionsByExamId = async (examId: string) => {
  return await QuestionModel.find({ examId });
};