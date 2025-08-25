import {Router} from 'express';
import { ControllerNote } from '../Controller/Note.mjs';
import { ModelNotes } from '../Models/Notes.mjs';

export const RoutesNote = Router();
const controllernote = new ControllerNote({ModelNotes: ModelNotes});

// ROUTES
// Get All notes of a user
RoutesNote.get('/all/:id_user', controllernote.getAllNotes);
// Get a Notes by id
RoutesNote.get('/:id_notes', controllernote.getNoteById);
// Get a note by date and user id
RoutesNote.get('/user/:id_user/date/:date_notes', controllernote.getNoteByDate);
// Get all favorite notes of a user
RoutesNote.get('/favorites/:id_user', controllernote.getFavoritesNotes);

// Create a new note
RoutesNote.post('/create/:id_user', controllernote.createdNote);
// Delete a note by id
RoutesNote.delete('/delete/:id_notes', controllernote.deleteNote);
// Update a note by id
RoutesNote.patch('/update/:id_notes', controllernote.updateNote);
// Mark a note as favorite by id
RoutesNote.patch('/favorite/:id_notes', controllernote.toggleFavorite);
// Unmark a note as favorite by id
RoutesNote.patch('/unfavorite/:id_notes', controllernote.toggleUnfavorite);
