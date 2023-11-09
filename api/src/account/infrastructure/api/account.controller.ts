import { Application, Request, Response } from 'express';
import { AccountService } from '../../application/services/account.service';

export class AccountController {
  constructor(private readonly accountsService: AccountService, app: Application) {
    app.get('/account', this.getAccountDetails.bind(this));
    app.post('/account/reset', this.reset.bind(this));
  }

  async getAccountDetails(req: Request, res: Response) {
    const userId = req.headers['user-id'];

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({
        error: 'UserId has to be specified',
      });
    }

    const account = await this.accountsService.findByAddress(userId);

    res.json(account ? account.toAttrs() : null);
  }

  async reset(_req: Request, res: Response) {
    const result = await this.accountsService.reset();

    res.json({ success: result });
  }
}
