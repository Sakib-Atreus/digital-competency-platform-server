import { ResultModel } from './result.model';
import { QuestionModel } from '../question/question.model';
import { ExamModel } from '../exam/exam.model';
import { UserModel } from '../user/user.model';
import { CertificateModel } from '../certificate/certificate.model';
import mongoose from 'mongoose';

export const submitExam = async (userId: string, examId: string, answers: { questionId: string, selectedOption: string }[]) => {
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
        totalMarks += question.marks;
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (correctOption && correctOption.text === answer.selectedOption) {
          scoredMarks += question.marks;
        }
      }
    }

    const score = (scoredMarks / totalMarks) * 100;
    let certificationLevel = exam.level;
    let passed = score >= exam.passMark;

    // Determine certification and progression
    const user = await UserModel.findById(userId).session(session);
    if (!user) throw new Error('User not found');

    if (exam.level === 'A1' || exam.level === 'A2') {
      if (score < 25) {
        passed = false;
      } else if (score >= 25 && score < 50) {
        certificationLevel = 'A1';
      } else if (score >= 50) {
        certificationLevel = 'A2';
      }
    } else if (exam.level === 'B1' || exam.level === 'B2') {
      if (score < 25) {
        certificationLevel = 'A2';
        passed = false;
      } else if (score >= 25 && score < 50) {
        certificationLevel = 'B1';
      } else if (score >= 50) {
        certificationLevel = 'B2';
      }
    } else if (exam.level === 'C1' || exam.level === 'C2') {
      if (score < 25) {
        certificationLevel = 'B2';
        passed = false;
      } else if (score >= 25 && score < 50) {
        certificationLevel = 'C1';
      } else if (score >= 50) {
        certificationLevel = 'C2';
      }
    }

    const result = await ResultModel.create([{
      userId,
      examId,
      score,
      passed,
      completedAt: new Date(),
    }], { session });

    if (passed) {
      await CertificateModel.create([{
        userId,
        examId,
        certificateUrl: `certificates/${userId}_${examId}_${certificationLevel}.pdf`,
        issuedAt: new Date(),
      }], { session });
    }

    await session.commitTransaction();
    return { result: result[0], certificationLevel, proceedToNext: score >= 75 };
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