import { TransactionRequest } from '../interfaces/transaction.interface';
import { ProcessTransactionRequestResult, TransactionManager } from './transaction-manager';

export class TransactionFacade {
  constructor(private manager: TransactionManager) {}

  public async processTransactionRequest(
    transaction: TransactionRequest
  ): Promise<ProcessTransactionRequestResult> {
    return await this.manager.processTransactionRequest(transaction);
  }
}
