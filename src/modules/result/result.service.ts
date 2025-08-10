import { ResultModel } from './result.model';
import { QuestionModel } from '../question/question.model';
import { ExamModel } from '../exam/exam.model';
import { ProfileModel, UserModel } from '../user/user.model';
import { CertificateModel } from '../certificate/certificate.model';
import mongoose from 'mongoose';

interface Answer {
  questionId: string;
  selectedOptionIndex: number | string;
}

interface SubmitExamResponse {
  result: typeof ResultModel & mongoose.Document;
  certificationLevel: string;
  proceedToNext: boolean;
}

export const submitExam = async (
  userId: string,
  examId: string,
  answers: Answer[],
): Promise<SubmitExamResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const exam = await ExamModel.findById(examId).session(session);
    if (!exam) throw new Error('Exam not found');

    const questions = await QuestionModel.find({ examId }).session(session);

    let totalMarks = 0;
    let scoredMarks = 0;

    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (question) {
        totalMarks += 1;
        // Convert selectedOptionIndex to number before comparing
        const selectedIndex = typeof answer.selectedOptionIndex === 'string'
          ? Number(answer.selectedOptionIndex)
          : answer.selectedOptionIndex;

        if (selectedIndex === question.correctAnswerIndex) {
          scoredMarks += 1;
        }
      }
    }

    if (totalMarks === 0) throw new Error('No questions found or no answers submitted');

    const score = (scoredMarks / totalMarks) * 100;

    let certificationLevel = exam.level;
    let passed = score >= exam.passMark;

    // 3-step logic
    if (exam.step === 1) {
      if (score < 25) passed = false;
      else if (score >= 25 && score < 50) certificationLevel = 'A1';
      else if (score >= 50 && score < 75) certificationLevel = 'A2';
      else if (score >= 75) certificationLevel = 'A2';
    } else if (exam.step === 2) {
      if (score < 25) {
        certificationLevel = 'A2';
        passed = false;
      } else if (score >= 25 && score < 50) certificationLevel = 'B1';
      else if (score >= 50 && score < 75) certificationLevel = 'B2';
      else if (score >= 75) certificationLevel = 'B2';
    } else if (exam.step === 3) {
      if (score < 25) {
        certificationLevel = 'B2';
        passed = false;
      } else if (score >= 25 && score < 50) certificationLevel = 'C1';
      else if (score >= 50) certificationLevel = 'C2';
    }

    // Save result - returns Document[]
    const [result] = await ResultModel.create(
      [
        {
          userId,
          examId,
          score,
          passed,
          completedAt: new Date(),
        },
      ],
      { session },
    );

    if (passed) {
      await CertificateModel.create(
        [
          {
            userId,
            examId,
            certificateUrl: `certificates/${userId}_${examId}_${certificationLevel}.pdf`,
            issuedAt: new Date(),
          },
        ],
        { session },
      );
    }

    const profile = await ProfileModel.findOne({ user_id: userId }).session(session);
    if (!profile) throw new Error('User profile not found');

    profile.examProgress = profile.examProgress || {
      currentStep: 1,
      finalLevel: null,
      hasCompleted: false,
      results: [],
      retakesUsed: 0,
    };

    // Push result with step cast as number union 1|2|3
    profile.examProgress.results.push({
      step: exam.step as 1 | 2 | 3,
      score,
      certifiedLevel: certificationLevel,
      completedAt: new Date(),
    });

    profile.examProgress.currentStep =
      exam.step < 3 && score >= 75 ? (exam.step + 1) as 1 | 2 | 3 : (exam.step as 1 | 2 | 3);
    profile.examProgress.finalLevel = certificationLevel;
    profile.examProgress.hasCompleted = exam.step === 3 || score < 75;

    await profile.save({ session });

    await session.commitTransaction();

    return {
      result: result as any,  // Mongoose Document
      certificationLevel,
      proceedToNext: exam.step < 3 && score >= 75,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getUserResults = async (userId: string) => {
  return await ResultModel.find({ userId }).populate('examId');
};

export const getResultById = async (userId: string, resultId: string) => {
  const result = await ResultModel.findOne({ _id: resultId, userId }).populate('examId');
  if (!result) throw new Error('Result not found');
  return result;
};

export const getExamResultsByExamId = async (examId: string) => {
  return await ResultModel.find({ examId }).populate('userId');
};