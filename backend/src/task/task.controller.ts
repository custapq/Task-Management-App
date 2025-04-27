import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TaskService } from './task.service';
import { UserRequest } from 'src/auth/interfaces/user-request.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: UserRequest,
  ) {
    console.log('createTaskDto', createTaskDto);
    return this.taskService.createTask(createTaskDto, req.user.userId);
  }

  @Get('')
  async getAllTasks(@Request() req: UserRequest) {
    return this.taskService.getAllTasks(req.user.userId);
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string, @Request() req: UserRequest) {
    return this.taskService.getTaskById(taskId, req.user.userId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: UserRequest,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto, req.user.userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string, @Request() req: UserRequest) {
    return this.taskService.deleteTask(taskId, req.user.userId);
  }
}
