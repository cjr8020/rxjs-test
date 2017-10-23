import { Observable } from 'rxjs';

import 'rxjs/add/observable/from';

////////////  concat operators ////////////

// ---------------- take ----------------------

// const source = Observable.of(1,2,3,4,5);
// // take the first emitted value then complete
// source.take(1)
//     .subscribe( el => {
//        console.log(`first emitted element: ${el}`);
//     });

// Observable.interval(1000)
//     .take(5)  // take the first 5 emitted values
//     .subscribe( val => {
//         console.log(`emitted val: ${val}`);
//     });


console.log('---------------- mergeMap ---------------------');

const outer$:Observable<number> = Observable.interval(50).take(5);
const inner$:Observable<number> = Observable.interval(2000).take(1);

const source$:Observable<string> = outer$.mergeMap( x => {
    return inner$.map( y => `${x}:${y}`);
});

source$.subscribe( r => console.log(r) );



// console.log('---------------- switchMap ---------------------');
//
// const outer$:Observable<number> = Observable.interval(50).take(5);
// const inner$:Observable<number> = Observable.interval(2000).take(1);
//
// const source$:Observable<string> = outer$.switchMap( x => {
//     return inner$.map( y => `${x}:${y}`);
// });
//
// source$.subscribe( r => console.log(r) );