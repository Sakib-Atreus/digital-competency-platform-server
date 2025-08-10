import { ExamModel } from './exam.model';
import { QuestionModel } from '../question/question.model';
import { Types } from 'mongoose';
import { ProfileModel } from '../user/user.model';
import { ExamResult } from '../user/user.interface';

export const createExam = async (examData: any) => {
  return await ExamModel.create(examData);
};

export const getExamsByStep = async (step: number) => {
  const stepLevelsMap: { [key: number]: string[] } = {
    1: ['A1', 'A2'],
    2: ['B1', 'B2'],
    3: ['C1', 'C2'],
  };
  const levels = stepLevelsMap[step] || [];
  return await ExamModel.find({ level: { $in: levels }, step, isActive: true });
};

export const getExamQuestions = async (examId: string) => {
  return await QuestionModel.find({ examId });
};

export const getExamById = async (examId: string) => {
  return await ExamModel.findById(examId);
};

export const getExamsByLevel = async (levels: string[]) => {
  return await ExamModel.find({ level: { $in: levels }, isActive: true });
};

/**
 * Evaluate user's score and return certification and next step info
 */
export const evaluateStepResult = (step: number, scorePercent: number) => {
  if (step === 1) {
    if (scorePercent < 25) return { result: 'Fail', canRetake: false, certifiedLevel: null, nextStep: null };
    if (scorePercent < 50) return { result: 'Pass', certifiedLevel: 'A1', nextStep: null };
    if (scorePercent < 75) return { result: 'Pass', certifiedLevel: 'A2', nextStep: null };
    return { result: 'Pass', certifiedLevel: 'A2', nextStep: 2 };
  }
  if (step === 2) {
    if (scorePercent < 25) return { result: 'Pass', certifiedLevel: 'A2', nextStep: null };
    if (scorePercent < 50) return { result: 'Pass', certifiedLevel: 'B1', nextStep: null };
    if (scorePercent < 75) return { result: 'Pass', certifiedLevel: 'B2', nextStep: null };
    return { result: 'Pass', certifiedLevel: 'B2', nextStep: 3 };
  }
  if (step === 3) {
    if (scorePercent < 25) return { result: 'Pass', certifiedLevel: 'B2', nextStep: null };
    if (scorePercent < 50) return { result: 'Pass', certifiedLevel: 'C1', nextStep: null };
    return { result: 'Pass', certifiedLevel: 'C2', nextStep: null };
  }
};

/**
 * Save exam result to user profile
 */
export const saveExamResultToProfile = async (
  userId: Types.ObjectId,
  step: 1 | 2 | 3,
  score: number,
  certifiedLevel: ExamResult['certifiedLevel'],
  nextStep: 1 | 2 | 3 | null,
): Promise<void> => {
  const profile = await ProfileModel.findOne({ user_id: userId });
  if (!profile) throw new Error('Profile not found');

  // Initialize examProgress if undefined
  if (!profile.examProgress) {
    profile.examProgress = {
      currentStep: 1,
      finalLevel: null,
      hasCompleted: false,
      results: [],
      retakesUsed: 0,
    };
  }

  // Push new exam result to the Mongoose DocumentArray (it's safe now)
  profile.examProgress.results.push({
    step,
    score,
    certifiedLevel,
    completedAt: new Date(),
  });

  // Update examProgress state
  profile.examProgress.currentStep = nextStep ?? step;
  profile.examProgress.finalLevel = certifiedLevel;
  profile.examProgress.hasCompleted = nextStep === null;

  // Save the updated profile
  await profile.save();
};
