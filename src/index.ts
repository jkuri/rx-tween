import { animationFrameScheduler, interval, defer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const ball = document.querySelector('.ball') as HTMLElement;

const msElapsed = (scheduler = animationFrameScheduler) => {
  return defer(() => {
    const start = scheduler.now();

    return interval(0, scheduler)
      .pipe(
        map(() => scheduler.now() - start)
      )
  });
};

const duration = (ms, scheduler = animationFrameScheduler) => {
  return msElapsed(scheduler)
    .pipe(
      map(ems => ems / ms),
      takeWhile(t => t <= 1)
    )
};

const distance = (d) => (t) => t * d;

const elasticOut = (t) => {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
};

const tween = (ms, to, easing) => {
  return duration(ms)
    .pipe(
      map(easing),
      map(distance(to))
    )
}

tween(2000, 300, elasticOut)
  .subscribe((frame) => {
    ball.style.transform = `translate3d(0, ${frame}px, 0)`;
  });
