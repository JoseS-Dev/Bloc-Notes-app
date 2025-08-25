import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { RoutesUser } from './Routes/UserRoute.mjs';
import { RoutesNote } from './Routes/NoteRoutes.mjs';

// Load environment variables
dotenv.config();

// Inicialize to express
const app = express();

app.use(json());
app.use(cors({
    origin: '*',
    Credentials: true
}))

// Routes
app.use('/api/users', RoutesUser);
app.use('/api/notes', RoutesNote);

// Listen the server
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});