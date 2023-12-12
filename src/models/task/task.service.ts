import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  public async task(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: taskWhereUniqueInput,
    });
  }

  public async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prismaService.task.create({
      data,
    });
  }

  public async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, where } = params;
    return this.prismaService.task.update({
      data,
      where,
    });
  }
  public async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prismaService.task.delete({
      where,
    });
  }
}
