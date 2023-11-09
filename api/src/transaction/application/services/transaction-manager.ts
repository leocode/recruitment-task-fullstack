import { AccountFacade } from '../../../account/public/account.facade';
import { TransactionExecutor } from './transaction-executor';
import { TransactionRequest } from '../interfaces/transaction.interface';
import { CharacterFacade } from '../../../character/public/characters.facade';

export interface ProcessTransactionRequestResult {
  success: boolean;
  message: string;
}

export class TransactionManager {
  constructor(
    private accountFacade: AccountFacade,
    private characterFacade: CharacterFacade,
    private transactionExecutor: TransactionExecutor
  ) {}

  public async processTransactionRequest(
    transaction: TransactionRequest
  ): Promise<ProcessTransactionRequestResult> {
    const buyerAccount = await this.accountFacade.findAccountByOwner(transaction.buyerId);

    if (!buyerAccount) {
      throw new Error(
        `Cannot execute transaction ${transaction.id}. Buyer's (${transaction.buyerId}) account not found.`
      );
    }

    const characterToBuy = this.characterFacade.findOne({
      id: transaction.characterId,
    });

    if (!characterToBuy) {
      throw new Error(
        `Cannot execute transaction ${transaction.id}. Character to buy (${transaction.characterId}) not found. `
      );
    }

    const isSuccess = await this.transactionExecutor.execute({
      id: transaction.id,
      buyerAccount,
      character: characterToBuy,
    });

    return {
      success: isSuccess,
      message: 'Transaction executed successfully',
    };
  }
}
