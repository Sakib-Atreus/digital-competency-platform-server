import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as examService from './exam.service';

export const createExam = catchAsync(async (req: Request, res: Response) => {
  const exam = await examService.createExam(req.body);
  res.status(201).json({ success: true, data: exam });
});

export const getExams = catchAsync(async (req: Request, res: Response) => {
  const levels = req.query.levels ? (req.query.levels as string).split(',') : ['A1', 'A2'];
  const exams = await examService.getExamsByLevel(levels);
  res.status(200).json({ success: true, data: exams });
});

export const getExamQuestions = catchAsync(async (req: Request, res: Response) => {
  const questions = await examService.getExamQuestions(req.params.examId);
  res.status(200).json({ success: true, data: questions });
});