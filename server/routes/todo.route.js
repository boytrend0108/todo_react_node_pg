import express from 'express';
import * as todosControllers from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/', todosControllers.get);

router.get('/:id', todosControllers.getOne);

router.post('/', todosControllers.create);

router.delete('/:id', todosControllers.remove);

router.put('/:id', todosControllers.update);

export { router };
