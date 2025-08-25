import zod from 'zod';

// Define the schema of the validations for the data user
export const SchemaUser = zod.object({
    name_user: zod.string({
        required_error: 'The name is required',
        invalid_type_error: 'The name must be a string'
    }).max(30),
    last_name: zod.string({
        required_error: 'The last name is required',
        invalid_type_error: 'The last name must be a string'
    }).max(30),
    username: zod.string({
        required_error: 'The username is required',
        invalid_type_error: 'The username must be a string'
    }).min(5).max(15),
    email_user: zod.string({
        required_error: 'The email is required',
        invalid_type_error: 'The email must be a string'
    }),
    password_user: zod.string({
        required_error: 'The password is required',
        invalid_type_error: 'The password must be a string'
    }).max(12)
});

// Function to the validate data user
export function ValidateDataUser(data){
    return SchemaUser.safeParse(data);
}