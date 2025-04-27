import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: typeof Task,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: string) {
    // console.log('create task title:', createTaskDto.title);
    const task = await this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      userId,
    });
    console.log('task created:', task);
    return task;
  }

  async getAllTasks(userId: string) {
    return this.taskRepository.findAll({ where: { userId } });
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { taskId, userId },
    });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ) {
    const task = await this.getTaskById(taskId, userId);
    return task.update(updateTaskDto);
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await this.getTaskById(taskId, userId);
    await task.destroy();
    return { message: 'Task deleted successfully' };
  }
}
