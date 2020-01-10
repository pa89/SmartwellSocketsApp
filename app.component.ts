import { NewsletterService } from './../services/newsletter.service';
import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'smartwell-pwa';
  readonly VAPID_PUBLIC_KEY = "BP-Bzu3Hh3LcpaV0cYMB7YlC24Wn3U5gjPVOFfs7djPIGO5k_iEo7wU8ABgb_iBwhBH3fTvlI9Zwl1UBM-OHNhw";
  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private newsLetterService: NewsletterService) {}

  subscribeToNotifications() {
    this.swPush.requestSubscription(
      {serverPublicKey: this.VAPID_PUBLIC_KEY}
    )
    .then(sub => this.newsLetterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error('could not subscribe', err));
  }

  ngOnInit() {
     if(!sessionStorage.getItem("count")) {
     sessionStorage.setItem("count","4");
     }
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( () => {
        if(confirm("New version available. load new version?")) {
          window.location.reload();
        }
      })
    }
  }

}
