import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";


@Injectable({providedIn: "root"})
export class UserService {

  //activatedEmitter = new EventEmitter<boolean>();
  // Better approach when using EventEmitter
  // Used communicate across components, use when subscribe manually
  // Better event emitter
  activatedEmitter = new Subject<boolean>();

}
