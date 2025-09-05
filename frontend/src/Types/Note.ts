export interface NoteData{
    id_notes: number;
    id_user: number;
    title_notes: string;
    description_notes: string;
    tags_notes: string;
    date_notes: Date;
    is_favorite: boolean;
}

export interface CreateNoteData{
    title_notes: string;
    description_notes: string;
    tags_notes: string;
    date_notes: Date;
}

export interface UpdateNoteData{
    title_notes?: string;
    description_notes?: string;
    tags_notes?: string;
    date_notes?: Date;
}