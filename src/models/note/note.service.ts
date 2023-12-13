import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  public async note(
    noteWhereUniqueInput: Prisma.NoteWhereUniqueInput,
  ): Promise<Note | null> {
    return this.prismaService.note.findUnique({
      where: noteWhereUniqueInput,
    });
  }

  public async notes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteWhereUniqueInput;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput;
  }): Promise<Note[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.note.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prismaService.note.create({
      data,
    });
  }

  public async updateNote(params: {
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteUpdateInput;
  }): Promise<Note> {
    const { data, where } = params;
    return this.prismaService.note.update({
      data,
      where,
    });
  }
  public async deleteNote(where: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return this.prismaService.note.delete({
      where,
    });
  }
}
