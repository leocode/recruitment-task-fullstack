import { Account } from "@/account/public/interfaces/account.interface";


export interface TransactionRequest {
  id: any;
  buyerAccountAddress: string;
  characterId: number;
}

export interface Transaction {
  id: number;
  buyerAccount: Account;
  characterCost: number;
}