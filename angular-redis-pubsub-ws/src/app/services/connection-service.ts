import { Injectable } from '@angular/core';
import { SocketService } from './socket-service';
import { environment } from '../../environments/environment';
import { Account } from './account-service';
import { reject } from 'q';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private serviceCd = 'svc';
  private roomId = '_room_';
  private accounts: Account[] = environment.accounts;
  private currentId: string;
  constructor(private socketService: SocketService) {}

  async connect(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const account: Account = this.accounts.find(
        a => Number(a.id) === Number(id)
      );
      this.currentId = account.id;
      if (!account) {
        alert('Invalid account');
        reject();
      }
      console.log('connectionService# account: ', account);
      this.socketService.connect({
        serviceCd: this.serviceCd,
        roomId: this.roomId,
        accountId: account.id,
      });
      resolve(account);
    }).then((res: Account) => {
      const account: Account = res;
      const channel = `${this.serviceCd}${this.roomId}${account.id}`;
      this.socketService.listen(channel).subscribe(r => {
        console.log('listen.subscribe = ', r);
      });
      this.socketService.listenErrors().subscribe(err => {
        console.log('listen error = ', err);
        this.disconnect();
      });
    });
  }

  disconnect() {
    console.log('disconnected.');
    this.socketService.disconnect();
  }

  listenChannel(): Observable<string> {
    const channel = `${this.serviceCd}${this.roomId}${this.currentId}`;
    return new Observable(observer => {
      this.socketService.listen(channel).subscribe(res => {
        console.log('listen.subscribe = ', res);
        observer.next(res);
      });
    });
  }
}
