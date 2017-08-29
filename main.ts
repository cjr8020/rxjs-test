import { Observable } from 'rxjs';

import 'rxjs/add/observable/from';

////////////  concat operators ////////////

// ---------------- concat ----------------------

var source1 = Observable.of(1,2,3,4,5);
var source2 = Observable.of(6,7,8,9,10);

var source = Observable.concat(source1, source2);

var subscription = source.subscribe(
    (next) => {
        console.log('Next: %s', next);
    },
(error) => {
        console.log('Error: %s', error);
    },
    () => {
        console.log('Complete');
    }
);



// ---------------- concatMap ---------------------

// const source = Observable.of('Hello', 'Goodbye');
//
// const example = source.concatMap( (val) => Observable.of(`${val} World!`));
//
// const subscribe = example.subscribe( val => console.log('Example One: ', val));

//
// Observable.of('Hello', 'Goodbye')
//     .concatMap( val => Observable.of(`${val} World!`))
//     .subscribe( val =>  console.log('Example One: ', val));
//
