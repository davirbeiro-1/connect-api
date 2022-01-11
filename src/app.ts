import express from 'express';
import { router } from './routes';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import('./helpers/authStrategy.js');

const app = express();
app.use(cors())
app.use(express.urlencoded());

app.use(express.json());
app.use(router)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})