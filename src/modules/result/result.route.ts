import express from 'express';
import * as resultController from './result.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const resultRoutes = express.Router();

resultRoutes.post('/submit', auth([userRole.admin, userRole.student]), resultController.submitExam);
resultRoutes.get('/get-result', auth([userRole.admin, userRole.student]), resultController.getResults);


resultRoutes.get('/exam/:examId', auth([userRole.admin, userRole.student]), resultController.getExamResultsByExamId);
resultRoutes.get('/student/:studentId', auth([userRole.admin, userRole.student]), resultController.getResultById);


export default resultRoutes;