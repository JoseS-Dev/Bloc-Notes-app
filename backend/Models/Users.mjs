import {connection} from '../DbConn.mjs';
import bcrypt from 'bcryptjs';
export class ModelUsers {
    // Register a new user
    static async registerUser({user}){
        if(!user) return {message: 'The data for the user is required'};
        const {name_user, last_name, username, email_user, password_user} = user;
        // Check if the email or username existing in the database
        const existingUser = await connection.query(
            `SELECT * FROM users WHERE email_user = $1 OR username = $2`,
            [email_user, username] 
        )
        if(existingUser.rowCount > 0) return {message: 'The email or username already exists'};
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password_user, 10);
        // Insert the new user in the database
        const createUser = await connection.query(
            `INSERT INTO users (name_user, last_name, username, email_user, password_user) VALUES($1, $2, $3, $4, $5)`,
            [name_user, last_name, username, email_user, hashedPassword]
        )
        if(createUser.rowCount === 0) return {message: 'Error creating the user'};
        return {message: 'User created successfully'}
    }
}