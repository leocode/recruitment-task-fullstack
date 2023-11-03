import { Character, Characters } from "../interface/character.interface";
import { CharactersRepository, GetCharacterParams } from "../interface/characters.repository";

export class CharactersService {
    constructor(private readonly charactersRepository: CharactersRepository) {}

    public findOne(params: GetCharacterParams): Character | null {
        return this.charactersRepository.findOne(params);
    }

    public findMany(): Characters {
        return this.charactersRepository.findMany();
    }
}