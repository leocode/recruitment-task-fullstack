
import { AccountRepository } from "../../application/interfaces/account.repository";
import { Account, AccountAttrs } from "../../public/interfaces/account.interface";
import { ACCOUNTS } from "./data/accounts";


// TODO: reduce to one account only?
export class InMemoryAccountRepository extends AccountRepository {
  private accounts: AccountAttrs[] = JSON.parse(JSON.stringify(ACCOUNTS));

  public async findByAddress(address: string): Promise<Account | null> {
    const account = this.accounts.find(a => a.address === address);

    return account ? this.mapToEntity(account) : null;
  }

  public async save(account: Account): Promise<void> {
    const attrs = account.toAttrs();
    const accountIndex = this.accounts.findIndex(a => a.id === attrs.id);

    if (accountIndex < 0) {
      throw new Error(`Unknown account id: ${attrs.id}`);
    }

    this.accounts.splice(accountIndex, 1, attrs);
  }

  private mapToEntity(account: AccountAttrs): Account {
    return Account.fromAttrs(account);
  }

  public async reset(): Promise<void> {
    this.accounts = JSON.parse(JSON.stringify(ACCOUNTS));      
  }
}