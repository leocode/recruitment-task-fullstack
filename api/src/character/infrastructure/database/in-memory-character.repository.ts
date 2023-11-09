import { Character } from '../../application/interface/character.interface';
import {
  CharactersRepository,
  GetCharacterParams,
} from '../../application/interface/characters.repository';
import { CHARACTERS } from './data/characters';

export class InMemoryCharacterRepository implements CharactersRepository {
  private readonly records: Character[] = CHARACTERS;

  findOne(params: GetCharacterParams): Character | null {
    return this.records.find((character: Character) => character.id === params.id) ?? null;
  }
  findMany(): Character[] {
    return this.records;
  }
}
