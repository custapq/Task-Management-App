import { Task } from './task.model';

export const taskProviders = [
  {
    provide: 'TaskRepository',
    useValue: Task,
  },
];
