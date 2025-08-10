import express from 'express';

import * as examController from './exam.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const examRoutes = express.Router();

examRoutes.post(
  '/create-exam',
  auth([userRole.admin, userRole.student]),
  examController.createExam,
);
examRoutes.get(
  '/',
  auth([userRole.admin, userRole.student]),
  examController.getExams,
);
examRoutes.get('/all', examController.getAllExams);

examRoutes.get(
  '/all-exams',
  auth([userRole.admin, userRole.student]),
  examController.getExams,
);
examRoutes.get(
  '/:examId/questions',
  auth([userRole.admin, userRole.student]),
  examController.getExamQuestions,
);
examRoutes.get(
  '/single-exam/:examId',
  auth([userRole.admin, userRole.student]),
  examController.getExamById,
);

export default examRoutes;
