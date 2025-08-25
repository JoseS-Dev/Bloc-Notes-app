export class ControllerUser {
    constructor({ModelUsers}){
        this.ModelUsers = ModelUsers;
    }
    
    // Function to verify the user authentication
    VerifyToken = (req, res) => {
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