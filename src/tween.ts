import {
  Observable,
  Subscription,
  animationFrameScheduler,
  interval,
  defer,
  asyncScheduler,
  Scheduler,
  timer
} from 'rxjs';
import { map, takeWhile, delayWhen } from 'rxjs/operators';
import { easingLinear } from './easing-functions';

export class Tween {
  easingFunc: (t: number) => number;
  initialValue: number | { [key: string]: number };
  toValue: number | { [key: string]: number };
  ms: number;
  msDelay: number;
  sub: Subscription;

  private onStartCallback: Function;
  private onUpdateCallback: Function;
  private onCompleteCallback: Function;
  private onStopCallback: Function;
  private startFired: boolean;

  constructor(initialValue: number | { [key: string]: number }) {
    this.initialValue = initialValue;
    this.easingFunc = easingLinear;
    this.ms = 1000;
    this.msDelay = 0;

    return this;
  }

  start(): Tween {
    this.sub = this.dur(this.ms)
      .pipe(
        delayWhen(() => timer(this.msDelay)),
        map((t: any) => {
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
      }, (err: any) => {
        console.error(err);
      }, () => {
        if (typeof this.onCompleteCallback === 'function') {
          this.onCompleteCallback();
        }
        this.sub.unsubscribe();
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

  to(toValue: number | { [key: string]: number }, ms: number = 1000): Tween {
    this.ms = ms;
    this.toValue = toValue;

    return this;
  }

  delay(msDelay: number): Tween {
    this.msDelay = msDelay;
    return this;
  }

  duration(ms: number): Tween {
    this.ms = ms;
    return this;
  }

  easing(easingFunc: (t: number) => number): Tween {
    this.easingFunc = easingFunc;
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
      if (typeof this.initialValue === 'number' &&
        typeof this.toValue === 'number') {
        return this.initialValue + (this.toValue - this.initialValue) * t;
      } else {
        return Object.keys(this.initialValue).reduce((prev, key) => {
          const val = this.initialValue[key] + (this.toValue[key] -
            this.initialValue[key]) * t;
          return Object.assign({}, prev, { [key]: val });
        }, {});
      }
    };
  }

  private dur(ms: number): Observable<number> {
    const s = typeof requestAnimationFrame === 'undefined'
      ? asyncScheduler
      : animationFrameScheduler;

    return this.elapsedTime(s)
      .pipe(
        map((ems: number) => ems / ms),
        takeWhile((t: number) => t <= 1)
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
