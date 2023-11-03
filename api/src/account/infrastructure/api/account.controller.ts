import { Application, Request, Response } from "express";
import { AccountsService } from "../../application/services/accounts.service";

export class AccountsController {
    constructor(private readonly accountsService: AccountsService,
        app: Application) {
        app.get('/account/:address', this.getAccount.bind(this));
        //app.get('/accounts', this.getMany.bind(this));

        app.post('/account/reset', this.reset.bind(this));
    }

    // TODO: user details?
    async getAccount(req: Request, res: Response) {
        const accountAddress = req.params.address;
        const account = await this.accountsService.findByAddress(accountAddress);        

        res.json(account);
    }

    reset(_req: Request, res: Response) {
        this.accountsService.reset();

        res.json({success: true})
    }
}