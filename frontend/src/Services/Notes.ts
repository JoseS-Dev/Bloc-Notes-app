// Funcion que obtiene todas las notas de usuario
export async function getAllNotes(userId: string){
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/all/${userId}`);
        if(!response.ok) throw new Error('Failed to fetch notes');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}