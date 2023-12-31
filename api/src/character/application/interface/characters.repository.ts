import { Character } from './character.interface';

export interface GetCharacterParams {
  id: number;
}

export abstract class CharactersRepository {
  abstract findOne(params: GetCharacterParams): Character | null;

  abstract findMany(): Character[];
}
