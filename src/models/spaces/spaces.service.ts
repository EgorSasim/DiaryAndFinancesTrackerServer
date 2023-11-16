import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Space } from 'src/models/spaces/spaces.typings';

@Injectable()
export class SpacesService {
  private spaces: Space[] = [
    { name: 'frist space', id: 1 },
    { name: 'second space', id: 2 },
    { name: 'third space', id: 3 },
    { name: 'fourth space', id: 4 },
    { name: 'fifth space', id: 5 },
    { name: 'sixth space', id: 6 },
    { name: 'seventh space', id: 7 },
    { name: 'eighth space', id: 8 },
    { name: 'ninth space', id: 9 },
    { name: 'tenth space', id: 10 },
    { name: 'eleventh space', id: 11 },
    { name: 'twelfth space', id: 12 },
    { name: 'thirteenth space', id: 13 },
    { name: 'fourteenth space', id: 14 },
    { name: 'fifteenth space', id: 15 },
  ];

  public createSpace(name: string): Observable<Space> {
    this.spaces.push({
      name,
      id: Math.max(...this.spaces.map((space) => space.id)),
    });
    return of(this.spaces.at(-1));
  }

  public getSpaces(): Space[] {
    return this.spaces;
  }
}
