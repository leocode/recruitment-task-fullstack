import { Application, Request, Response } from 'express';
import { TransactionManager } from '../../application/services/transaction-manager';
import { TransactionRequest } from '../../application/interfaces/transaction.interface';
import { v4 } from 'uuid';

type TransactionRequestBody = Omit<TransactionRequest, 'id' | 'buyerId'>;

export class TransactionController {
  constructor(private readonly transactionManager: TransactionManager, app: Application) {
    app.post('/transaction', this.processTransaction.bind(this));
  }

  async processTransaction(req: Request, res: Response) {
    try {
      const userId = req.headers['user-id'];

      if (!userId || Array.isArray(userId)) {
        return res.status(400).json({
          error: `UserId has to be specified`,
        });
      }

      const transactionRequest: TransactionRequestBody = req.body;

      if (!transactionRequest) {
        return res.status(400).json({
          error: 'Transaction request body has to be specified',
        });
      }

      const result = await this.transactionManager.processTransactionRequest({
        ...transactionRequest,
        buyerId: userId,
        id: v4(),
      });

      res.json(result);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message ?? 'Something went wrong, please try again later...',
        });
      }
    }
  }
}
