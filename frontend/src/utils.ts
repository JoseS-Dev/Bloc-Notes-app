import type {UserData} from './Types/User';
// Function para la validación de los datos del register
export function ValidateDataRegister(data: UserData){
    const {name_user, last_name, username, email_user, password_user} = data;

    // Validaciones
    if(!name_user || !last_name || !username || !email_user || !password_user){
        return {
            valid: false,
            message: 'Todos los campos son obligatorios'
        }
    }else if(password_user.length < 4){
        return {
            valid: false,
            message: 'La contraseña debe tener al menos 4 caracteres'
        }
    }else if(!email_user.includes('@') || !email_user.includes('.com')){
        return {
            valid: false,
            message: 'Email inválido'
        }
    }
    return {
        valid: true,
        message: 'Datos válidos'
    }
}