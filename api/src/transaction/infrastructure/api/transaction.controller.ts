import { Application, Request, Response } from "express";
import { TransactionManager } from "../../application/services/transaction-manager";
import { TransactionRequest } from "../../application/interfaces/transaction.interface";
import { v4 } from "uuid";

type TransactionRequestBody = Omit<TransactionRequest, 'id'>;

// TODO: fetching list of txs?
// TODO: fetching list of bought items
export class TransactionsController {
    constructor(private readonly transactionManager: TransactionManager, app: Application) {
        app.post('/transaction', this.processTransaction.bind(this));
    }

    async processTransaction(req: Request, res: Response) {
        try {
            const transactionRequest: TransactionRequestBody = req.body;

            const result = await this.transactionManager.processTransactionRequest({
                ...transactionRequest,
                id: v4(),
            });

            res.json(result)
        } catch(error: any) {
            // TODO: instanceof or ask candidate about it?
            res.status(500).json({
                message: error.message ?? 'Something went wrong, please try again later...'
            })
        }
        

    }
}
