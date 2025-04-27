import { Module } from '@nestjs/common';
import { taskProviders } from './task.providers';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  providers: [...taskProviders, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
