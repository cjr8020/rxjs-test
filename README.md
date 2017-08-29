# rxjs-test

#### setup

To install RxJS library
```
$ npm init
$ npm install rxjs --save
ps-rxjs5@1.0.0 ./js/ps-rxjs5
└─┬ rxjs@5.0.0-rc.5
  └── symbol-observable@1.0.4

```
#### To set up dev environment

To be able to use RxJS v5, I need  EcmaScript 2015 (ES6) environment.
So, I need a transpiler to transpile our code into ES5 code so that it can 
execute in the browser today.
I also need a module bundler to package all of our code and to serve it up to
the browser.

webpack - will build and package our code into a single file.

  webpack-dev-server - dev web server
  typescript - compiler   
  typings 
  ts-loader - a plugin for webpack enabling typescript with webpack 


```
$ npm install webpack webpack-dev-server typescript typings ts-loader --save-de
v
ps-rxjs5@1.0.0 ./js/ps-rxjs5
├─┬ ts-loader@1.3.1
│ ├── arrify@1.0.1
│ ├── colors@1.1.2
│ ├─┬ enhanced-resolve@0.9.1
│ │ ├── graceful-fs@4.1.11
│ │ └── memory-fs@0.2.0
│ ├─┬ loader-utils@0.2.16
│ │ ├── big.js@3.1.3
│ │ ├── emojis-list@2.1.0
│ │ └── json5@0.5.1
│ ├── object-assign@4.1.0
│ └── semver@5.3.0
├── typescript@2.1.4
├─┬ typings@2.0.0
│ ├── any-promise@1.3.0
.
.
.
```

#### Install ES6 type definition file

Because RxJS v5 uses ES6 syntax, we need to have ES6 type definition file installed 
in our project.

```
$ ./node_modules/.bin/typings install dt~es6-shim --global --save
es6-shim
└── (No dependencies)
```

This creates typings.json file in the project folder:

```
{
  "globalDependencies": {
    "es6-shim": "registry:dt/es6-shim#0.31.2+20160602141504"
  }
}
```

##### configure typescript compiler

