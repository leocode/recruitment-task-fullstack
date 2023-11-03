import { Character, Characters } from "../../application/interface/character.interface";
import { CharactersRepository, GetCharacterParams } from "../../application/interface/characters.repository";
import { CHARACTERS } from "./data/characters";

export class InMemoryCharactersRepository implements CharactersRepository {
    private readonly records: Characters = CHARACTERS;
    
    findOne(params: GetCharacterParams): Character | null {
        return this.records.results.find((character: Character) => character.id === params.id) ?? null;
    }
    findMany(): Characters {
      return this.records;
    }
}