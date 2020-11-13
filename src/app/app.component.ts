import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


interface Token {
  token: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'podcastTrek';
  private tokensCollections: AngularFirestoreCollection<Token>;
  constructor(private swUpdate: SwUpdate, private messaging: AngularFireMessaging, private database: AngularFirestore) {
    this.tokensCollections = this.database.collection<Token>('tokens');
  }
  ngOnInit(): void {
    this.updatePWA();
    this.requestPermision();
    this.listenNotifications();
  }

  updatePWA(): void {
    this.swUpdate.available.subscribe(value => {
      console.log('uodate', value);
      window.location.reload();
    });
  }

  requestPermision(): void {
    this.messaging.requestToken.subscribe(token => {
      console.log(token);
      this.tokensCollections.add({token});
    });
  }

  listenNotifications(): void {
    this.messaging.messages.subscribe(message => {
      console.log(message);
    });
  }
}
