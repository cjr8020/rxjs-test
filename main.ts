import { Observable } from 'rxjs';

import 'rxjs/add/observable/from';

////////////  concat operators ////////////


// const source = Observable.of('Hello', 'Goodbye');
//
// const example = source.concatMap( (val) => Observable.of(`${val} World!`));
//
// const subscribe = example.subscribe( val => console.log('Example One: ', val));


Observable.of('Hello', 'Goodbye')
    .concatMap( val => Observable.of(`${val} World!`))
    .subscribe( val =>  console.log('Example One: ', val));

