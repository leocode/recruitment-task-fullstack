import { Application, Request, Response } from 'express';
import { TransactionRequest } from '../../application/interfaces/transaction.interface';
import { v4 } from 'uuid';
import { TransactionFacade } from '../../application/services/transaction.facade';

type TransactionRequestBody = Omit<TransactionRequest, 'id' | 'buyerId'>;

export class TransactionController {
  constructor(private readonly transactionFacade: TransactionFacade, app: Application) {
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

      const result = await this.transactionFacade.processTransactionRequest({
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
