import { Sequelize } from 'sequelize-typescript';
import { Task } from '../task/task.model';
import { User } from '../user/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      if (!process.env.CONNECTION_STRING) {
        throw new Error(
          'CONNECTION_STRING is not defined in environment variables.',
        );
      }
      const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
        dialect: 'postgres',
        models: [Task, User],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
