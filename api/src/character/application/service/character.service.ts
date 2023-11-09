import { Character } from '../interface/character.interface';
import { CharactersRepository, GetCharacterParams } from '../interface/characters.repository';

export class CharacterService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  public findOne(params: GetCharacterParams): Character | null {
    return this.charactersRepository.findOne(params);
  }

  public findMany(): Character[] {
    return this.charactersRepository.findMany();
  }
}
