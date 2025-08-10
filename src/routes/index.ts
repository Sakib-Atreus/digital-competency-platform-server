import express from 'express';
import authRouter from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import examRoutes from '../modules/exam/exam.route';
import questionRoutes from '../modules/question/question.route';
import resultRoutes from '../modules/result/result.route';
import certificateRoutes from '../modules/certificate/certificate.route';


const Routes = express.Router();
// Array of module routes
const moduleRouts = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/users',
    router:userRoutes,
  },
  {
    path: '/exams',
    router: examRoutes,
  },
  {
    path: '/questions',
    router: questionRoutes,
  },
  {
    path: '/results',
    router: resultRoutes,
  },
  {
    path: '/certificates',
    router: certificateRoutes,
  }
];

moduleRouts.forEach(({ path, router }) => {
  Routes.use(path, router);
});

export default Routes;
