# rxjs-test

#### setup

To install RxJS library
```
$ npm init
$ npm install rxjs --save

```
#### To set up dev environment


```
$ npm install webpack webpack-dev-server typescript ts-loader @types --save-dev

```


##### configure typescript compiler

create `tsconfig.json` file

```
{
  "compileOnSave": true,
  "compilerOptions": {
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  }
}

```


##### configure webpack tool

create `webpack.config.js` - a javascript file that webpack will execute in 
nodejs environment.  

```
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: "./main",
  output: {
    filename: "./js/bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};

```

Note: webpack creates resources in memory - you won't see `bundle.js` anywhere 
in the filesystem.

#### add scripts

Add npm `start` script in `package.json` file:

```
    "start": "webpack-dev-server --watch --inline"
``` 

This will allow the webpack to watch for file changes and refresh when a change 
is detected.



#### run the webpack dev server

```

$ npm start

> rxjs-test@6.0.0 start /Users/blah/rxjs-test
> webpack-dev-server --watch --inline

Built at: 03/14/2020 3:49:42 PM
         Asset      Size  Chunks             Chunk Names
./js/bundle.js  1.39 MiB    main  [emitted]  main
Entrypoint main = ./js/bundle.js
[./main.ts] 1.3 KiB {main} [built]
    + 134 hidden modules
ℹ ｢wdm｣: Compiled successfully.

```

#### Observable from array of values

```

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




////////////  create an observer and observable ////////////

// will emit all elements of the array
const appleStream = from(['Apple1', 'Apple2']);

const sub = appleStream.subscribe(
    apple => console.log(`Apple was emitted ${apple}`),
    err => console.log(`Error occurred: ${err}`),
    () => console.log(`No more apples, go home`)
);

sub.unsubscribe();


////////////  create an observer and observable ////////////

const appleStream = new Observable(appleObserver => {
  appleObserver.next('Apple 1');
  appleObserver.next('Apple 2');
  appleObserver.complete();
});

const sub = appleStream.subscribe(
    apple => console.log(`Apple was emitted ${apple}`),
    err => console.log(`Error occurred: ${err}`),
    () => console.log(`No more apples, go home`)
);

sub.unsubscribe();
```

#### concat operators

If you want to be sure that the order of emissions is the same as the order
in which you specified the source Observables.

concat* operators subscribe to an Observable only after the previous
Observable completes.


##### concat

```
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
```


##### concatMap


```
////////////  concatMap operators ////////////


// const source = Observable.of('Hello', 'Goodbye');
//
// const example = source.concatMap( (val) => Observable.of(`${val} World!`));
//
// const subscribe = example.subscribe( val => console.log('Example One: ', val));


Observable.of('Hello', 'Goodbye')
    .concatMap( val => Observable.of(`${val} World!`))
    .subscribe( val =>  console.log('Example One: ', val));

```

