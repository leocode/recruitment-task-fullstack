import { Account } from '@/account/public/interfaces/account.interface';
import { Character } from '../../../character/application/interface/character.interface';

export interface TransactionRequest {
  id: any;
  buyerId: string;
  characterId: number;
}

export interface Transaction {
  id: number;
  buyerAccount: Account;
  character: Character;
}
