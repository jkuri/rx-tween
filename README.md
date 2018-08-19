# rx-tween

JavaScript tweening engine for easy animations based on RxJS.

```ts
import { Tween, easingElasticOut } from '@jkuri/rx-tween';

const ball = document.querySelector('.ball');

const tween = new Tween({ x: 100, y: 100 })
  .delay(0)
  .easing(easingElasticOut)
  .to({ x: 200, y: 400 }, 2000)
  .onStart(() => console.log('Start!'))
  .onComplete(() => console.log('Completed!'))
  .onStop(() => console.log('Stopped!'))
  .onUpdate(val => {
    ball.style.left = `${val.x}px`;
    ball.style.top = `${val.y}px`;
  })
  .start();
```

## Installation

```sh
npm install @jkuri/rx-tween --save
```

or if you are using `yarn`,

```sh
yarn add @jkuri/rx-tween --save
```

## Run example

```sh
yarn start
```

## License

MIT
