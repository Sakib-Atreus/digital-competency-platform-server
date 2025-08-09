import express from 'express';

import * as examController from './exam.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const examRoutes = express.Router();

examRoutes.post('/', auth([userRole.admin, userRole.user]), examController.createExam);
examRoutes.get('/', auth([userRole.admin, userRole.user]), examController.getExams);
examRoutes.get('/:examId/questions', auth([userRole.admin, userRole.user]), examController.getExamQuestions);

export default examRoutes;