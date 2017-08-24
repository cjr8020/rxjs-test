import { Observable } from 'rxjs';

let one = Observable.of(1);
let sub = one.subscribe( one => {
    console.log(one);
});