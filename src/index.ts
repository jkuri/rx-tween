import {
  Observable,
  Subscription,
  animationFrameScheduler,
  interval,
  defer,
  asyncScheduler,
  Scheduler
} from 'rxjs';
import { map, takeWhile, delay } from 'rxjs/operators';
import { easingLinear } from './easing-functions';

export class Tween {
  easingFunc: (t: number) => number;
  initialValue: number;
  toValue: number;
  ms: number;
  msDelay: number;
  sub: Subscription;

  private onStartCallback;
  private onUpdateCallback;
  private onCompleteCallback;
  private onStopCallback;
  private startFired;

  constructor(initialValue: number) {
    this.initialValue = initialValue;
    this.easingFunc = easingLinear;
    this.ms = 1000;
    this.msDelay = 0;

    return this;
  }

  start(): Tween {
    this.sub = this.duration(this.ms)
      .pipe(
        delay(this.msDelay),
        map(t => {
          if (typeof this.onStartCallback === 'function' && !this.startFired) {
            this.startFired = true;
            this.onStartCallback();
          }
          return t;
        }),
        map(this.easingFunc),
        map(this.distance())
      )
      .subscribe((frame: number) => {
        if (typeof this.onUpdateCallback === 'function') {
          this.onUpdateCallback(frame);
        }
      }, err => {
        console.error(err);
      }, () => {
        this.sub.unsubscribe();
        if (typeof this.onCompleteCallback === 'function') {
          this.onCompleteCallback();
        }
      });

    return this;
  }

  stop(): Tween {
    if (typeof this.onStopCallback === 'function') {
      this.onStopCallback();
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }

    return this;
  }

  to(toValue: number, ms: number = 1000): Tween {
    this.ms = ms;
    this.toValue = toValue;

    return this;
  }

  delay(msDelay: number): Tween {
    this.msDelay = msDelay;
    return this;
  }

  onStart(callback: Function): Tween {
    this.onStartCallback = callback;
    return this;
  }

  onUpdate(callback: Function): Tween {
    this.onUpdateCallback = callback;
    return this;
  }

  onComplete(callback: Function): Tween {
    this.onCompleteCallback = callback;
    return this;
  }

  onStop(callback: Function): Tween {
    this.onStopCallback = callback;
    return this;
  }

  private distance() {
    return (t: number) => {
      return this.initialValue + (this.toValue - this.initialValue) * t;
    };
  }

  private duration(ms: number): Observable<number> {
    const s = typeof requestAnimationFrame === 'undefined'
      ? asyncScheduler
      : animationFrameScheduler;

    return this.elapsedTime(s)
      .pipe(
        map(ems => ems / ms),
        takeWhile(t => t <= 1)
      );
  }

  private elapsedTime(scheduler: Scheduler): Observable<number> {
    return defer(() => {
      const start = scheduler.now();

      return interval(0, scheduler)
        .pipe(
          map(() => scheduler.now() - start)
        );
    });
  }
}

// const tween = new Tween(500)
//   .delay(500)
//   .to(1000, 3000)
//   .onStart(() => console.log('Start!'))
//   .onComplete(() => console.log('Completed!'))
//   .onStop(() => console.log('Stopped!'))
//   .onUpdate(val => console.log(val));

// tween.start();

// setTimeout(() => tween.stop(), 1500);
