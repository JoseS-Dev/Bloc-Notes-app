import { ValidateDataUser } from "../Validations/SchemaUser.mjs";
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
                return res.status(201).json({message: register.message});
            }
        }
        catch(error){
            console.log("Error in ControllerUser.registerUser:", error);
            return res.status(500).json({message: 'Error registering the user', error: error.message});
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