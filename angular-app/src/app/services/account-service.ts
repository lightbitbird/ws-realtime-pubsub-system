import { Injectable } from '@angular/core';

export declare interface Accounts {
  accounts: Account[];
}

export declare interface Account {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountId: string;
  private accountName: string;
  constructor() {}

  getAccountId() {
    return this.accountId;
  }

  setAccountId(id: string) {
    this.accountId = id;
  }

  getAccountName() {
    return this.accountName;
  }

  setAccountName(name: string) {
    this.accountName = name;
  }
}
