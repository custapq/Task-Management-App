import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { User } from '../user/user.model';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Table({ tableName: 'task' })
export class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  taskId: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TaskStatus),
    defaultValue: TaskStatus.PENDING,
  })
  taskStatus: CreationOptional<TaskStatus>;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;
}
