import { Module } from '@nestjs/common';
import { TaskController } from 'src/models/task/task.controller';
import { TaskService } from 'src/models/task/task.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
