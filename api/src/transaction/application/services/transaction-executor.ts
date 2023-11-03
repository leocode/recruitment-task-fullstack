import { AccountFacade } from "@/account/public/account.facade";
import { Transaction } from "../interfaces/transaction.interface";

export class TransactionExecutor {
  constructor(
    private accountFacade: AccountFacade,
  ) {}

  public async execute(transaction: Transaction): Promise<boolean> {
    const buyerAccount = transaction.buyerAccount;

    buyerAccount.updateBalance(buyerAccount.balance - transaction.characterCost);

    await this.accountFacade.updateAccount(buyerAccount);

    return true;
  }
}