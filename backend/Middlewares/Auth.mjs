import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Added the token for the user
export function GenerateToken(user){
    try{
        const token = jwt.sign(
            {id_user: user.id_user, email_user: user.email_user},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        return token;
    }
    catch(error){
        console.log("Error generating token", error);
        return null;
    }
}

// Verify if the token is valid
export const verifiyMiddlware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log("Error: No token provided");
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({message: 'Invalid token'});
    }
}