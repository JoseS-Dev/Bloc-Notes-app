import { connection } from "../DbConn.mjs";

export class ModelNotes {
    // Get all notes of a user
    static async getAllNotes({id_user}){
        if(!id_user) return {message: 'User ID is required'};
        const result = await connection.query(`SELECT * FROM notes WHERE id_user = $1`, [id_user]);
        if(result.rowCount <= 0) return {message: 'No notes found'};
        console.log("Found user notes");
        return result.rows;
    }

    // Get a Notes by id
    static async getNotesById({id_notes}){
        if(!id_notes) return {message: 'Note ID is required'};
        const result = await connection.query(
            `SELECT * FROM notes WHERE id_notes = $1`, 
            [id_notes]
        );
        if(result.rowCount > 0){
            console.log("Found note by ID");
            return result.rows[0];
        }
        return {message: 'No note found with this ID'};
    }

    // Get a Notes for the created date and user id
    static async getNoteByDate({id_user, date_notes}){
        if(!id_user || !date_notes) return {message: 'User ID and Created At are required'};
        const result = await connection.query(
            `SELECT * FROM notes WHERE id_user = $1 AND created_at = $2`, 
            [id_user, date_notes]
        );
        if(result.rowCount > 0){
            console.log("Found note by date");
            return result.rows[0];
        }
        return {message: 'No note found for this date'};
    }

    // Get a notes if is favorite
    static async getFavoritesNotes({id_user}){
        if(!id_user) return {message: `User ID is required`};
        const result = await connection.query(
            `SELECT * FROM notes WHERE id_user = $1 AND is_favorite = true`,
            [id_user] 
        )
        if(result.rowCount <= 0) return {message: 'No favorite notes found'}
        console.log("Found favorite notes");
        return result.rows;
    }

    // Create a new note
    static async createdNote({note, id_user}){
        if(!note || !id_user) return {message: 'Note and User ID are required'};
        const {title_notes, description_notes, tags_notes, date_notes} = note;
        // Assign the name for slug but is name-
        const slug = title_notes.toLowerCase().replace(/ /g, '-');
        // Check if the note already exists
        const checkNote = await connection.query(
            `SELECT * FROM notes WHERE title_notes = $1 AND id_user = $2`,
            [title_notes, id_user]
        );
        if(checkNote.rowCount > 0) return {message: 'Note already exists'};
        // Insert the note
        const result = await connection.query(
            `INSERT INTO notes (title_notes, description_notes, tags_notes, slug_notes, date_notes ,id_user) 
            VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
            [title_notes, description_notes, tags_notes, slug, date_notes ,id_user]
        );
        if(result.rowCount <= 0) return {message: 'Error creating note'};
        console.log("Note created");
        return result.rows[0];
    }

    // Delete a note
    static async DeleteNotes({id_notes}){
        if(!id_notes) return {message: 'Note ID and User ID are required'};
        // check if the note exists
        const checkNote = await connection.query(
            `SELECT * FROM notes WHERE id_notes = $1`,
            [id_notes]
        )
        if(checkNote.rowCount <= 0) return {message: 'Note does not exist'};
        console.log("Process to delete note");
        const result = await connection.query(
            `DELETE FROM notes WHERE id_notes = $1`,
            [id_notes]
        );
        if(result.rowCount <= 0) return {message: 'Error deleting note'};
        console.log("Note deleted");
        return {message: 'Note deleted successfully'}
    }

    // Update a note
    static async UpdateNotes({id_notes, note}){
        if(!id_notes || !note) return {message: 'Note ID and Note are required'};
        const allowedField = ['title_notes', 'description_notes', 'tags_notes', 'slug_notes', 'date_notes'];
        // Filter the data to only include allowed fields
        const fieldsUpdate = {};
        for(const field of allowedField){
            if(note[field] !== undefined){
                fieldsUpdate[field] = note[field];
            }
        }
        // Check if the note exists
        const checkNote = await connection.query(
            `SELECT * FROM notes WHERE id_notes = $1`,
            [id_notes]
        )
        if(checkNote.rowCount > 0){
            const setClause = [];
            const values = [];

            // Build the SET clause dynamically
            Object.keys(fieldsUpdate).forEach((field, index) => {
                setClause.push(`${field} = $${index + 1}`);
                values.push(fieldsUpdate[field]);
            })

            // Add the id_notes to the values array for the WHERE clause
            values.push(id_notes);
            const result = await connection.query(
                `UPDATE notes SET ${setClause.join(', ')} WHERE id_notes = $${values.length} RETURNING *`,
                values
            );
            if(result.rowCount <= 0) return {message: 'Error updating note'};
            console.log("Note updated");
            return result.rows[0];
        }
    }

    // Mark a note as favorite
    static async toggleFavorite({id_notes, is_favorite}){
        if(!id_notes) return {message: 'Note ID is required'};
        if(typeof is_favorite !== 'boolean') return {message: 'is_favorite must be a boolean'};
        
        // Check if the note exists
        const checkNote = await connection.query(
            `SELECT * FROM notes WHERE id_notes = $1`,
            [id_notes]
        )
        if(checkNote.rowCount > 0){
            console.log("Process to update favorite status");
            const result = await connection.query(
                `UPDATE notes SET is_favorite = $1 WHERE id_notes = $2`,
                [is_favorite, id_notes]
            )
            if(result.rowCount <= 0) return {message: 'Error updating favorite status'};
            return checkNote.rows[0];
        }
    }

}