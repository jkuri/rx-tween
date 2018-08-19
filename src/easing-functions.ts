export function easingLinear(t: number): number {
  return t;
}

export function easingBackIn(t: number): number {
  const s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

export function easingBackOut(t: number): number {
  const s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

export function easingBackInOut(t: number): number {
  const s = 1.70158 * 1.525;
  if ((t *= 2) < 1) {
    return 0.5 * (t * t * ((s + 1) * t - s));
  }
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

export function easingBounceOut(t: number): number {
  const a = 4.0 / 11.0;
  const b = 8.0 / 11.0;
  const c = 9.0 / 10.0;

  const ca = 4356.0 / 361.0;
  const cb = 35442.0 / 1805.0;
  const cc = 16061.0 / 1805.0;

  const t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72;
}

export function easingBounceIn(t: number): number {
  return 1.0 - easingBounceOut(1.0 - t);
}

export function easingBounceInOut(t: number): number {
  return t < 0.5
    ? 0.5 * (1.0 - easingBounceOut(1.0 - t * 2.0))
    : 0.5 * easingBounceOut(t * 2.0 - 1.0) + 0.5;
}

export function easingCircIn(t: number): number {
  return 1.0 - Math.sqrt(1.0 - t * t);
}

export function easingCircOut(t: number): number {
  return Math.sqrt(1 - (--t * t));
}

export function easingCircInOut(t: number): number {
  if ((t *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - t * t) - 1);
  }
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

export function easingCubicIn(t: number): number {
  return t * t * t;
}

export function easingCubicOut(t: number): number {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

export function easingCubicInOut(t: number): number {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

export function easingElasticIn(t: number): number {
  return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

export function easingElasticOut(t: number): number {
  return Math.sin(-13.0 * (t + 1.0)
    * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
}

export function easingElasticInOut(t: number): number {
  return t < 0.5
    ? 0.5 * Math.sin(+13.0 * Math.PI / 2 * 2.0 * t) *
    Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * Math.sin(-13.0 * Math.PI / 2 * ((2.0 * t - 1.0) + 1.0)) *
    Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

export function easingExpoIn(t: number): number {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

export function easingExpoOut(t: number): number {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

export function easingExpoInOut(t: number): number {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

export function easingQuadIn(t: number): number {
  return t * t;
}

export function easingQuadOut(t: number): number {
  return -t * (t - 2.0);
}

export function easingQuadInOut(t: number): number {
  t /= 0.5;
  if (t < 1) {
    return 0.5 * t * t;
  }
  t--;
  return -0.5 * (t * (t - 2) - 1);
}

export function easingQuartIn(t: number): number {
  return Math.pow(t, 4.0);
}

export function easingQuartOut(t: number): number {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

export function easingQuartInOut(t: number): number {
  return t < 0.5
    ? +8.0 * Math.pow(t, 4.0)
    : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

export function easingQuintIn(t: number): number {
  return t * t * t * t * t;
}

export function easingQuintOut(t: number): number {
  return --t * t * t * t * t + 1;
}

export function easingQuintInOut(t: number): number {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

export function easingSineIn(t: number): number {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) {
    return 1;
  } else {
    return 1 - v;
  }
}

export function easingSineOut(t: number): number {
  return Math.sin(t * Math.PI / 2);
}

export function easingSineInOut(t: number): number {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}
