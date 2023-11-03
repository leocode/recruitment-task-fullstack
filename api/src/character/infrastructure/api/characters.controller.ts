import { Application, Request, Response } from "express";
import { CharactersService } from "../../application/service/characters.service";

export class CharactersController {
    constructor(private readonly charactersService: CharactersService, app: Application) {
        app.get('/character/:id', this.getCharacter.bind(this));
        app.get('/character', this.getMany.bind(this));
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