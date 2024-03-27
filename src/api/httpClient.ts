/* eslint-disable no-console */
import axios from 'axios';
import { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:3000';

export const client = {
  getTodos(): Promise<Todo[]> {
    return axios.get(BASE_URL + '/todos').then((res) => res.data);
  },

  addTodo(todo: string): Promise<Todo> {
    const newTodo = { todo, completed: false };

    return axios.post(BASE_URL + '/todos', newTodo).then((res) => res.data);
  },

  deleteTodo(id: string): Promise<string> {
    return axios.delete(BASE_URL + '/todos/' + id);
  },

  updateTodo(id: string, todo: string, completed: boolean): Promise<Todo> {
    return axios
      .put(BASE_URL + '/todos/' + id, { todo, completed })
      .then((res) => res.data);
  },
};
