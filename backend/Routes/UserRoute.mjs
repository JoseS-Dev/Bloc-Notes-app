import {Router} from 'express';
import { ControllerUser } from '../Controller/User.mjs';
import { ModelUsers } from '../Models/Users.mjs';
import { sendEmail } from '../Middlewares/SendEmail.mjs';
import { verifiyMiddlware } from '../Middlewares/Auth.mjs';

export const RoutesUser = Router();
const controllerUser = new ControllerUser({ModelUsers: ModelUsers});

// ROUTES
// Register a new user
RoutesUser.post('/Register', sendEmail , controllerUser.registerUser);
// Login of the user
RoutesUser.post('/Login', controllerUser.LoginUser);
// Logout of the user
RoutesUser.post('/Logout', controllerUser.LogoutUser);
// Verify the user authentication
RoutesUser.post('/Verify', verifiyMiddlware , controllerUser.VerifyToken);