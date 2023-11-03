import { AccountLegalityVerifier } from "../application/services/legal-account.verifier";
import { InMemoryAccountRepository } from "../infrastructure/database/in-memory-account.repository";

import { Account } from "./interfaces/account.interface";

export class AccountFacade {
  constructor(
    private accountRepository: InMemoryAccountRepository,
    private accountLegalityVerifier: AccountLegalityVerifier
  ) {}

  public async findAccountByAddress(address: string): Promise<Account | null> {
    return await this.accountRepository.findByAddress(address);
  }

  public async updateAccount(account: Account): Promise<void> {
    return await this.accountRepository.save(account);
  }

  public async verifyAccountLegality(actionId: any, account: Account): Promise<void> {
    return await this.accountLegalityVerifier.verify(actionId, account);
  }
}