export interface AccountAttrs {
    id: number;
    address: string;
    balance: number;
  }
  
  export class Account {
    private attrs: AccountAttrs;
  
    public get balance() {
      return this.attrs.balance;
    }
  
    public updateBalance(newBalance: number) {
      this.attrs.balance = newBalance;
    }
  
    public toAttrs(): AccountAttrs {
      return this.attrs;
    }
  
    public static fromAttrs(attrs: AccountAttrs) {
      return new Account(attrs);
    }
  
    private constructor(attrs: AccountAttrs) {
      this.attrs = {
        address: attrs.address,
        balance: attrs.balance,
        id: attrs.id,
      };
    }
  }