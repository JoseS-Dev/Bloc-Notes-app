import zod from 'zod';

// Define the schema for notes validation
export const SchemaNotes = zod.object({
    title_notes: zod.string({
        required_error: 'The title is required',
        invalid_type_error: 'The title must be a string'
    }).max(50),
    description_notes: zod.string({
        required_error: 'The description is required',
        invalid_type_error: 'The description must be a string'
    }),
    tags_notes: zod.string({
        required_error: 'The tags are required',
        invalid_type_error: 'The tags must be a string'
    }),
    slug_notes: zod.string({
        required_error: 'The slug is required',
        invalid_type_error: 'The slug must be a string'
    })
})

// Function to validate note data
export function ValidateDataNotes(data){
    return SchemaNotes.safeParse(data);
}