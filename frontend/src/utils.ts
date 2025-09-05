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

// Function para separar los tags de las notas
export function SeparateTags(tags: string){
    if(!tags) return [];
    return tags.split(',').map(tag => tag.trim());
}

// constantes para los colores de las notas favoritas
export const favoritesNotes = `w-11/12 h-14 border-2 border-black rounded-2xl  text-lg
                    bg-blue-500 text-whitehover:bg-blue-200 hover:text-black hover:scale-95 transition-transform duration-200
                    flex items-center justify-center cursor-pointer gap-3`;

export const BaseNotes = `w-11/12 h-14 border-2 border-black rounded-2xl text-black text-lg
                    hover:bg-blue-600 hover:text-white hover:scale-95 transition-transform duration-200
                    flex items-center justify-center cursor-pointer gap-3`
