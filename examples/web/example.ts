import { Tween, easingElasticOut } from '../../src';

const container = document.querySelector('.balls-container');

for (let i = 0; i < 100; i++) {
  const el = document.createElement('span');
  el.classList.add('ball');
  container.appendChild(el);
}

const balls = document.querySelectorAll('.ball');

[].forEach.call(balls, (ball: HTMLElement) => {
  const tween = new Tween({ x: 100, y: 100 })
    .delay(1000)
    .easing(easingElasticOut)
    .to({ x: getRandomInt(100, 800), y: getRandomInt(100, 800) }, 2000)
    .onStart(() => console.log('Start!'))
    .onComplete(() => console.log('Completed!'))
    .onStop(() => console.log('Stopped!'))
    .onUpdate(val => {
      ball.style.left = `${Math.round(val.x)}px`;
      ball.style.top = `${Math.round(val.y)}px`;
    })
    .start();
});

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
