import { Injectable } from '@nestjs/common';
import { Prisma, Space } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpaceService {
  constructor(private prismaService: PrismaService) {}

  public async space(
    spaceWhereUniqueInput: Prisma.SpaceWhereUniqueInput,
  ): Promise<Space | null> {
    return this.prismaService.space.findUnique({
      where: spaceWhereUniqueInput,
    });
  }

  public async spaces(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SpaceWhereUniqueInput;
    where?: Prisma.SpaceWhereInput;
    orderBy?: Prisma.SpaceOrderByWithRelationInput;
  }): Promise<Space[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.space.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async createSpace(data: Prisma.SpaceCreateInput): Promise<Space> {
    return this.prismaService.space.create({
      data,
    });
  }

  public async updateSpace(params: {
    where: Prisma.SpaceWhereUniqueInput;
    data: Prisma.SpaceUpdateInput;
  }): Promise<Space> {
    const { data, where } = params;
    return this.prismaService.space.update({
      data,
      where,
    });
  }

  public async deleteSpace(
    where: Prisma.SpaceWhereUniqueInput,
  ): Promise<Space> {
    return this.prismaService.space.delete({
      where,
    });
  }
}
