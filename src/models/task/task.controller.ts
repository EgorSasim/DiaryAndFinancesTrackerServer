import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
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
  async getTask(
    @Query() params: { spaceId: number; listId: number; taskId: number },
  ): Promise<Task> {
    const { spaceId, listId, taskId } = params;
    const selectedTask = await this.taskService.task({
      id: +taskId,
      listId: +listId,
      list: { spaceId: +spaceId },
    });
    return selectedTask;
  }

  @Post('task')
  async createTask(
    @Req() req: Request,
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
      user: { connect: { id: req['user']['userId'] } },
    });
    return createdTask;
  }

  @Put('task')
  async updateTask(
    @Body() options: { task: Task; listId: List['id']; spaceId: Space['id'] },
  ): Promise<any> {
    const { task, listId, spaceId } = options;
    return this.taskService.updateTask({
      where: {
        id: +task.id,
        listId: +task.listId,
        list: { spaceId: +spaceId },
      },
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
