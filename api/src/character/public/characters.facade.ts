import { Character } from '../application/interface/character.interface';
import { GetCharacterParams } from '../application/interface/characters.repository';
import { CharacterService } from '../application/service/character.service';

export class CharacterFacade {
  constructor(private readonly charactersService: CharacterService) {}

  public findOne(params: GetCharacterParams): Character | null {
    return this.charactersService.findOne(params);
  }

  public findMany(): Character[] {
    return this.charactersService.findMany();
  }
}
