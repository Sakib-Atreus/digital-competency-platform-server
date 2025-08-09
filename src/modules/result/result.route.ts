import express from 'express';
import * as resultController from './result.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const resultRoutes = express.Router();

resultRoutes.post('/submit', auth([userRole.admin, userRole.user]), resultController.submitExam);
resultRoutes.get('/', auth([userRole.admin, userRole.user]), resultController.getResults);

export default resultRoutes;