import { TransactionRequest } from '../interfaces/transaction.interface';
import { TransactionManager } from './transaction-manager';

export class TransactionFacade {
  constructor(private manager: TransactionManager) {}

  public async processTransactionRequest(transaction: TransactionRequest): Promise<void> {
    await this.manager.processTransactionRequest(transaction);
  }
}
