import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as Peer from 'peerjs-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private peer: Peer;
  private peerConnection;

  public fPeerId;
  public message = {};
  public messages: String[] = ["prueba"];

  constructor(public navCtrl: NavController, public ngZone: NgZone) {
    this.peer = new Peer("Marjo", {host: '24.232.167.63', port: 9000});
    this.peer.on('open', function (id) {
    });
    this.peer.on('connection', (conn) => this.bindOnConnectionOpenedByPeer(conn));
  }

  private bindOnConnectionOpenedByPeer(connection) {
    this.ngZone.run(() => {
      this.peerConnection = connection;
      console.log("connection opened by the pair")
      connection.send({text: "listening"})
      this.peerConnection.on("data", data => this.bindOnDataReceived(data));
    });
  }

  private bindOpenedConnection() {
    this.peerConnection.on("data", data => this.bindOnDataReceived(data));
  }

  private bindOnDataReceived(data) {
    this.ngZone.run(() => {
      console.log(data)
      this.messages.push(data.text);
    });

  }

  public createConnection() {
    this.peerConnection = this.peer.connect(this.fPeerId);
    this.peerConnection.on("data", data => this.bindOnDataReceived(data));
  }


  public sendMessage() {
    if (!this.peerConnection) {
      this.createConnection();
    }
    console.log(this.peerConnection);
    this.peerConnection.send(this.message);
  }

}
