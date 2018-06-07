import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Peer from 'peerjs-client';

@Injectable()
export class ChatConnectionProvider {

  private peer: Peer;

  constructor(public http: HttpClient) {}

  public logWithUsername(username: String){
    this.peer = new Peer({host: '24.232.167.63', port: 9000});
  }

  public connectWithPair(pairId) {
    return this.peer.connect(pairId);
  }




}
