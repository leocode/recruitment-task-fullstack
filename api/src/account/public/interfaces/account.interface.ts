import { Character } from '../../../character/application/interface/character.interface';

export interface AccountAttrs {
  id: number;
  address: string;
  balance: number;
  ownerId: string;
  collection: Character[];
}

export class Account {
  private attrs: AccountAttrs;

  public get balance() {
    return this.attrs.balance;
  }

  public updateBalance(newBalance: number) {
    this.attrs.balance = newBalance;
  }

  public get collection() {
    return this.attrs.collection;
  }

  public updateCollection(characterToAdd: Character) {
    this.attrs.collection.push(characterToAdd);
  }

  public toAttrs(): AccountAttrs {
    return this.attrs;
  }

  public static fromAttrs(attrs: AccountAttrs) {
    return new Account(attrs);
  }

  private constructor(attrs: AccountAttrs) {
    this.attrs = {
      address: attrs.address,
      balance: attrs.balance,
      id: attrs.id,
      ownerId: attrs.ownerId,
      collection: attrs.collection,
    };
  }
}
