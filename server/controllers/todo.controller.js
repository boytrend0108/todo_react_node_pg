import * as todosServises from '../servises/todo.servise.js';

export async function get(req, res) {
  res.send(await todosServises.getAll());
}

export async function getOne(req, res) {
  const { id } = req.params;
  const todo = await todosServises.getById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(todo);
}

export async function create(req, res) {
  const { todo } = req.body;
  const newTodo = await todosServises.create(todo);

  if (!newTodo.todo) {
    res.sendStatus(422);
  }

  res.statusCode = 201;
  res.send(newTodo);
}

export async function remove(req, res) {
  const { id } = req.params;

  if (!todosServises.getById(id)) {
    res.statusCode(404);
    res.send('This todo not found');
  }

  await todosServises.remove(id);
  res.sendStatus(204);
}

export async function update(req, res) {
  const { id } = req.params;
  const { todo, completed } = req.body;
  const updatedTodo = await todosServises.update({ id, todo, completed });

  if (!updatedTodo) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedTodo);
}
