import { Account } from "../../public/interfaces/account.interface";
import { AccountRepository } from "../interfaces/account.repository";

export class AccountsService {
    constructor(private readonly accountRepository: AccountRepository){}

    public findByAddress(address: string): Promise<Account | null> {
        return this.accountRepository.findByAddress(address);
    }

    public async reset(): Promise<boolean> {
        this.accountRepository.reset();

        return true;
    }
}