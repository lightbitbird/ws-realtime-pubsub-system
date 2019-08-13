import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export declare interface SocketRoom {
  serviceCd: string;
  roomId: string;
  accountId: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private host = process.env.ENV_HOST || 'localhost'
  private port = process.env.SYNC_PORT || 7000;
  private rsUrl = `http://${this.host}:${this.port}`;
  private socketio: SocketIOClient.Socket;
  constructor() {}

  connect(room: SocketRoom) {
    this.socketio = io.connect(this.rsUrl, {
      query: {
        serviceCd: room.serviceCd,
        roomId: room.roomId,
        accountId: room.accountId,
      },
    });
    this.socketio.on('connect', () => {
      console.log(
        `${room.serviceCd}${room.roomId}${room.accountId}`,
        ' connected.'
      );
    });
    this.socketio.on('reconnect', () => {
      console.log('reconnect.');
    });
    this.socketio.on('disconnect', e => {
      console.log('disconnected: ', e);
    });
  }

  disconnect() {
    console.log('disconnected.');
    this.socketio.disconnect();
  }

  listen(channel: string): Observable<any> {
    return new Observable(observer => {
      this.socketio.on(channel, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socketio.disconnect();
      };
    });
  }

  listenErrors(): Observable<Error> {
    return new Observable(observer => {
      if (this.socketio) {
        this.socketio.on('error', (e: Error) => {
          console.log('sockt error: ', e);
          observer.next(e);
        });
      } else {
        observer.next(null);
      }
    });
  }
}
