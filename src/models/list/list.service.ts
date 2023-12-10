import { Injectable } from '@nestjs/common';
import { List, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private prismaService: PrismaService) {}

  public async list(
    listWhereUniqueInput: Prisma.ListWhereUniqueInput,
  ): Promise<List | null> {
    return this.prismaService.list.findUnique({
      where: listWhereUniqueInput,
    });
  }

  public async lists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListWhereUniqueInput;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput;
  }): Promise<List[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.list.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async createList(data: Prisma.ListCreateInput): Promise<List> {
    return this.prismaService.list.create({
      data,
    });
  }

  public async updateList(params: {
    where: Prisma.ListWhereUniqueInput;
    data: Prisma.ListUpdateInput;
  }): Promise<List> {
    const { data, where } = params;
    return this.prismaService.list.update({
      data,
      where,
    });
  }

  public async deleteList(where: Prisma.ListWhereUniqueInput): Promise<List> {
    return this.prismaService.list.delete({
      where,
    });
  }
}
