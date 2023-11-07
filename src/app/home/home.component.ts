import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
/*     this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });*/

    // Same thing as above
    // observer is the listener
    // Give us an observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        // emit a new value
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          // Error cancel the observable completely
          // You do need to unsubscribe when throwing an error
          observer.error(new Error("Counter is greater than 3!"));
        }
        count++;
      }, 1000);
    });

    // Operator are placed between Observable and Observer (Listener) to transform data for example
/*    customIntervalObservable.pipe(map((data:number) => {
      return "Round " + (data + 1);
    }));*/

    // Observer (Listener)
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data) => {
      return data > 0;
    }), map((data:number) => {
      return "Round " + (data + 1);
    })).subscribe((data) => {
      console.log(data);
    }, error => { // error handler
      // handle the error when the observable throws an exception
      console.log(error);
      alert(error.message);
    }, () => { // completion section
      console.log("Completed!");
    });
  }

  ngOnDestroy() {
    // Executed when we leave the component
    this.firstObsSubscription.unsubscribe();
  }

}
