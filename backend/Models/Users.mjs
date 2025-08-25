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

    // Login of the user
    static async LoginUser({user}){
        if(!user) return {message: 'The data for the user is required'};
        const {email_user, password_user} = user;
        // check if the email existing in the database
        const existingUser = await connection.query(
            `SELECT * FROM users WHERE email_user = $1`,
            [email_user]
        )
        if(existingUser.rowCount > 0){
            const userid = existingUser.rows[0].id_user;
            // compare the password
            const isPasswordValid = bcrypt.compareSync(password_user, existingUser.rows[0].password_user);
            if(isPasswordValid){
                // Check if the user is logged in
                const loggedUser = await connection.query(
                    `SELECT * FROM login_users WHERE id_user = $1`,
                    [userid]
                )
                if(loggedUser.rowCount > 0){
                    await connection.query(
                        `UPDATE login_users SET is_active = $1 WHERE id_user = $2`,
                        [true, userid]
                    )
                }
                else{
                    // If the user is not logged in , create the new session
                    await connection.query(
                        `INSERT INTO login_users (id_user, is_active) VALUES($1, $2)`,
                        [userid, true]
                    )
                }
                console.log("User logged in successfully");
                const {password_user: _, ...userWithoutPassword} = existingUser.rows[0];
                return userWithoutPassword;
                
            }
        }
        return {message: 'The email not found or the password is incorrect'};
    }

    // Logout of the user
    static async LogoutUser({user}){
        if(!user) return {message: 'The email is required'};
        const {email_user} = user;
        // Check if the email existing in the database
        const existingUser = await connection.query(
            `SELECT * FROM users WHERE email_user = $1`,
            [email_user]
        )
        if(existingUser.rowCount === 0) return {message: 'The email not found'};
        const userid = existingUser.rows[0].id_user;
        // Check if the user is logged in
        const loggedUser = await connection.query(
            `SELECT * FROM login_users WHERE id_user = $1`,
            [userid]
        )
        if(loggedUser.rowCount === 0) return {message: 'The user is not logged in'};
        // Update the session of the user
        const logout = await connection.query(
            `UPDATE login_users SET is_active = $1 WHERE id_user = $2`,
            [false, userid]
        )
        if(logout.rowCount === 0) return {message: 'Error logging out the user'};
        return {message: 'User logged out successfully'};
    }
}