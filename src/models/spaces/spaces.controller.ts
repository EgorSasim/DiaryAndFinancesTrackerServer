import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpacesService } from 'src/models/spaces/spaces.service';
import { Space } from 'src/models/spaces/spaces.typings';

@Controller('spaces')
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @Post()
  createSpace(@Body() body: Body): Observable<Space> {
    return this.spacesService.createSpace(body['name']);
  }

  @Get()
  getSpaces(): Space[] {
    return this.spacesService.getSpaces();
  }
}
