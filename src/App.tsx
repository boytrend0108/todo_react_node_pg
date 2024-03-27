/* eslint-disable no-shadow */
/* eslint-disable no-console */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import './App.css';
import { Todo } from './types/todo';
import { client } from './api/httpClient';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todo, setTodo] = useState('');
  const [edit, setEdit] = useState('');
  const [editedTodo, setEditedTodo] = useState('');

  function handleTodoInput(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const normalizedTodo = todo.trim();

    if (!normalizedTodo) {
      setError('Todo is empty');

      setTimeout(() => {
        setError('');
      }, 1000);

      return;
    }
    setLoading(true);

    client
      .addTodo(todo)
      .then((newTodo) => setTodos([newTodo, ...todos]))
      .catch(() => setError("Sorry, i can't add a new todo"))
      .finally(() => {
        setLoading(false);
        setTodo('');
      });
  }

  function getAllTodos() {
    setLoading(true);

    client
      .getTodos()
      .then(setTodos)
      .catch(() => setError("Error: can't get todos"))
      .finally(() => setLoading(false));
  }

  function handleDelete(id: string) {
    client
      .deleteTodo(id)
      .catch((err) => console.log(err))
      .finally(() => getAllTodos());
  }

  function handleEdit(id: string, todo: string, completed: boolean) {
    client
      .updateTodo(id, todo, completed)
      .catch((err) => console.log(err))
      .finally(() => {
        getAllTodos();
        setEdit('');
      });
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <section className="section">
      <h1 className="title">Todo with REST API</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Label</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              name="todo"
              value={todo}
              onChange={handleTodoInput}
            />
          </div>
          <p className="help">This is a help text</p>
        </div>

        <div className="control">
          <button className="button is-primary">Add todo</button>
        </div>
      </form>

      <section className="section">
        {loading && <h4 className="title is-4">Loading...</h4>}

        {error && !loading && (
          <div className="notification is-danger">{error}</div>
        )}

        {!loading && !error && (
          <>
            {todos.map((todoItem) => (
              <article className="message" key={todoItem.id}>
                <div className="message-header">
                  <p>{todoItem.title}</p>
                  <button
                    className="delete"
                    aria-label="delete"
                    onClick={() => handleDelete(todoItem.id)}
                  ></button>
                </div>

                {edit === todoItem.id ? (
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    onBlur={() =>
                      handleEdit(todoItem.id, editedTodo, todoItem.completed)
                    }
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleEdit(todoItem.id, editedTodo, todoItem.completed);
                      }
                    }}
                    className="message-body"
                    style={{ width: '100%', color: 'white' }}
                  />
                ) : (
                  <div
                    className={cn('message-body', {
                      'message-body--completed': todoItem.completed,
                    })}
                    onDoubleClick={() => {
                      setEdit(todoItem.id);
                      setEditedTodo(todoItem.todo);
                    }}
                  >
                    <div
                      className={
                        todoItem.completed ? 'completed--active' : 'completed'
                      }
                      onClick={() =>
                        handleEdit(
                          todoItem.id,
                          todoItem.todo,
                          !todoItem.completed,
                        )
                      }
                    />
                    {todoItem.todo}
                  </div>
                )}
              </article>
            ))}
          </>
        )}
      </section>
    </section>
  );
}

export default App;
