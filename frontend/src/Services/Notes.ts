import type { NoteData } from "../Types/Note";
// Funcion que obtiene todas las notas de usuario
export async function getAllNotes(token: string){
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok) throw new Error('Failed to fetch notes');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

// Function que obtiene las notas favoritas del usuario
export async function getFavoritesNotes(token: string){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/favorites`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) throw new Error('Failed to fetch favorite notes');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

// Function para crear una nota
export async function createNote(token: string, data: NoteData){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) throw new Error('Failed to create note');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

// Function para actaulizar una nota
export async function updateNote(data: NoteData){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/update/${data.id_notes}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok) throw new Error('Failed to update note');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }

}

// Function para eliminar una nota
export async function deleteNote(id_notes: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/delete/${id_notes}`, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error('Failed to delete note');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

// Function para marcar o desamarcar una nota de favoritos
export async function toggleFavorite(id_notes: number, is_favorite: number){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/favorite`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_notes, is_favorite})
        });
        if(!response.ok) throw new Error('Failed to toggle favorite status');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}