import { Character, Characters } from "../application/interface/character.interface";
import { GetCharacterParams } from "../application/interface/characters.repository";
import { CharactersService } from "../application/service/characters.service";

export class CharactersFacade {
    constructor(private readonly charactersService: CharactersService) {}

    public findOne(params: GetCharacterParams): Character | null {
        return this.charactersService.findOne(params);
    }

    public findMany(): Characters {
        return this.charactersService.findMany();
    }
}