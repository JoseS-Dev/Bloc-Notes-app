import type { UserData, loginData } from "../Types/User";
// Función para registrar un usuario
export async function registerUser(data: UserData){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) throw new Error('Error en la solicitud');
        const result = await response.json();
        return result;
    } 
    catch (error) {
        console.error(error);
        throw error;
    }
}

// Funcion para el login del usuario
export async function LoginUser(data: loginData){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) throw new Error('Error en la solicitud');
        const result = await response.json();
        return result;
    } 
    catch (error) {
        console.error(error);
        throw error;
    }
}

// Función para cerrar sesión
export async function LogoutUser(email_user: string){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/Logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_user })
        })
        if(!response.ok) throw new Error('Error en la solicitud');
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

// function que verifica que el usuario esta autenticado
export async function VerifyToken(token: string){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/Verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) throw new Error('Error en la solicitud');
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error);
    }
}