import { ValidateDataNotes } from "../Validations/SchemaNote.mjs";
export class ControllerNote {
    constructor({ModelNotes}){
        this.ModelNotes = ModelNotes;
    }

    // Get All notes of a user
    getAllNotes = async (req, res) => {
        const {id_user} = req.params;
        try{
            const notes = await this.ModelNotes.getAllNotes({id_user});
            if(notes){
                return res.status(200).json({
                    message: 'Found Notes',
                    data: notes
                })
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // get a Notes by id
    getNoteById = async (req, res) => {
        const {id_notes} = req.params;
        try{
            const note = await this.ModelNotes.getNotesById({id_notes});
            if(note){
                return res.status(200).json({
                    message: 'Found Note',
                    data: note
                })
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Get a note by date and user id
    getNoteByDate = async (req, res) => {
        const {id_user, date_notes} = req.params;
        try{
            const note = await this.ModelNotes.getNoteByDate({id_user, date_notes});
            if(note){
                return res.status(200).json({
                    message: 'Found Note',
                    data: note
                })
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Get all favorite notes of a user
    getFavoritesNotes = async (req, res) => {
        const {id_user} = req.params;
        try{
            const notes = await this.ModelNotes.getFavoritesNotes({id_user});
            if(notes){
                return res.status(200).json({
                    message: 'Found Favorite Notes',
                    data: notes
                })
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Create a new note
    createdNote = async (req, res) => {
        const {id_user} = req.params;
        const result = ValidateDataNotes(req.body);
        try{
            if(!result.success){
                const errors = result.error.errors.map(err => err.message);
                return res.status(400).json({message: 'Validation Error', errors});
            }
            const response = await this.ModelNotes.createdNote({note: result.data, id_user});
            if(response){
                return res.status(201).json({
                    message: 'Note Created Successfully',
                    data: response
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Delete a note by id and user id
    deleteNote = async (req, res) => {
        const {id_notes} = req.params;
        try{
            const response = await this.ModelNotes.DeleteNotes({id_notes});
            if(response){
                return res.status(200).json({
                    message: response.message
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Update a note by id
    updateNote = async (req, res) => {
        const {id_notes} = req.params;
        const result = ValidateDataNotes(req.body);
        try{
            if(!result.success){
                const errors = result.error.errors.map(err => err.message);
                return res.status(400).json({message: 'Validation Error', errors});
            }
            const response = await this.ModelNotes.UpdateNotes({id_notes, note: result.data});
            if(response){
                return res.status(200).json({
                    message: 'Note Updated Successfully',
                    data: response
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Toggle favorite status of a note
    toggleFavorite = async (req, res) => {
        const {id_notes} = req.params;
        try{
            const response = await this.ModelNotes.toggleFavorite({id_notes});
            if(response){
                return res.status(200).json({
                    message: 'Note favorite status updated',
                    data: response
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    // Toggle unfavorite status of a note
    toggleUnfavorite = async (req, res) => {
        const {id_notes} = req.params;
        try{
            const response = await this.ModelNotes.toggleUnfavorite({id_notes});
            if(response){
                return res.status(200).json({
                    message: 'Note unfavorite status updated',
                    data: response
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}