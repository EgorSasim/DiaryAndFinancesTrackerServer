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
import { List, Space, Task } from '@prisma/client';
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
    const createdTask = await this.taskService.createTask({
      list: { connect: { id: task.listId } },
      title: task.title,
      completed: task.completed.toString() === 'false' ? false : true,
      description: task.description,
      endTime: task.endTime,
      startTime: task.startTime,
    });
    return createdTask;
  }

  @Put('task')
  async updateTask(
    @Body() options: { task: Task; listId: List['id']; spaceId: Space['id'] },
  ): Promise<any> {
    const { task, listId, spaceId } = options;
    return this.taskService.updateTask({
      where: { id: task.id, listId: task.listId, list: { spaceId: spaceId } },
      data: task,
    });
  }

  @Delete('task')
  async deleteTask(
    @Body() data: { listId: number; taskId: number; spaceId: number },
  ): Promise<any> {
    const { listId, taskId, spaceId } = data;
    return this.taskService.deleteTask({
      list: { id: listId, spaceId },
      id: taskId,
    });
  }
}
