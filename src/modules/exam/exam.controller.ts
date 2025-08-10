import { Request, Response } from 'express';
import catchAsync from '../../util/catchAsync';
import * as examService from './exam.service';

export const createExam = catchAsync(async (req: Request, res: Response) => {
  const exam = await examService.createExam(req.body);
  res.status(201).json({ success: true, data: exam });
});

export const getExams = catchAsync(async (req: Request, res: Response) => {
  const step = Number(req.query.step) || 1;
  
  const exams = await examService.getExamsByStep(step);
  res.status(200).json({ success: true, data: exams });
});

export const getExamById = catchAsync(async (req: Request, res: Response) => {
  const exam = await examService.getExamById(req.params.examId);
  if (!exam) {
    return res.status(404).json({ success: false, message: 'Exam not found' });
  }
  res.status(200).json({ success: true, data: exam });
});

export const getExamQuestions = catchAsync(async (req: Request, res: Response) => {
  const questions = await examService.getExamQuestions(req.params.examId);
  res.status(200).json({ success: true, data: questions });
});

export const getExamsByLevel = catchAsync(async (req: Request, res: Response) => {
  // Get 'levels' query param and split by comma, fallback to default ['A1', 'A2']
  const levels = req.query.levels
    ? (req.query.levels as string).split(',')  // parse string to array
    : ['A1', 'A2'];

  const exams = await examService.getExamsByLevel(levels); // your existing service method

  res.status(200).json({ success: true, data: exams });
});
