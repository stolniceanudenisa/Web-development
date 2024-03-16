import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractComponent implements OnDestroy {
  protected subscriptions: Array<Subscription> = [];

  protected addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
