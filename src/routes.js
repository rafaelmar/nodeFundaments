import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        'tasks',
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description, completed_at, created_at, updated_at } =
        req.body;
      if (completed_at !== null) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'Completed at is required' }));
      }
      const tasks = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at,
        updated_at,
      };

      database.insert('tasks', tasks);
      return res.writeHead(201).end('Fue creada la tarea');
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/export'),
    handler: (req, res) => {
      const { file } = req.body;

      if (!file || file.path) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'File is required' }));
      }

      database.insert('tasks', tasks);
      return res.writeHead(201).end('Creacion');
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const tasks = database.select('tasks');
      const task = tasks.find(task => task.id === id);

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: 'Task not found' }));
      }

      database.put('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        completed_at: task.completed_at,
        created_at: task.created_at,
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);
      return res.writeHead(204).end();
    },
  },
];
