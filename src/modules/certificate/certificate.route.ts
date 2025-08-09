import express from 'express';
import * as certificateController from './certificate.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const certificateRoutes = express.Router();

certificateRoutes.get('/', auth([userRole.admin, userRole.user]), certificateController.getCertificates);

export default certificateRoutes;