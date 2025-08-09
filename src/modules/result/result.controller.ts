import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as resultService from './result.service';

export const submitExam = catchAsync(async (req: Request, res: Response) => {
  const { examId, answers } = req.body;
  const userId = req.user.id;
  const result = await resultService.submitExam(userId, examId, answers);
  res.status(200).json({ success: true, data: result });
});

export const getResults = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const results = await resultService.getUserResults(userId);
  res.status(200).json({ success: true, data: results });
});