create `tsconfig.json` file
with the following options:

  target: ES5
  module: commonjs - that's the module format that webpack understands
  sourceMap: true - yes, create the sourceMap - makes it easier to debug

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  }
}
```


##### configure webpack tool

create `webpack.config.js` - a javascript file that webpack will execute in 
nodejs environment.  and this file needs to export a configuration object specifying:

  entry point for my application - which file bootstraps my application
  single output - app.js - that will be loaded in index.html
  module loaders - in our case just one `ts-loader` for all .ts files in our project.
  how webpack should resolve modules - what file extensions to look for. 

```
module.exports = {
  entry: "./main",
  output: {
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".ts", ".js"]
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

`postinstall` script to be run after npm is finished with an install

```
    "postinstall": "typings install"
```

this will make sure that anyone who start this project from source code from
scratch and runs `npm install`  will also install typings correctly.
This will be the `es6-shim` typings file that we installed earlier.


#### run the webpack dev server

```

$ npm start

> ps-rxjs5@1.0.0 start ./js/ps-rxjs5
> webpack-dev-server --watch --inline

 http://localhost:8080/
webpack result is served from /
content is served from ./js/ps-rxjs5
ts-loader: Using typescript@2.1.4 and ./js/ps-rxjs5/tsconfig.json
Hash: 2e4596019d73f2fc77d9
Version: webpack 1.14.0
Time: 1252ms
      Asset    Size  Chunks             Chunk Names
./js/app.js  242 kB       0  [emitted]  main
chunk    {0} ./js/app.js (main) 223 kB [rendered]
    [0] multi main 40 bytes {0} [built]
    [1] (webpack)-dev-server/client?http://localhost:8080 3.97 kB {0} [built]
    [2] ./~/url/url.js 23.3 kB {0} [built]
    [3] ./~/url/~/punycode/punycode.js 14.6 kB {0} [built]
    [4] (webpack)/buildin/module.js 251 bytes {0} [built]
    [5] ./~/url/util.js 314 bytes {0} [built]
    [6] ./~/querystring/index.js 127 bytes {0} [built]
    [7] ./~/querystring/decode.js 2.4 kB {0} [built]
    [8] ./~/querystring/encode.js 2.09 kB {0} [built]
    [9] ./~/strip-ansi/index.js 161 bytes {0} [built]
   [10] ./~/ansi-regex/index.js 135 bytes {0} [built]
   [11] (webpack)-dev-server/client/socket.js 856 bytes {0} [built]
   [12] ./~/sockjs-client/lib/entry.js 244 bytes {0} [built]
   [13] ./~/sockjs-client/lib/transport-list.js 613 bytes {0} [built]
   [14] ./~/sockjs-client/lib/transport/websocket.js 2.71 kB {0} [built]
   [15] ./~/process/browser.js 5.3 kB {0} [built]
   [16] ./~/sockjs-client/lib/utils/event.js 2 kB {0} [built]
   [17] ./~/sockjs-client/lib/utils/random.js 746 bytes {0} [built]
   [18] ./~/sockjs-client/lib/utils/browser-crypto.js 438 bytes {0} [built]
   [19] ./~/sockjs-client/lib/utils/url.js 975 bytes {0} [built]
   [20] ./~/url-parse/index.js 9.92 kB {0} [built]
   [21] ./~/requires-port/index.js 753 bytes {0} [built]
   [22] ./~/url-parse/lolcation.js 1.58 kB {0} [built]
   [23] ./~/querystringify/index.js 1.3 kB {0} [built]
   [24] ./~/debug/browser.js 4.14 kB {0} [built]
   [25] ./~/debug/debug.js 4.2 kB {0} [built]
   [26] ./~/ms/index.js 2.72 kB {0} [built]
   [27] ./~/inherits/inherits_browser.js 672 bytes {0} [built]
   [28] ./~/sockjs-client/lib/event/emitter.js 1.27 kB {0} [built]
   [29] ./~/sockjs-client/lib/event/eventtarget.js 1.85 kB {0} [built]
   [30] ./~/sockjs-client/lib/transport/browser/websocket.js 172 bytes {0} [built]
   [31] ./~/sockjs-client/lib/transport/xhr-streaming.js 1.25 kB {0} [built]
   [32] ./~/sockjs-client/lib/transport/lib/ajax-based.js 1.31 kB {0} [built]
   [33] ./~/sockjs-client/lib/transport/lib/sender-receiver.js 1.15 kB {0} [built]
   [34] ./~/sockjs-client/lib/transport/lib/buffered-sender.js 2.3 kB {0} [built]
   [35] ./~/sockjs-client/lib/transport/lib/polling.js 1.32 kB {0} [built]
   [36] ./~/sockjs-client/lib/transport/receiver/xhr.js 1.58 kB {0} [built]
   [37] ./~/sockjs-client/lib/transport/sender/xhr-cors.js 343 bytes {0} [built]
   [38] ./~/sockjs-client/lib/transport/browser/abstract-xhr.js 4.8 kB {0} [built]
   [39] ./~/sockjs-client/lib/transport/sender/xhr-local.js 352 bytes {0} [built]
   [40] ./~/sockjs-client/lib/utils/browser.js 560 bytes {0} [built]
   [41] ./~/sockjs-client/lib/transport/xdr-streaming.js 984 bytes {0} [built]
   [42] ./~/sockjs-client/lib/transport/sender/xdr.js 2.46 kB {0} [built]
   [43] ./~/sockjs-client/lib/transport/eventsource.js 766 bytes {0} [built]
   [44] ./~/sockjs-client/lib/transport/receiver/eventsource.js 1.58 kB {0} [built]
   [45] ./~/sockjs-client/lib/transport/browser/eventsource.js 37 bytes {0} [built]
   [46] ./~/sockjs-client/lib/transport/lib/iframe-wrap.js 981 bytes {0} [built]
   [47] ./~/sockjs-client/lib/transport/iframe.js 3.83 kB {0} [built]
   [48] ./~/json3/lib/json3.js 43.3 kB {0} [built]
   [49] (webpack)/buildin/amd-options.js 43 bytes {0} [built]
   [50] ./~/sockjs-client/lib/version.js 26 bytes {0} [built]
   [51] ./~/sockjs-client/lib/utils/iframe.js 5.06 kB {0} [built]
   [52] ./~/sockjs-client/lib/utils/object.js 532 bytes {0} [built]
   [53] ./~/sockjs-client/lib/transport/htmlfile.js 710 bytes {0} [built]
   [54] ./~/sockjs-client/lib/transport/receiver/htmlfile.js 2.2 kB {0} [built]
   [55] ./~/sockjs-client/lib/transport/xhr-polling.js 894 bytes {0} [built]
   [56] ./~/sockjs-client/lib/transport/xdr-polling.js 712 bytes {0} [built]
   [57] ./~/sockjs-client/lib/transport/jsonp-polling.js 1.02 kB {0} [built]
   [58] ./~/sockjs-client/lib/transport/receiver/jsonp.js 5.57 kB {0} [built]
   [59] ./~/sockjs-client/lib/transport/sender/jsonp.js 2.46 kB {0} [built]
   [60] ./~/sockjs-client/lib/main.js 11.9 kB {0} [built]
   [61] ./~/sockjs-client/lib/shims.js 18.2 kB {0} [built]
   [62] ./~/sockjs-client/lib/utils/escape.js 2.31 kB {0} [built]
   [63] ./~/sockjs-client/lib/utils/transport.js 1.35 kB {0} [built]
   [64] ./~/sockjs-client/lib/utils/log.js 450 bytes {0} [built]
   [65] ./~/sockjs-client/lib/event/event.js 477 bytes {0} [built]
   [66] ./~/sockjs-client/lib/location.js 177 bytes {0} [built]
   [67] ./~/sockjs-client/lib/event/close.js 295 bytes {0} [built]
   [68] ./~/sockjs-client/lib/event/trans-message.js 292 bytes {0} [built]
   [69] ./~/sockjs-client/lib/info-receiver.js 2.22 kB {0} [built]
   [70] ./~/sockjs-client/lib/transport/sender/xhr-fake.js 456 bytes {0} [built]
   [71] ./~/sockjs-client/lib/info-iframe.js 1.52 kB {0} [built]
   [72] ./~/sockjs-client/lib/info-iframe-receiver.js 791 bytes {0} [built]
   [73] ./~/sockjs-client/lib/info-ajax.js 1.03 kB {0} [built]
   [74] ./~/sockjs-client/lib/iframe-bootstrap.js 2.9 kB {0} [built]
   [75] ./~/sockjs-client/lib/facade.js 723 bytes {0} [built]
   [76] ./main.ts 21 bytes {0} [built]
webpack: bundle is now VALID.

```

#### Observable from array of values

```
////////////  Observables from array of values ////////////

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

getCrisis(4).subscribe( c => console.log('crisis[4]: %s', c.name));

```

#### concat operators

```
////////////  concat operators ////////////


// const source = Observable.of('Hello', 'Goodbye');
//
// const example = source.concatMap( (val) => Observable.of(`${val} World!`));
//
// const subscribe = example.subscribe( val => console.log('Example One: ', val));


Observable.of('Hello', 'Goodbye')
    .concatMap( val => Observable.of(`${val} World!`))
    .subscribe( val =>  console.log('Example One: ', val));

```

