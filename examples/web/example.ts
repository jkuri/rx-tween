import { Tween } from '../../src/index';
import { easingElasticOut } from '../../src/easing-functions';

const ball = document.querySelector('.ball') as HTMLElement;

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
