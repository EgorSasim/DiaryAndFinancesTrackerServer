import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { TaskService } from 'src/models/task/task.service';

@Controller()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('tasks')
  async getLists(
    @Query() params: { id: string; title: string; spaceId: string },
  ): Promise<Task[]> {
    const { id: listId, title, spaceId } = params;
    return this.taskService.tasks({
      where: { list: { id: +listId, title, spaceId: +spaceId } },
    });
  }

  @Get('task/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.task({ id: Number(id) });
  }

  @Post('task')
  async createTask(
    @Body()
    taskData: {
      task: Task;
    },
  ): Promise<Task> {
    const { task } = taskData;
    return this.taskService.createTask({
      list: { connect: { id: task.listId } },
      title: task.title,
      completed: task.completed.toString() === 'false' ? false : true,
      description: task.description,
      endTime: task.endTime,
      startTime: task.startTime,
    });
  }

  @Put('task')
  async updateTask(@Body() task: Task): Promise<any> {
    return this.taskService.updateTask({
      where: { id: task.id, listId: task.listId },
      data: task,
    });
  }

  @Delete('task')
  async deleteTask(
    @Body() data: { listId: number; taskId: number },
  ): Promise<any> {
    const { listId, taskId } = data;
    return this.taskService.deleteTask({
      list: { id: listId },
      id: taskId,
    });
  }
}
