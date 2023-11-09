import { Account } from '../../public/interfaces/account.interface';

export abstract class AccountRepository {
  abstract findByAddress(address: string): Promise<Account | null>;
  abstract findByOwnerId(ownerId: string): Promise<Account | null>;
  abstract save(account: Account): Promise<void>;
  abstract reset(): Promise<void>;
}
