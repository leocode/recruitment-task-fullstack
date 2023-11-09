import { Application, Request, Response } from 'express';
import { CharacterService } from '../../application/service/character.service';

export class CharacterController {
  constructor(private readonly charactersService: CharacterService, app: Application) {
    app.get('/character/:id', this.getCharacter.bind(this));
    app.get('/characters', this.getMany.bind(this));
  }

  getCharacter(req: Request, res: Response) {
    const characterId = Number(req.params.id);
    const character = this.charactersService.findOne({ id: characterId });

    res.json(character);
  }

  getMany(_req: Request, res: Response) {
    const characters = this.charactersService.findMany();

    res.json(characters);
  }
}
