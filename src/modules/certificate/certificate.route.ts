import express from 'express';
import * as certificateController from './certificate.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../constents';

const certificateRoutes = express.Router();

certificateRoutes.get('/', auth([userRole.admin, userRole.student]), certificateController.getCertificates);

certificateRoutes.get('/download/:id', auth([userRole.admin, userRole.student]), certificateController.downloadCertificate);


export default certificateRoutes;