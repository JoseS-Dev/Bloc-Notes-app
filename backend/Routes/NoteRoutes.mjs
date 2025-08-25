import {Router} from 'express';
import { ControllerNote } from '../Controller/Note.mjs';
import { ModelNotes } from '../Models/Notes.mjs';

export const RoutesNote = Router();
const controllernote = new ControllerNote({ModelNotes: ModelNotes});
