import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as questionService from './question.service';

export const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionService.createQuestion(req.body);
  res.status(201).json({ success: true, data: question });
});

export const getQuestions = catchAsync(async (req: Request, res: Response) => {
  const questions = await questionService.getQuestionsByExamId(req.params.examId);
  res.status(200).json({ success: true, data: questions });
});