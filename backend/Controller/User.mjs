import { ValidateDataUser, ValidateDataLoginUser } from "../Validations/SchemaUser.mjs";
import { GenerateToken } from "../Middlewares/Auth.mjs";
export class ControllerUser {
    constructor({ModelUsers}){
        this.ModelUsers = ModelUsers;
    }
    // Register a new user
    registerUser = async (req, res) => {
        const result = ValidateDataUser(req.body);
        try{
            if(!result.success) return res.status(400).json({message: result.message});
            const register = await this.ModelUsers.registerUser({user: result.data});
            if(register){
                return res.status(201).json({
                    message: 'User registered successfully',
                    data: register
                });
            }
        }
        catch(error){
            console.log("Error in ControllerUser.registerUser:", error);
            return res.status(500).json({message: 'Error registering the user', error: error.message});
        }
    }

    // Login of the user
    LoginUser = async (req, res) => {
        const result = ValidateDataLoginUser(req.body);
        try{
            if(!result.success) return res.status(400).json({message: result.message});
            const Login = await this.ModelUsers.LoginUser({user: result.data});
            if(Login){
                return res.status(200).json({
                    message: 'User logged in successfully',
                    data: Login,
                    token: GenerateToken(Login)
                })
            }
        }
        catch(error){
            console.log("Error in ControllerUser.LoginUser:", error);
            return res.status(500).json({message: 'Error logging in the user', error: error.message});
        }
    }

    // Logout of the user
    LogoutUser = async (req, res) => {
        try{
            const Logout = await this.ModelUsers.LogoutUser({user: req.body});
            if(Logout){
                return res.status(200).json({message: Logout.message});
            }
        }
        catch(error){
            console.log("Error in ControllerUser.LogoutUser:", error);
            return res.status(500).json({message: 'Error logging out the user', error: error.message});
        }
    }

    // Function to verify the user authentication
    VerifyToken = async (req, res) => {
        if(!req.user){
            return res.status(401).json({
                message: 'User no authenticated',
                isAuthenticated: false
            })
        }
        return res.status(200).json({
            message: 'User authenticated',
            isAuthenticated: true,
        })
    }
}