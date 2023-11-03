import { AccountFacade } from '../../../account/public/account.facade';
import { TransactionExecutor } from './transaction-executor';
import { TransactionRequest } from '../interfaces/transaction.interface';
import { CharactersFacade } from '../../../character/public/characters.facade';

export interface ProcessTransactionRequestResult {
  success: boolean;
  message: string;
}

export class TransactionManager {
  constructor(
    private accountFacade: AccountFacade,
    private characterFacade: CharactersFacade,
    private transactionExecutor: TransactionExecutor,
  ) {}

  public async processTransactionRequest(transaction: TransactionRequest): Promise<ProcessTransactionRequestResult> {
    const buyerAccount = await this.accountFacade.findAccountByAddress(transaction.buyerAccountAddress);

    if (!buyerAccount) {
      throw new Error(`Cannot execute transaction ${transaction.id}. Buyer account (${transaction.buyerAccountAddress}) not found.`);
    }

    const characterToBuy = this.characterFacade.findOne({
      id: transaction.characterId,
    });

    if(!characterToBuy) {
      throw new Error(`Cannot execute transaction ${transaction.id}. Character to buy (${transaction.characterId}) not found. `)
    }

     const isSuccess = await this.transactionExecutor.execute({
        id: transaction.id,  
        buyerAccount,
        characterCost: characterToBuy.cost,
      });

      return {
        success: isSuccess,
        message: 'Transaction executed successfully'
      }
  }
}