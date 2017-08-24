import { Observable } from 'rxjs';

import 'rxjs/add/observable/from';

////////////  Observable from array of values ////////////

// let numbersArray: number[] = [1,2,3];
//
// let source: Observable<number> = Observable.from(numbersArray);
// source.subscribe(
//     n => console.log('Next number: %s', n),
//     error => console.log('error: %s', error),
//     () => console.log('Completed')
// );

export class Crisis {
    constructor(
        public id: number,
        public name: string
    ) {}
}
const CRISES = [
    new Crisis(1, 'Dragon Burning Cities'),
    new Crisis(2, 'Sky Rains Great White Sharks'),
    new Crisis(3, 'Giant Asteroid Heading for Earth'),
    new Crisis(4, 'Procrastinators Meeting Delayed Again')
];

// let source = Observable.from(CRISES)
//     .find( (x) => { return x.id === 4});
//
// let subscription = source.subscribe(
//     crisis => console.log('crisis: %s', crisis.name)
// );

function getCrisis(id: number|string) {
    return Observable.from(CRISES)
        .find( crisis => crisis.id === id);
}

let c: Crisis;
getCrisis(4).subscribe( s => c = s);
console.log('c: %s', c.name);
