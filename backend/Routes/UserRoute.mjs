import {Router} from 'express';
import { ControllerUser } from '../Controller/User.mjs';
import { ModelUsers } from '../Models/Users.mjs';

export const RoutesUser = Router();
const controllerUser = new ControllerUser({ModelUsers: ModelUsers});

// ROUTES
// Register a new user
RoutesUser.post('/Register', controllerUser.registerUser);
// Verify the user authentication
RoutesUser.post('/Verify', controllerUser.VerifyToken);