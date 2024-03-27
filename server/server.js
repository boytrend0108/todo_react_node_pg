/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { router as todoRouter } from './routes/todo.route.js';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors({ origin: 'http://localhost:5173' })); // add cors middleware

server.use('/todos', express.json(), todoRouter);

server.listen(PORT, () => {
  console.log(`Server run on http:localhost:${PORT}`);
});
