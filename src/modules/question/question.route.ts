import express from 'express';

import * as questionController from './question.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const questionRoutes = express.Router();

questionRoutes.post('/create-question', auth([userRole.admin, userRole.student]), questionController.createQuestion);
questionRoutes.get('/get-allQuestion/:examId', auth([userRole.admin, userRole.student]), questionController.getQuestions);

export default questionRoutes;