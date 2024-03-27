import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// let todos = [
//   {
//     id: '1',
//     title: 'JS',
//     todo: 'learn and forget',
//     completed: false,
//   },
// ];

const read = async () => {
  const filePath = path.resolve('db', 'todos.json');
  const todos = await fs.readFile(filePath, { encoding: 'utf8' });

  return JSON.parse(todos);
};

const write = async (todos) => {
  const filePath = path.resolve('db', 'todos.json');

  await fs.writeFile(filePath, JSON.stringify(todos, null, 2), {
    encoding: 'utf8',
  });
};

export async function getAll() {
  const todos = await read();

  return todos;
}

export async function getById(id) {
  const todos = await read();

  return todos.find((todo) => todo.id === id) || null;
}

export async function create(todo) {
  const newTodo = {
    id: uuidv4(),
    title: todo.split(' ').slice(0, 1).join(' ').toUpperCase(),
    todo,
    completed: false,
  };

  const todos = await read();

  await write([newTodo, ...todos]);

  return newTodo;
}

export async function update({ id, todo, completed }) {
  const todos = await read();
  const existTodo = todos.find((el) => el.id === id);

  if (!existTodo) {
    return false;
  }

  const updatedTodo = Object.assign(existTodo, { todo, completed });

  await write(todos);

  return updatedTodo;
}

export async function remove(id) {
  let todos = await read();

  todos = todos.filter((el) => el.id !== id);

  await write(todos);
}
