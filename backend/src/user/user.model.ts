import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { Task } from '../task/task.model';

@Table({ tableName: 'user' })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  userId: CreationOptional<string>;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Task)
  tasks?: Task[];
}
