import express from 'express';

import * as questionController from './question.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const questionRoutes = express.Router();

questionRoutes.post('/', auth([userRole.admin, userRole.user]), questionController.createQuestion);
questionRoutes.get('/:examId', auth([userRole.admin, userRole.user]), questionController.getQuestions);

export default questionRoutes;