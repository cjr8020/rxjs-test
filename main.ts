import {from, of, EMPTY} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';


console.log(' ********** main.ts ************');

////////////  empty Observable ////////////

console.log(`EMPTY constant example`);
EMPTY.pipe(
  tap( () => console.warn('i will not reach here, as i am complete'))
).subscribe();

console.log(`of({}) creates Observable, emits next with value of {} and completes.`);
of({}).pipe(
  tap(() => console.warn('i WILL reach here and complete'))
).subscribe();


////////////  piping thru a set of operators ////////////

from([20, 15, 10, 5])
  .pipe(
    tap(item => console.log(`emitted item: ${item}`)),
    map(item => item * 2),
    map(item => item - 10),
    map(item => {
        if (item === 0) {
            throw new Error('zero detected');
        }
        return item;
    }),
    take(3) // comment out to see an error
  ).subscribe(
  item => console.log(`resulting item: ${item}`),
  err => console.error(`error occurred: ${err}`),
  () => console.log('complete')
);


from( [
  'Supplier 1',
  'Supplier 2'
])
  .pipe(
    tap( supplier => console.log(`emitted supplier: ${supplier}`)),
    filter(
      supplier => (
        supplier === 'Supplier 1'
      )
    )
  ).subscribe(
    supplier => console.log(`resulting supplier: ${supplier}`),
  err => console.error(`error occurred: ${err}`),
  () => console.log('complete')
);


////////////  piping thru a set of operators ////////////

// of(2, 4, 6)
//     .pipe(
//         map(item => item * 2),
//         tap(item => console.log(item)),
//         take(2)
//     ).subscribe(console.log);



////////////  create an observer and observable ////////////

// // will emit all elements of the array
// const appleStream = from(['Apple1', 'Apple2']);
//
// const sub = appleStream.subscribe(
//     apple => console.log(`Apple was emitted ${apple}`),
//     err => console.log(`Error occurred: ${err}`),
//     () => console.log(`No more apples, go home`)
// );
//
// sub.unsubscribe();



////////////  create an observer and observable ////////////

// const appleStream = new Observable(appleObserver => {
//   appleObserver.next('Apple 1');
//   appleObserver.next('Apple 2');
//   appleObserver.complete();
// });
//
// const sub = appleStream.subscribe(
//     apple => console.log(`Apple was emitted ${apple}`),
//     err => console.log(`Error occurred: ${err}`),
//     () => console.log(`No more apples, go home`)
// );
//
// sub.unsubscribe();

// console.log('---------------- mergeMap ---------------------');
//
// const outer$:Observable<number> = Observable.interval(50).take(5);
// const inner$:Observable<number> = Observable.interval(2000).take(1);
//
// const source$:Observable<string> = outer$.mergeMap( x => {
//     return inner$.map( y => `${x}:${y}`);
// });
//
// source$.subscribe( r => console.log(r) );



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






