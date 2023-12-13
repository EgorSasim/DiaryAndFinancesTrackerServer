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
import { Space, Note } from '@prisma/client';
import { NoteService } from 'src/models/note/note.service';

@Controller()
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('notes')
  async getNotes(@Query() params: { spaceId: string }): Promise<Note[]> {
    const { spaceId } = params;
    return this.noteService.notes({
      where: { spaceId: +spaceId },
    });
  }

  @Get('note/:id')
  async getNote(
    @Param('id') id: string,
    @Query() params: { spaceId: string },
  ): Promise<Note> {
    const { spaceId } = params;
    const selectedNote = await this.noteService.note({
      id: +id,
      spaceId: +spaceId,
    });
    return selectedNote;
  }

  @Post('note')
  async createNote(
    @Body()
    noteData: {
      note: Note;
    },
  ): Promise<Note> {
    const { note } = noteData;
    const createdNote = await this.noteService.createNote({
      title: note.title,
      text: note.text,
      space: { connect: { id: note.spaceId } },
    });
    return createdNote;
  }

  @Put('note')
  async updateNote(
    @Body()
    note: {
      id: string;
      spaceId: string;
      text: string;
      title: string;
    },
  ): Promise<any> {
    const { id, spaceId } = note;
    return this.noteService.updateNote({
      where: {
        id: +id,
        spaceId: +spaceId,
      },
      data: note,
    });
  }

  @Delete('note')
  async deleteNote(@Body() data: { note: Note }): Promise<any> {
    const { note } = data;
    const { id, spaceId } = note;

    return this.noteService.deleteNote({
      space: { id: spaceId },
      id,
    });
  }
}
