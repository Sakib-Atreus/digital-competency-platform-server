import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as resultService from './result.service';

export const submitExam = catchAsync(async (req: Request, res: Response) => {
  const { examId, answers } = req.body;
  const userId = req.user.id;

  if (!examId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  const result = await resultService.submitExam(userId, examId, answers);
  res.status(200).json({ success: true, data: result });
});

export const getResults = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const results = await resultService.getUserResults(userId);
  res.status(200).json({ success: true, data: results });
});

export const getResultById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const resultId = req.params.resultId;

  if (!resultId) {
    return res.status(400).json({ success: false, message: 'Result ID is required' });
  }

  const result = await resultService.getResultById(userId, resultId);
  if (!result) {
    return res.status(404).json({ success: false, message: 'Result not found' });
  }

  res.status(200).json({ success: true, data: result });
});

export const getExamResultsByExamId = catchAsync(async (req: Request, res: Response) => {
  const examId = req.params.examId;

  if (!examId) {
    return res.status(400).json({ success: false, message: 'Exam ID is required' });
  }

  const results = await resultService.getExamResultsByExamId(examId);
  res.status(200).json({ success: true, data: results });
});