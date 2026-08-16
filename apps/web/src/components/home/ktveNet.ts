"use client";

export type HubLines = { first: string; second: string }[];

const SVG_NS = "http://www.w3.org/2000/svg";

const LINE_COLOR = "#faf9f5";
const DRIFT = { pace: 5.635, drift: 0.3375, scale: 1.408, lines: 0.4 };
const DENSITY = { density: 0.55, lines: 0.8, seed: 0 };
const LINE_OPACITY = 0.8 * DRIFT.lines * DENSITY.lines;
const TRIGGER_OFFSET = 350;
const TRIGGER_VIEW = 0.7;
const MAX_INNER_WIDTH = 1370;
const OUTER_MARGIN = 64;
const RATIOS = ["1:1", "4:3", "4:5"];
const RATIO_SIZES: Record<string, { w: number; h: number }> = {
  "1:1": { w: 30.857, h: 30.857 },
  "4:3": { w: 34.971, h: 26.229 },
  "4:5": { w: 28.8, h: 36 },
};
const THEME_KEYS: Record<string, string> = {
  u: "understanding",
  i: "using",
  g: "governing",
  e: "economy",
  s: "society",
};
const HUB_IDS = ["understanding", "using", "governing", "economy", "society"];
const HUB_POS: [number, number][] = [
  [150, 300],
  [1290, 205],
  [940, 75],
  [1160, 685],
  [330, 690],
];
const SEQUENCE =
  "u1,u1,u1,u2,u1,u1,u1,u1,u1,u1,u1,u2,i2,i2,i2,i2,i2,i2,i2,i2,i2,i2,g2,g2,g2,g2,g2,g2,g2,g2,g2,e0,e1,e1,e1,e1,e1,e1,s2,s2,s1,s1,s2,s1,s2,s1,s1,s2,s2,s2,s2,s1,s1,s1,s1,ug2,is1,is2,is2,is2,eg2,eg2,eg2,eg1,es1,es1,es1,es2";
const CANVAS = { w: 1440, h: 704 };

const TIMELINE_M = 2.6;
const TIMELINE_B = 0.36;
const tweenPos = (w: number) => (w - TIMELINE_B) * TIMELINE_M;
const TILE_DUR = 0.22 * TIMELINE_M;
const LABEL_DELAY = tweenPos(0.42);
const LABEL_DUR = 0.2 * TIMELINE_M;
const LINE_DELAY = tweenPos(0.58);
const LINE_DUR = 0.42 * TIMELINE_M;
const BLOOM_DELAY = tweenPos(0.55);
const BLOOM_DUR = 0.4 * TIMELINE_M;
const ENTRANCE_TOTAL = LINE_DELAY + LINE_DUR;

const easeOut = (p: number) => 1 - (1 - p) * (1 - p);
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Box = { l: number; r: number; t: number; b: number };
type Keepout = Box & { gap: number };
type Bounds = { x0: number; y0: number; x1: number; y1: number };
type Fit = { x: number; y: number; w: number; h: number; scale: number; wCss: number };
type FitCtx = { frames: Fit[]; inW: number; outW: number; I: Bounds; U: Bounds };

type Hub = {
  id: string;
  lines: string[];
  x: number;
  y: number;
  x0: number;
  y0: number;
  box?: Box;
  el?: SVGTextElement;
  lineRel?: { l: number; r: number; t: number; b: number }[];
};

type TileDef = { id: string; themes: string[]; ratio: string; image: boolean };

type PlacedTile = {
  hub: Hub;
  hub2: Hub | null;
  id: string;
  ratio: string;
  hw: number;
  hh: number;
  x: number;
  y: number;
  bleed?: boolean;
  memberIn?: boolean;
};

type PlacedOut = {
  id: string;
  hubId: string;
  hub2Id: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  bleed: boolean;
};

export type NetLine = {
  el: SVGLineElement;
  x2: number;
  y2: number;
  len: number;
  core: boolean;
  wX2?: string;
  wY2?: string;
};

export type Sat = {
  id: string;
  hub: Hub;
  hub2: Hub | null;
  cx: number;
  cy: number;
  rect: SVGRectElement;
  overlay?: SVGRectElement;
  img?: SVGImageElement;
  lines: NetLine[];
  core: boolean;
  e: number;
  d: number;
  bleed: boolean;
  box: Box;
  delay: number;
  wOp?: string;
  wOp2?: string;
  wTr?: string;
};

export type Net = {
  sats: Sat[];
  labels: SVGTextElement[];
  lines: NetLine[];
  coreSats: Sat[];
  bloomSats: Sat[];
};

function makeEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string>,
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  return el;
}

function rayBox(px: number, py: number, box: Box, qx: number, qy: number) {
  const w = qx - px;
  const c = qy - py;
  let g = Infinity;
  let t: number;
  if (w && (t = ((w > 0 ? box.r : box.l) - px) / w, t > 0 && t < g)) g = t;
  if (c && (t = ((c > 0 ? box.b : box.t) - py) / c, t > 0 && t < g)) g = t;
  if (g === Infinity) g = 0;
  return { x: px + w * g, y: py + c * g };
}

function hitsKeepout(hx: number, hy: number, qx: number, qy: number, k: Keepout | null) {
  if (!k) return false;
  const w = 10;
  let c = 0;
  let g = 1;
  const dx = qx - hx;
  const dy = qy - hy;
  const z = [
    [-dx, hx - (k.l - w)],
    [dx, k.r + w - hx],
    [-dy, hy - (k.t - w)],
    [dy, k.b + w - hy],
  ];
  for (let i = 0; i < 4; i++) {
    const a = z[i][0];
    const b = z[i][1];
    if (a === 0) {
      if (b < 0) return false;
      continue;
    }
    const s = b / a;
    if (a < 0) {
      if (s > g) return false;
      if (s > c) c = s;
    } else {
      if (s < c) return false;
      if (s < g) g = s;
    }
  }
  return c <= g;
}

function hashId(id: string) {
  let t = 0;
  for (let n = 0; n < id.length; n++) t = (t * 31 + id.charCodeAt(n)) % 997;
  return t / 997;
}

function mulberry(seed: number) {
  return function () {
    seed = (seed + 1831565813) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1);
    t = (t + Math.imul(t ^ (t >>> 7), t | 61)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fitBounds(svg: SVGSVGElement): FitCtx {
  const rect = svg.getBoundingClientRect();
  const i = rect.width || 1;
  const y = rect.height || (i * CANVAS.h) / CANVAS.w;
  const makeFrame = (S: number, J: number): Fit => {
    const r = S / J;
    const O: Fit =
      r <= CANVAS.w / CANVAS.h
        ? { w: CANVAS.h * r, h: CANVAS.h, x: 0, y: 0, scale: 0, wCss: 0 }
        : { w: CANVAS.w, h: CANVAS.w / r, x: 0, y: 0, scale: 0, wCss: 0 };
    O.x = (CANVAS.w - O.w) / 2;
    O.y = (CANVAS.h - O.h) / 2;
    O.scale = S / O.w;
    O.wCss = S;
    return O;
  };
  const F = Math.min(MAX_INNER_WIDTH, window.innerWidth - OUTER_MARGIN);
  const w = Math.min(F, i);
  const c = Math.max(window.innerWidth, i);
  const g = y / i;
  const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const H = (window.matchMedia("(max-width: 479px)").matches ? 4 : 8) * fs;
  const mobile = window.matchMedia("(max-width: 676px)").matches;
  const frames = mobile
    ? [makeFrame(w, g * w), makeFrame(c, g * c)]
    : [
        makeFrame(w, g * w),
        makeFrame(w, y),
        makeFrame(c, g * c),
        makeFrame(c, y),
        makeFrame(c, g * c + H),
        makeFrame(c, y + H),
      ];
  const inW = w;
  const outW = c;
  const I: Bounds = { x0: -1e9, x1: 1e9, y0: -1e9, y1: 1e9 };
  const U: Bounds = { x0: 1e9, x1: -1e9, y0: 1e9, y1: -1e9 };
  frames.forEach((S) => {
    I.x0 = Math.max(I.x0, S.x);
    I.x1 = Math.min(I.x1, S.x + S.w);
    I.y0 = Math.max(I.y0, S.y);
    I.y1 = Math.min(I.y1, S.y + S.h);
    U.x0 = Math.min(U.x0, S.x);
    U.x1 = Math.max(U.x1, S.x + S.w);
    U.y0 = Math.min(U.y0, S.y);
    U.y1 = Math.max(U.y1, S.y + S.h);
  });
  return { frames, inW, outW, I, U };
}

function contentKeepout(
  ctx: FitCtx,
  svg: SVGSVGElement,
  contentEl: HTMLElement,
  bgEl: HTMLElement | null,
): Keepout | null {
  if (window.matchMedia("(max-width: 676px)").matches) return null;
  const i = svg.getBoundingClientRect();
  if (!i.width) return null;
  let y: { left: number; top: number; right: number; bottom: number } | null = null;
  const children = contentEl.children.length ? Array.from(contentEl.children) : [contentEl];
  for (const c of children) {
    const r = c.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    y = y
      ? {
          left: Math.min(y.left, r.left),
          top: Math.min(y.top, r.top),
          right: Math.max(y.right, r.right),
          bottom: Math.max(y.bottom, r.bottom),
        }
      : { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  }
  if (!y) {
    const g = Math.min(600, i.width * 0.42);
    const t = Math.min(240, i.height * 0.42);
    y = {
      left: i.left + i.width / 2 - g / 2,
      right: i.left + i.width / 2 + g / 2,
      top: i.top + i.height / 2 - t / 2,
      bottom: i.top + i.height / 2 + t / 2,
    };
  }
  let H = 0;
  let z = 0;
  if (bgEl) {
    H = parseFloat(getComputedStyle(bgEl).marginTop) || 0;
    const prev = bgEl.style.marginTop;
    bgEl.style.marginTop = "";
    z = parseFloat(getComputedStyle(bgEl).marginTop) || 0;
    bgEl.style.marginTop = prev;
  }
  const U = i.left + i.width / 2;
  let S = 0;
  const B: Box | null = ctx.frames.reduce<Box | null>((acc, J) => {
    const off = U - J.wCss / 2;
    const top = J.wCss === ctx.inW ? i.top - H + z : i.top - H;
    const ne = {
      l: J.x + (y!.left - off) / J.scale,
      r: J.x + (y!.right - off) / J.scale,
      t: J.y + (y!.top - top) / J.scale,
      b: J.y + (y!.bottom - top) / J.scale,
    };
    S = Math.max(S, 40 / J.scale);
    return acc
      ? {
          l: Math.min(acc.l, ne.l),
          r: Math.max(acc.r, ne.r),
          t: Math.min(acc.t, ne.t),
          b: Math.max(acc.b, ne.b),
        }
      : ne;
  }, null);
  if (!B) return null;
  return { l: B.l, r: B.r, t: B.t, b: B.b, gap: S };
}

const CANDIDATE_OFFSETS = [0, 10, -10, 16, -16, 28, -28, -44];

function layout(ctx: FitCtx, keepout: Keepout | null, hubs: Hub[], tileDefs: TileDef[]): PlacedOut[] {
  const y = ctx.I;
  const x = ctx.U;
  const F = DRIFT.scale;
  const w = 14;
  const c: PlacedTile[] = [];
  const g = 12;
  const bleedCount = window.matchMedia("(max-width: 676px)").matches ? 0 : 2;
  const SPIRAL_PASSES = 6;
  const z = x.x0;
  const K = CANVAS.w - x.x1;
  const U = x.y0;
  const B = CANVAS.h - x.y1;

  const canSpill = (e: number) => e >= 8 + g;
  const halfDims = (ratio: string) => {
    const t = RATIO_SIZES[ratio];
    return { hw: (t.w * F) / 2, hh: (t.h * F) / 2 };
  };
  const bounds = (e: PlacedTile) => ({
    x0: y.x0 + e.hw + w,
    x1: y.x1 - e.hw - w,
    y0: y.y0 + e.hh + w,
    y1: y.y1 - e.hh - w,
  });
  const randPad = (e: PlacedTile) => 4 + hashId(e.id) * 24;
  const randPad2 = (e: PlacedTile) => 4 + hashId(e.id) * 16;
  const inKeepout = (e: PlacedTile) => {
    if (!keepout) return false;
    const t = e.hw + keepout.gap;
    const a = e.hh + keepout.gap;
    return e.x > keepout.l - t && e.x < keepout.r + t && e.y > keepout.t - a && e.y < keepout.b + a;
  };
  const nearKeepout = (e: PlacedTile, t: number) => {
    if (!keepout) return false;
    const a = e.hw + keepout.gap + t;
    const n = e.hh + keepout.gap + t;
    return e.x > keepout.l - a && e.x < keepout.r + a && e.y > keepout.t - n && e.y < keepout.b + n;
  };

  function resolveInKeepout(e: PlacedTile) {
    const t = bounds(e);
    const a = e.hw + 8;
    const n = e.hh + 8;
    const o = e.x;
    const l = e.y;
    let f = randPad(e);
    for (let u = 0; u < 2; u++) {
      e.x = o;
      e.y = l;
      if (e.x > t.x1) {
        e.x =
          e.x < x.x1 || !canSpill(K)
            ? t.x1 - f
            : Math.min(Math.max(e.x, x.x1 + a), CANVAS.w + e.hw - g);
      }
      if (e.x < t.x0) {
        e.x =
          e.x > x.x0 || !canSpill(z)
            ? t.x0 + f
            : Math.max(Math.min(e.x, x.x0 - a), g - e.hw);
      }
      if (e.y > t.y1) {
        e.y =
          e.y < x.y1 || !canSpill(B)
            ? t.y1 - f
            : Math.min(Math.max(e.y, x.y1 + n), CANVAS.h + e.hh - g);
      }
      if (e.y < t.y0) {
        e.y =
          e.y > x.y0 || !canSpill(U)
            ? t.y0 + f
            : Math.max(Math.min(e.y, x.y0 - n), g - e.hh);
      }
      if (!f || !inKeepout(e)) break;
      f = 0;
    }
  }

  function pullOutOfKeepout(e: PlacedTile) {
    if (!keepout) return;
    const t = e.hw + keepout.gap;
    const a = e.hh + keepout.gap;
    const outside = (fe: number, be: number, le: number) =>
      fe <= keepout!.l - t - le ||
      fe >= keepout!.r + t + le ||
      be <= keepout!.t - a - le ||
      be >= keepout!.b + a + le;
    if (!outside(e.x, e.y, 0)) {
      const o = randPad(e);
      const hub = e.hub;
      const f = e.x - hub.x;
      const u = e.y - hub.y;
      const s = Math.hypot(f, u);
      if (s > 1) {
        const E = rayBox(hub.x, hub.y, hub.box!, e.x, e.y);
        const T = Math.hypot(E.x - hub.x, E.y - hub.y) + Math.max(e.hw, e.hh) + 4;
        for (let p = s - 8; p > T; p -= 8) {
          if (outside(hub.x + (f * p) / s, hub.y + (u * p) / s, o)) {
            e.x = hub.x + (f * p) / s;
            e.y = hub.y + (u * p) / s;
            return;
          }
        }
      }
      const D = e.x - (keepout.l - t);
      const G = keepout.r + t - e.x;
      const N = e.y - (keepout.t - a);
      const Q = keepout.b + a - e.y;
      const j = Math.min(D, G, N, Q);
      const ie = 4 + hashId(e.id) * 16 + o;
      if (j === G) e.x = keepout.r + t + ie;
      else if (j === D) e.x = keepout.l - t - ie;
      else if (j === Q) e.y = keepout.b + a + ie;
      else e.y = keepout.t - a - ie;
    }
  }

  function avoidHubBoxes(e: PlacedTile) {
    for (const t of hubs) {
      if (!t.box) continue;
      const n = e.hw + 6;
      const o = e.hh + 6;
      if (e.x <= t.box.l - n || e.x >= t.box.r + n || e.y <= t.box.t - o || e.y >= t.box.b + o) continue;
      const l = e.x - (t.box.l - n);
      const f = t.box.r + n - e.x;
      const u = e.y - (t.box.t - o);
      const s = t.box.b + o - e.y;
      const E = Math.min(l, f, u, s);
      const T = 2 + hashId(e.id) * 10;
      if (E === l) e.x = t.box.l - n - T;
      else if (E === f) e.x = t.box.r + n + T;
      else if (E === u) e.y = t.box.t - o - T;
      else e.y = t.box.b + o + T;
    }
  }

  function nearHubBox(e: PlacedTile) {
    for (const t of hubs) {
      if (!t.box) continue;
      const n = e.hw + 6;
      const o = e.hh + 6;
      if (e.x <= t.box.l - n || e.x >= t.box.r + n || e.y <= t.box.t - o || e.y >= t.box.b + o) continue;
      return true;
    }
    return false;
  }

  function overlaps(e: PlacedTile, t?: PlacedTile) {
    for (const n of c) {
      if (n === t) continue;
      const o = Math.abs(e.x - n.x);
      const l = Math.abs(e.y - n.y);
      const f = Math.max(e.hw, e.hh) + Math.max(n.hw, n.hh) + 16;
      const u = e.hw + n.hw + 8;
      const s = e.hh + n.hh + 8;
      if (Math.hypot(o, l) < f || (o < u && l < s)) return n;
    }
    return null;
  }

  function tightOverlap(e: PlacedTile, t?: PlacedTile) {
    for (const n of c) {
      if (n === t) continue;
      const o = Math.abs(e.x - n.x);
      const l = Math.abs(e.y - n.y);
      const f = e.hw + n.hw + 7;
      const u = e.hh + n.hh + 7;
      if (o < f && l < u) return n;
    }
    return null;
  }

  function clampToBounds(e: PlacedTile, t?: PlacedTile) {
    const a = 2 * Math.max(e.hw, e.hh) + 16;
    const n = randPad2(e);
    const o = Math.abs(e.x - x.x0);
    const l = Math.abs(x.x1 - e.x);
    const f = Math.abs(e.y - x.y0);
    const u = Math.abs(x.y1 - e.y);
    const s = [
      { d: l, ok: canSpill(K), ax: "x", at: Math.min(x.x1 + e.hw + 8 + n, CANVAS.w + e.hw - g) },
      { d: o, ok: canSpill(z), ax: "x", at: Math.max(x.x0 - e.hw - 8 - n, g - e.hw) },
      { d: u, ok: canSpill(B), ax: "y", at: Math.min(x.y1 + e.hh + 8 + n, CANVAS.h + e.hh - g) },
      { d: f, ok: canSpill(U), ax: "y", at: Math.max(x.y0 - e.hh - 8 - n, g - e.hh) },
    ]
      .filter((le) => le.ok)
      .sort((le, ne) => le.d - ne.d);
    for (const T of s) {
      const p = T.ax === "x" ? e.hh + 4 : e.hw + 4;
      const D = T.ax === "x" ? CANVAS.h - e.hh - 4 : CANVAS.w - e.hw - 4;
      const G = Math.min(Math.max(T.ax === "x" ? e.y : e.x, p), D);
      let N = (T.ax === "x" ? g - e.hw : g - e.hh) + hashId(e.id) * 5;
      N = (T.ax === "x" ? T.at < CANVAS.w / 2 : T.at < CANVAS.h / 2) ? N : (T.ax === "x" ? CANVAS.w : CANVAS.h) - N;
      const Q = a / 3;
      for (let j = 0; Math.ceil(j / 2) * Q <= D - p; j++) {
        const ie = G + Math.ceil(j / 2) * Q * (j % 2 ? -1 : 1);
        if (ie < p || ie > D) continue;
        for (let fe = 0; fe < 2; fe++) {
          const be = fe ? N : T.at;
          if (fe && Math.abs(be - T.at) < 8) break;
          if (T.ax === "x") {
            e.x = be;
            e.y = ie;
          } else {
            e.x = ie;
            e.y = be;
          }
          if (!tightOverlap(e, t)) return;
        }
      }
    }
    spiralSearch(e, t);
  }

  function spiralSearch(e: PlacedTile, t?: PlacedTile) {
    const a = bounds(e);
    if (a.x0 > a.x1 || a.y0 > a.y1) return;
    const hub = e.hub;
    const o = Math.atan2(e.y - hub.y, e.x - hub.x) || hashId(e.id) * Math.PI * 2;
    const l = 2 * Math.max(e.hw, e.hh) + 16;
    const f = rayBox(hub.x, hub.y, hub.box!, e.x, e.y);
    const u = Math.hypot(f.x - hub.x, f.y - hub.y) + Math.max(e.hw, e.hh) + 4;
    const s: PlacedTile = {
      hub,
      hub2: e.hub2,
      id: e.id,
      ratio: e.ratio,
      hw: e.hw,
      hh: e.hh,
      x: 0,
      y: 0,
    };
    const ok = (pass: number) => {
      if (s.x < a.x0 || s.x > a.x1 || s.y < a.y0 || s.y > a.y1) return false;
      if (pass === 2) {
        if (!validPos(s, t)) return false;
        const rp = rayBox(hub.x, hub.y, hub.box!, s.x, s.y);
        return !hitsKeepout(rp.x, rp.y, s.x, s.y, keepout);
      }
      return pass === 1 ? validPos(s, t, true) : !inKeepout(s) && !nearHubBox(s) && !tightOverlap(s, t);
    };
    const T = u + randPad(e) + l * SPIRAL_PASSES;
    for (let p = 2; p >= 0; p--) {
      for (let D = u + randPad(e); D <= T; D += l * 0.6) {
        for (let G = Math.max((l * 0.5) / D, Math.PI / 60), N = 0; N <= Math.PI; N += G) {
          for (let Q = 0; Q < (N ? 2 : 1); Q++) {
            const j = o + (Q ? -N : N) + hashId(e.id) * 0.05;
            s.x = hub.x + Math.cos(j) * D;
            s.y = hub.y + Math.sin(j) * D;
            if (ok(p)) {
              e.x = s.x;
              e.y = s.y;
              return;
            }
          }
        }
      }
    }
  }

  function clampToFit(e: PlacedTile) {
    const t = bounds(e);
    if (e.x >= t.x0 && e.x <= t.x1 && e.y >= t.y0 && e.y <= t.y1) return;
    const a = e.hub;
    const n = e.x - a.x;
    const o = e.y - a.y;
    let l = 0;
    let f = 1;
    let u: number;
    let s: number;
    let E: number;
    if (n) {
      u = (t.x0 - a.x) / n;
      s = (t.x1 - a.x) / n;
      if (u > s) {
        E = u;
        u = s;
        s = E;
      }
      l = Math.max(l, u);
      f = Math.min(f, s);
    } else if (a.x < t.x0 || a.x > t.x1) l = 2;
    if (o) {
      u = (t.y0 - a.y) / o;
      s = (t.y1 - a.y) / o;
      if (u > s) {
        E = u;
        u = s;
        s = E;
      }
      l = Math.max(l, u);
      f = Math.min(f, s);
    } else if (a.y < t.y0 || a.y > t.y1) l = 2;
    if (l <= f) {
      const T = Math.hypot(n, o) || 1;
      const p = Math.max(l, f - randPad(e) / T);
      e.x = a.x + n * p;
      e.y = a.y + o * p;
      if (p < f && inKeepout(e)) {
        e.x = a.x + n * f;
        e.y = a.y + o * f;
      }
    } else {
      const D = randPad(e);
      const G = Math.min(Math.max(e.x, t.x0), t.x1);
      const N = Math.min(Math.max(e.y, t.y0), t.y1);
      e.x = Math.min(Math.max(e.x, t.x0 + D), t.x1 - D);
      e.y = Math.min(Math.max(e.y, t.y0 + D), t.y1 - D);
      if (inKeepout(e)) {
        e.x = G;
        e.y = N;
      }
    }
  }

  function settle(e: PlacedTile, inFit: boolean) {
    if (inFit) clampToFit(e);
    else resolveInKeepout(e);
    pullOutOfKeepout(e);
    avoidHubBoxes(e);
    pullOutOfKeepout(e);
    if (inFit) clampToFit(e);
    else resolveInKeepout(e);
  }

  function inFit(e: PlacedTile, t: number, a: number) {
    const n = bounds(e);
    return t >= n.x0 && t <= n.x1 && a >= n.y0 && a <= n.y1;
  }

  function bleedPlace(e: PlacedTile) {
    const t = e.hub;
    const a = t.x;
    const n = CANVAS.w - t.x;
    const o = t.y;
    const l = CANVAS.h - t.y;
    const f = Math.min(a, n, o, l);
    const u = f === a || f === n;
    const s = f === a ? 0 : f === n ? CANVAS.w : t.x;
    const E = f === o ? 0 : f === l ? CANVAS.h : t.y;
    const T = 2 * Math.max(e.hw, e.hh) + 16;
    const p = (u ? e.hh : e.hw) + 4;
    const D = (u ? CANVAS.h : CANVAS.w) - p;
    const G = Math.min(Math.max(u ? E : s, p), D);
    for (let N = 0; Math.ceil(N / 2) * (T / 2) <= D - p; N++) {
      const Q = Math.min(Math.max(G + (Math.ceil(N / 2) * (T / 2)) * (N % 2 ? -1 : 1), p), D);
      if (u) {
        e.x = s;
        e.y = Q;
      } else {
        e.x = Q;
        e.y = E;
      }
      if (!tightOverlap(e) && !nearHubBox(e)) return;
    }
    if (u) {
      e.x = s;
      e.y = G;
    } else {
      e.x = G;
      e.y = E;
    }
  }

  function place(def: TileDef, t: Hub, a: Hub | null, n: number, o: number) {
    const dim = halfDims(def.ratio);
    let f: PlacedTile = {
      hub: t,
      hub2: a,
      id: def.id,
      ratio: def.ratio,
      hw: dim.hw,
      hh: dim.hh,
      x: n,
      y: o,
      bleed: !!bleedMap[def.id],
    };
    if (f.bleed) {
      bleedPlace(f);
      f.memberIn = false;
      c.push(f);
      return;
    }
    const memberIn = inFit(f, n, o);
    const ang = Math.atan2(f.y - t.y, f.x - t.x);
    const r = rayBox(t.x, t.y, t.box!, f.x, f.y);
    const minDist = Math.hypot(r.x - t.x, r.y - t.y) + Math.max(f.hw, f.hh) + 4;
    let dist = Math.hypot(f.x - t.x, f.y - t.y);
    const pad = randPad(f);
    while (nearKeepout(f, pad) && dist - 8 > minDist) {
      dist -= 8;
      f.x = t.x + Math.cos(ang) * dist;
      f.y = t.y + Math.sin(ang) * dist;
    }
    settle(f, memberIn);
    const step = 2 * Math.max(f.hw, f.hh) + 16;
    for (let N = 0; N < 24 && overlaps(f); N++) {
      const q = Math.max(Math.hypot(f.x - t.x, f.y - t.y), minDist);
      const j = (step / q) * ((N >> 1) + 1) * (N % 2 ? -1 : 1);
      const ie = q + (N > 15 ? ((N - 15) * step) / 3 : 0);
      f.x = t.x + Math.cos(ang + j) * ie;
      f.y = t.y + Math.sin(ang + j) * ie;
      settle(f, memberIn);
    }
    if (overlaps(f)) {
      const fan = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8];
      const base = Math.max(Math.hypot(f.x - t.x, f.y - t.y), minDist);
      outer: for (let le = 0; le < 5; le++) {
        for (let ne = 0; ne < fan.length; ne++) {
          const st = ang + (fan[ne] * Math.PI) / 8;
          const cand: PlacedTile = {
            hub: t,
            hub2: a,
            id: f.id,
            ratio: f.ratio,
            hw: f.hw,
            hh: f.hh,
            x: t.x + Math.cos(st) * (base + le * step),
            y: t.y + Math.sin(st) * (base + le * step),
          };
          settle(cand, memberIn);
          if (!overlaps(cand) && !inKeepout(cand)) {
            f = cand;
            break outer;
          }
        }
      }
    }
    if (overlaps(f)) {
      if (memberIn) spiralSearch(f);
      if (overlaps(f)) clampToBounds(f);
    }
    if (inKeepout(f)) clampToBounds(f);
    if (nearHubBox(f)) clampToBounds(f);
    f.memberIn = memberIn;
    c.push(f);
  }

  const W = Math.PI * (3 - Math.sqrt(5));
  const byId: Record<string, Hub> = {};
  hubs.forEach((h) => {
    byId[h.id] = h;
  });
  const hubOrder: Record<string, number> = {};
  const perHub: Record<string, { order: number[]; phase: number }> = {};
  hubs.forEach((h, t) => {
    let a = 0;
    tileDefs.forEach((E) => {
      if (E.themes.length === 1 && E.themes[0] === h.id) a++;
    });
    const n: number[] = [];
    for (let o = 0; o < a; o++) n.push(o);
    let phase = t * 1.3;
    if (DENSITY.seed) {
      const f = mulberry(Math.round(DENSITY.seed) * 1e3 + t);
      for (let o = a - 1; o > 0; o--) {
        const u = Math.floor(f() * (o + 1));
        const s = n[o];
        n[o] = n[u];
        n[u] = s;
      }
      phase += f() * Math.PI * 2;
    }
    perHub[h.id] = { order: n, phase };
    hubOrder[h.id] = 0;
  });
  const bleedMap: Record<string, boolean> = {};
  {
    const grouped: Record<string, { id: string; i: number }[]> = {};
    const pos: Record<string, number> = {};
    hubs.forEach((h) => {
      grouped[h.id] = [];
      pos[h.id] = 0;
    });
    tileDefs.forEach((a) => {
      if (a.themes.length === 1) {
        const n = a.themes[0];
        const o = perHub[n].order[pos[n]++];
        if (a.image) grouped[n].push({ id: a.id, i: o });
      }
    });
    hubs.forEach((h) => {
      grouped[h.id].sort((o, l) => l.i - o.i);
      for (let n = 0; n < bleedCount && n < grouped[h.id].length; n++) bleedMap[grouped[h.id][n].id] = true;
    });
  }
  const crossKey = (themes: string[]) => themes.slice().sort().join("+");
  const crossCounts: Record<string, number> = {};
  const crossPos: Record<string, number> = {};
  tileDefs.forEach((e) => {
    if (e.themes.length > 1) {
      const t = crossKey(e.themes);
      crossCounts[t] = (crossCounts[t] || 0) + 1;
    }
  });
  tileDefs.forEach((e) => {
    const t = byId[e.themes[0]];
    if (e.themes.length > 1) {
      const a = byId[e.themes[1]];
      const key = crossKey(e.themes);
      const total = crossCounts[key] || 1;
      const l = crossPos[key] || 0;
      crossPos[key] = l + 1;
      if (!e.image) return;
      const f = (t.x + a.x) / 2;
      const u = (t.y + a.y) / 2;
      const s = Math.hypot(a.x - t.x, a.y - t.y) || 1;
      const E = (a.x - t.x) / s;
      const T = (a.y - t.y) / s;
      const p = l - (total - 1) / 2;
      const D = l % 2 ? 46 : -46;
      place(e, t, a, f - T * p * 120 + E * D, u + E * p * 120 + T * D);
    } else {
      const G = perHub[e.themes[0]];
      const N = G.order[hubOrder[e.themes[0]]++];
      if (!e.image) return;
      const Q = N * W + G.phase;
      const j = 106 + 46 * Math.sqrt(N);
      place(e, t, null, t.x + Math.cos(Q) * j, t.y + Math.sin(Q) * j);
    }
  });

  function sameRay(e: PlacedTile, t: PlacedTile, a: Hub) {
    return (
      (Math.abs(e.x - t.x) < 6 && (e.y - a.y) * (t.y - a.y) > 0) ||
      (Math.abs(e.y - t.y) < 6 && (e.x - a.x) * (t.x - a.x) > 0)
    );
  }

  function inFitBox(e: { x: number; y: number }) {
    return e.x >= y.x0 && e.x <= y.x1 && e.y >= y.y0 && e.y <= y.y1;
  }

  function crossAxis(e: PlacedTile, t: PlacedTile | undefined) {
    if (!inFitBox(e)) return false;
    const a: PlacedTile[] = [];
    for (let n = 0; n < c.length; n++) {
      const l = c[n];
      if (l === t || l.hub2 || !inFitBox(l)) continue;
      if (Math.abs(l.x - e.x) < 6 || Math.abs(l.y - e.y) < 6) a.push(l);
    }
    for (let n = 0; n < a.length; n++) {
      for (let o = n + 1; o < a.length; o++) {
        if (
          Math.max(a[n].x, a[o].x, e.x) - Math.min(a[n].x, a[o].x, e.x) < 6 ||
          Math.max(a[n].y, a[o].y, e.y) - Math.min(a[n].y, a[o].y, e.y) < 6
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function validPos(e: PlacedTile, t: PlacedTile | undefined, lax?: boolean) {
    if (inKeepout(e) || (lax ? tightOverlap(e, t) : overlaps(e, t)) || nearHubBox(e)) return false;
    for (const o of c) {
      if (!(o === t || o.hub2 || o.bleed || o.hub !== e.hub) && sameRay(e, o, e.hub)) return false;
    }
    return !crossAxis(e, t);
  }

  function shiftCandidate(e: PlacedTile, t: number, a: number, n: ((p: PlacedTile) => boolean) | null) {
    const o = e.hub;
    const l = Math.atan2(e.y - o.y, e.x - o.x);
    const f = Math.hypot(e.x - o.x, e.y - o.y);
    for (let u = -1; u < t; u++) {
      const s = u < 0 ? l : l + ((u >> 1) + 1) * a * (u % 2 ? -1 : 1);
      for (let E = 0; E < CANDIDATE_OFFSETS.length; E++) {
        if (u < 0 && !CANDIDATE_OFFSETS[E]) continue;
        const T = f + CANDIDATE_OFFSETS[E];
        if (T < 40) continue;
        const p: PlacedTile = {
          hub: o,
          hub2: e.hub2,
          id: e.id,
          ratio: e.ratio,
          hw: e.hw,
          hh: e.hh,
          x: o.x + Math.cos(s) * T,
          y: o.y + Math.sin(s) * T,
        };
        settle(p, e.memberIn || false);
        if (validPos(p, e) && (!n || n(p))) {
          e.x = p.x;
          e.y = p.y;
          return true;
        }
      }
    }
    return false;
  }

  function deoverlap() {
    for (let e = 0; e < 3; e++) {
      let moved = false;
      for (let a = 0; a < c.length; a++) {
        for (let n = a + 1; n < c.length; n++) {
          const o = c[a];
          const l = c[n];
          if (o.hub2 || l.hub2 || o.bleed || l.bleed || o.hub !== l.hub || !sameRay(o, l, o.hub)) continue;
          const hub = o.hub;
          const farther = Math.hypot(o.x - hub.x, o.y - hub.y) >= Math.hypot(l.x - hub.x, l.y - hub.y) ? o : l;
          const other = farther === o ? l : o;
          for (let E = 0; E < 2; E++) {
            if (shiftCandidate(E === 0 ? farther : other, 12, Math.PI / 60, null)) {
              moved = true;
              break;
            }
          }
        }
      }
      if (!moved) break;
    }
  }

  function stillOverlap() {
    for (let e = 0; e < c.length; e++) {
      for (let t = e + 1; t < c.length; t++) {
        const a = c[e];
        const n = c[t];
        if (a.hub2 || n.hub2 || a.bleed || n.bleed || a.hub !== n.hub || !sameRay(a, n, a.hub)) continue;
        return true;
      }
    }
    return false;
  }

  function axisGroups(e: "x" | "y") {
    const t = c
      .filter((o) => !o.hub2 && !o.bleed && inFitBox(o))
      .sort((o, l) => o[e] - l[e]);
    const a: PlacedTile[][] = [];
    for (let n = 0; n + 2 < t.length; n++) {
      if (t[n + 2][e] - t[n][e] < 6) a.push([t[n + 1], t[n], t[n + 2]]);
    }
    return a;
  }

  function unify(e: "x" | "y") {
    let tried: PlacedTile[] = [];
    for (let a = 0; a < 12; a++) {
      const n = axisGroups(e);
      if (!n.length) return;
      let done = false;
      for (let l = 0; l < n.length && !done; l++) {
        for (let f = 0; f < 3 && !done; f++) {
          const u = n[l][f];
          if (tried.indexOf(u) === -1) {
            if (shiftCandidate(u, 32, Math.PI / 45, null)) done = true;
            else tried.push(u);
          }
        }
      }
      if (!done) return;
      tried = [];
    }
  }

  const AXIS_EPS = (Math.PI * 13) / 180;
  const AXIS_FRAC = 0.3;

  function axisFraction(e: PlacedTile | null, t: { x: number; y: number } | null) {
    const a: { hub: Hub; x: number; y: number; ref: PlacedTile }[] = [];
    for (let n = 0; n < c.length; n++) {
      const l = c[n];
      if (l.hub2 || l.bleed) continue;
      const f = l === e ? t!.x : l.x;
      const u = l === e ? t!.y : l.y;
      if (inFitBox({ x: f, y: u })) a.push({ hub: l.hub, x: f, y: u, ref: l });
    }
    let s = 0;
    let E = 0;
    const T: PlacedTile[] = [];
    for (let n = 0; n < a.length; n++) {
      let p = Infinity;
      let D = -1;
      for (let o = 0; o < a.length; o++) {
        if (o === n || a[o].hub !== a[n].hub) continue;
        const G = Math.hypot(a[o].x - a[n].x, a[o].y - a[n].y);
        if (G < p) {
          p = G;
          D = o;
        }
      }
      if (D < 0) continue;
      const N = Math.abs(Math.atan2(a[D].y - a[n].y, a[D].x - a[n].x)) % (Math.PI / 2);
      E++;
      if (Math.min(N, Math.PI / 2 - N) <= AXIS_EPS) {
        s++;
        T.push(a[n].ref);
      }
    }
    return { frac: E ? s / E : 0, offenders: T };
  }

  function straighten() {
    const tried: PlacedTile[] = [];
    let t = axisFraction(null, null);
    for (let a = 0; a < 12 && t.frac > AXIS_FRAC; ) {
      let n: PlacedTile | null = null;
      for (let o = 0; o < t.offenders.length; o++) {
        if (tried.indexOf(t.offenders[o]) === -1) {
          n = t.offenders[o];
          break;
        }
      }
      if (!n) return;
      const l = t.frac;
      const f = n;
      if (shiftCandidate(f, 16, Math.PI / 45, (u) => axisFraction(f, u).frac < l)) {
        a++;
        t = axisFraction(null, null);
      } else {
        tried.push(f);
      }
    }
  }

  function finalCleanup() {
    for (let e = 0; e < 8; e++) {
      let t: PlacedTile | null = null;
      outer: for (let a = 0; a < c.length; a++) {
        for (let n = a + 1; n < c.length; n++) {
          const o = c[a];
          const l = c[n];
          if (o.hub2 || l.hub2 || o.bleed || l.bleed || o.hub !== l.hub) continue;
          if (inFitBox(o) && inFitBox(l) && sameRay(o, l, o.hub)) {
            t =
              Math.hypot(o.x - o.hub.x, o.y - o.hub.y) >= Math.hypot(l.x - l.hub.x, l.y - l.hub.y) ? o : l;
            break outer;
          }
        }
      }
      if (!t) {
        const f = axisGroups("x");
        const u = axisGroups("y");
        t = f.length ? f[0][0] : u.length ? u[0][0] : null;
      }
      if (!t) return;
      if (!shiftCandidate(t, 32, Math.PI / 45, null)) clampToBounds(t, t);
    }
  }

  for (let ut = 0; ut < 3; ut++) {
    deoverlap();
    straighten();
    unify("x");
    unify("y");
    if (!stillOverlap() && !axisGroups("x").length && !axisGroups("y").length) break;
  }
  straighten();
  finalCleanup();

  return c.map((e) => {
    const t = RATIO_SIZES[e.ratio];
    return {
      id: e.id,
      hubId: e.hub.id,
      hub2Id: e.hub2 ? e.hub2.id : null,
      x: e.x,
      y: e.y,
      w: t.w,
      h: t.h,
      bleed: !!e.bleed,
    };
  });
}

export function buildNet(svg: SVGSVGElement, bgEl: HTMLElement, contentEl: HTMLElement, hubLines: HubLines): Net {
  const ctx = fitBounds(svg);
  svg.setAttribute("viewBox", `0 0 ${CANVAS.w} ${CANVAS.h}`);
  const keepout = contentKeepout(ctx, svg, contentEl, bgEl);
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const defs = makeEl("defs", {});
  svg.appendChild(defs);

  const TILE_IMG: Record<string, string> = {
    "k0": "/images/hard-questions/t00-neural-network.jpg",
    "k1": "/images/hard-questions/t01-deep-learning.jpg",
    "k2": "/images/hard-questions/t02-ai-perception.jpg",
    "k3": "/images/hard-questions/t03-ai-brain.jpg",
    "k4": "/images/hard-questions/t04-computer-vision.jpg",
    "k5": "/images/hard-questions/t05-big-data.jpg",
    "k6": "/images/hard-questions/t06-language-nlp.jpg",
    "k7": "/images/hard-questions/t07-generative-ai.jpg",
    "k8": "/images/hard-questions/t08-prediction.jpg",
    "k9": "/images/hard-questions/t09-agent-chat.jpg",
    "k10": "/images/hard-questions/t10-digital-twin.jpg",
    "k11": "/images/hard-questions/t11-knowledge-graph.jpg",
    "k12": "/images/hard-questions/t12-automation.jpg",
    "k13": "/images/hard-questions/t13-decision-dashboard.jpg",
    "k14": "/images/hard-questions/t14-precision-agri.jpg",
    "k15": "/images/hard-questions/t15-autonomous-mobility.jpg",
    "k16": "/images/hard-questions/t16-medical-ai.jpg",
    "k17": "/images/hard-questions/t17-mobile-payment.jpg",
    "k18": "/images/hard-questions/t18-smart-home.jpg",
    "k19": "/images/hard-questions/t19-logistics.jpg",
    "k20": "/images/hard-questions/t20-smart-factory.jpg",
    "k21": "/images/hard-questions/t21-customer-service.jpg",
    "k22": "/images/hard-questions/t22-law-regulation.jpg",
    "k23": "/images/hard-questions/t23-transparency.jpg",
    "k24": "/images/hard-questions/t24-audit.jpg",
    "k25": "/images/hard-questions/t25-alignment.jpg",
    "k26": "/images/hard-questions/t26-ethics.jpg",
    "k27": "/images/hard-questions/t27-data-protection.jpg",
    "k28": "/images/hard-questions/t28-sovereignty.jpg",
    "k29": "/images/hard-questions/t29-standards.jpg",
    "k30": "/images/hard-questions/t30-oversight.jpg",
    "k31": "/images/hard-questions/t31-stock-market.jpg",
    "k32": "/images/hard-questions/t32-banking.jpg",
    "k33": "/images/hard-questions/t33-money-currency.jpg",
    "k34": "/images/hard-questions/t34-trading.jpg",
    "k35": "/images/hard-questions/t35-investment.jpg",
    "k36": "/images/hard-questions/t36-labor-jobs.jpg",
    "k37": "/images/hard-questions/t37-startup.jpg",
    "k38": "/images/hard-questions/t38-education.jpg",
    "k39": "/images/hard-questions/t39-work.jpg",
    "k40": "/images/hard-questions/t40-health.jpg",
    "k41": "/images/hard-questions/t41-democracy.jpg",
    "k42": "/images/hard-questions/t42-inequality.jpg",
    "k43": "/images/hard-questions/t43-energy.jpg",
    "k44": "/images/hard-questions/t44-climate.jpg",
    "k45": "/images/hard-questions/t45-diversity.jpg",
    "k46": "/images/hard-questions/t46-privacy-surveillance.jpg",
    "k47": "/images/hard-questions/t47-cities.jpg",
    "k48": "/images/hard-questions/t48-agriculture.jpg",
    "k49": "/images/hard-questions/t49-mobility.jpg",
    "k50": "/images/hard-questions/t50-communication.jpg",
    "k51": "/images/hard-questions/t51-creativity.jpg",
    "k52": "/images/hard-questions/t52-family.jpg",
    "k53": "/images/hard-questions/t53-security.jpg",
    "k54": "/images/hard-questions/t54-media.jpg",
    "k55": "/images/hard-questions/t55-ug-regulation.jpg",
    "k56": "/images/hard-questions/t56-is-human-robot.jpg",
    "k57": "/images/hard-questions/t57-is-vr-tech.jpg",
    "k58": "/images/hard-questions/t58-is-edu-tech.jpg",
    "k59": "/images/hard-questions/t59-is-health-tech.jpg",
    "k60": "/images/hard-questions/t60-eg-digital-currency.jpg",
    "k61": "/images/hard-questions/t61-eg-crypto-analytics.jpg",
    "k62": "/images/hard-questions/t62-eg-fintech.jpg",
    "k63": "/images/hard-questions/t63-eg-market-crisis.jpg",
    "k64": "/images/hard-questions/t64-es-money-exchange.jpg",
    "k65": "/images/hard-questions/t65-es-money-transfer.jpg",
    "k66": "/images/hard-questions/t66-es-money-hand.jpg",
    "k67": "/images/hard-questions/t67-es-living-wage.jpg",
  };
  const addTileImage = (rect: { x: number; y: number; width: number; height: number }, src: string, clipId: string) => {
    const clip = makeEl("clipPath", { id: clipId });
    clip.appendChild(
      makeEl("rect", {
        x: String(rect.x),
        y: String(rect.y),
        width: String(rect.width),
        height: String(rect.height),
        rx: "2",
      }),
    );
    defs.appendChild(clip);
    const im = makeEl("image", {
      href: src,
      x: String(rect.x),
      y: String(rect.y),
      width: String(rect.width),
      height: String(rect.height),
      preserveAspectRatio: "xMidYMid slice",
      "clip-path": "url(#" + clipId + ")",
    });
    rectsG.appendChild(im);
    return im;
  };

  const linesG = makeEl("g", {});
  const rectsG = makeEl("g", {});
  const labelsG = makeEl("g", {});
  svg.appendChild(linesG);
  svg.appendChild(rectsG);
  svg.appendChild(labelsG);

  const hubs: Hub[] = HUB_IDS.map((id, i) => ({
    id,
    lines: [hubLines[i].first, hubLines[i].second],
    x: HUB_POS[i][0],
    y: HUB_POS[i][1],
    x0: HUB_POS[i][0],
    y0: HUB_POS[i][1],
  }));
  const byId: Record<string, Hub> = {};
  hubs.forEach((r) => {
    byId[r.id] = r;
    const d = makeEl("text", { class: "ktve-hub", "text-anchor": "middle" });
    for (let i = 0; i < r.lines.length; i++) {
      const t = makeEl("tspan", { class: "ktve-hub-title", x: String(r.x), y: String(r.y - 5 + i * 24) });
      t.textContent = r.lines[i];
      d.appendChild(t);
    }
    labelsG.appendChild(d);
    r.el = d;
  });
  hubs.forEach((r) => {
    const b = r.el!.getBBox();
    r.box = { l: b.x - 12, r: b.x + b.width + 12, t: b.y - 8, b: b.y + b.height + 8 };
  });
  if (keepout) {
    hubs.forEach((r) => {
      const b = r.box!;
      if (b.b < keepout.t - keepout.gap || b.t > keepout.b + keepout.gap || b.l >= keepout.r + keepout.gap || b.r <= keepout.l - keepout.gap) return;
      const d = ctx.frames[0];
      const R = ctx.frames[1];
      const A = Math.max(d.x, R.x);
      const P = Math.min(d.x + d.w, R.x + R.w);
      const V = Math.max(d.y, R.y);
      const Bb = Math.min(d.y + d.h, R.y + R.h);
      const m = CANVAS.w / 2;
      const Y = r.x < m;
      const k = [
        { dx: keepout.l - keepout.gap - b.r, dy: 0 },
        { dx: keepout.r + keepout.gap - b.l, dy: 0 },
        { dx: 0, dy: keepout.t - keepout.gap - b.b },
        { dx: 0, dy: keepout.b + keepout.gap - b.t },
      ].filter((M) => M.dx === 0 || (r.x + M.dx < m) === Y);
      const re = k.filter((M) =>
        M.dx < 0 ? b.l + M.dx >= A : M.dx > 0 ? b.r + M.dx <= P : M.dy < 0 ? b.t + M.dy >= V : b.b + M.dy <= Bb,
      );
      const Ie = re.filter((M) => M.dx !== 0);
      const ue = (Ie.length ? Ie : re.length ? re : k).reduce((min, M) =>
        Math.abs(M.dx + M.dy) < Math.abs(min.dx + min.dy) ? M : min,
      );
      r.x += ue.dx;
      b.l += ue.dx;
      b.r += ue.dx;
      r.y += ue.dy;
      b.t += ue.dy;
      b.b += ue.dy;
      let v = 0;
      let W = r.el!.firstChild as SVGElement | null;
      while (W) {
        W.setAttribute("x", String(r.x));
        W.setAttribute("y", String(r.y - 5 + v * 24));
        W = W.nextSibling as SVGElement | null;
        v++;
      }
    });
  }
  const MARGIN_TOP = 8;
  const MARGIN_BOTTOM = 84;
  const bottomLimit = Math.min(ctx.frames[0].y + ctx.frames[0].h, ctx.frames[1].y + ctx.frames[1].h);
  hubs.forEach((r) => {
    let d = Math.max(0, r.box!.b - (bottomLimit - MARGIN_TOP));
    let R = r.box!.b - d - (bottomLimit - MARGIN_BOTTOM);
    if (R > 0 && keepout && r.box!.t - d > keepout.b) {
      R = Math.min(R, r.box!.t - d - (keepout.b + keepout.gap));
    }
    if (R > 0) d += R;
    if (d <= 0) return;
    r.y -= d;
    r.box!.t -= d;
    r.box!.b -= d;
    let A = 0;
    let P = r.el!.firstChild as SVGElement | null;
    while (P) {
      P.setAttribute("y", String(r.y - 5 + A * 24));
      P = P.nextSibling as SVGElement | null;
      A++;
    }
  });
  const topLimit = ctx.I.y0;
  hubs.forEach((r) => {
    let d = Math.max(0, topLimit + MARGIN_TOP - r.box!.t);
    if (d > 0 && keepout && r.box!.b < keepout.t && r.box!.r > keepout.l && r.box!.l < keepout.r) {
      d = Math.min(d, keepout.t - r.box!.b);
    }
    if (d <= 0) return;
    r.y += d;
    r.box!.t += d;
    r.box!.b += d;
    let A = 0;
    let P = r.el!.firstChild as SVGElement | null;
    while (P) {
      P.setAttribute("y", String(r.y - 5 + A * 24));
      P = P.nextSibling as SVGElement | null;
      A++;
    }
  });
  hubs.forEach((r) => {
    const pairs = [
      { L: ctx.I.x0, R: ctx.I.x1 },
      {
        L: Math.max(ctx.frames[0].x, ctx.frames[1].x),
        R: Math.min(ctx.frames[0].x + ctx.frames[0].w, ctx.frames[1].x + ctx.frames[1].w),
      },
    ];
    let shown = false;
    for (const pair of pairs) {
      const P = pair.L;
      const V = pair.R;
      const b = r.box!.l < P + MARGIN_TOP ? P + MARGIN_TOP - r.box!.l : r.box!.r > V - MARGIN_TOP ? V - MARGIN_TOP - r.box!.r : 0;
      const m = CANVAS.w / 2;
      const fits = r.box!.r - r.box!.l <= V - P - 2 * MARGIN_TOP;
      const ok = fits && (b === 0 || (keepout ? (r.x + b < m) === (r.x < m) && (r.box!.b <= keepout.t - keepout.gap + 0.5 || r.box!.t >= keepout.b + keepout.gap - 0.5 || r.box!.r + b <= keepout.l - keepout.gap || r.box!.l + b >= keepout.r + keepout.gap) : true));
      if (ok) {
        if (b !== 0) {
          r.x += b;
          r.box!.l += b;
          r.box!.r += b;
          let k = r.el!.firstChild as SVGElement | null;
          while (k) {
            k.setAttribute("x", String(r.x));
            k = k.nextSibling as SVGElement | null;
          }
        }
        shown = true;
        break;
      }
    }
    r.el!.style.display = shown ? "" : "none";
  });

  hubs.forEach((v) => {
    v.lineRel = [];
    let W = v.el!.firstChild as SVGGraphicsElement | null;
    while (W) {
      let M: SVGRect | null = null;
      try {
        M = W.getBBox();
      } catch {
        M = null;
      }
      if (M && M.width) {
        v.lineRel.push({ l: M.x - v.x, r: M.x + M.width - v.x, t: M.y - v.y, b: M.y + M.height - v.y });
      }
      W = W.nextSibling as SVGGraphicsElement | null;
    }
    if (!v.lineRel.length) {
      v.lineRel.push({ l: v.box!.l - v.x, r: v.box!.r - v.x, t: v.box!.t - v.y, b: v.box!.b - v.y });
    }
  });
  const overlapMin = (v: Hub, W: number, M: number, L: Hub) => {
    let q = Infinity;
    for (const Ee of v.lineRel!) {
      for (const Me of L.lineRel!) {
        const Pe = Math.max(
          Math.max(Ee.l + W, Me.l + L.x) - Math.min(Ee.r + W, Me.r + L.x),
          Math.max(Ee.t + M, Me.t + L.y) - Math.min(Ee.b + M, Me.b + L.y),
        );
        if (Pe < q) q = Pe;
      }
    }
    return q;
  };
  const visibleHubs = () => hubs.filter((v) => v.el!.style.display !== "none");
  const canPlaceHub = (v: Hub, W: number, M: number) => {
    const L = { l: v.box!.l + W, r: v.box!.r + W, t: v.box!.t + M, b: v.box!.b + M };
    if (L.l < ctx.I.x0 + MARGIN_TOP || L.r > ctx.I.x1 - MARGIN_TOP || L.t < ctx.I.y0 + MARGIN_TOP || L.b > bottomLimit - MARGIN_TOP) return false;
    const q = CANVAS.w / 2;
    if ((W !== 0 && (v.x + W < q) !== (v.x < q)) || (keepout && !(L.b <= keepout.t - keepout.gap + 0.5 || L.t >= keepout.b + keepout.gap - 0.5 || L.r <= keepout.l - keepout.gap + 0.5 || L.l >= keepout.r + keepout.gap - 0.5))) return false;
    for (const se of visibleHubs()) {
      if (se !== v && overlapMin(v, v.x + W, v.y + M, se) < 24 - 0.5) return false;
    }
    return true;
  };
  const moveHub = (v: Hub, W: number, M: number) => {
    v.x += W;
    v.box!.l += W;
    v.box!.r += W;
    v.y += M;
    v.box!.t += M;
    v.box!.b += M;
    let L = 0;
    let q = v.el!.firstChild as SVGElement | null;
    while (q) {
      q.setAttribute("x", String(v.x));
      q.setAttribute("y", String(v.y - 5 + L * 24));
      q = q.nextSibling as SVGElement | null;
      L++;
    }
  };
  for (let V = 0; V < 10; V++) {
    const b = visibleHubs();
    let m: [Hub, Hub] | null = null;
    for (let Y = 0; Y < b.length && !m; Y++) {
      for (let k = Y + 1; k < b.length; k++) {
        if (overlapMin(b[Y], b[Y].x, b[Y].y, b[k]) < 2) {
          m = [b[Y], b[k]];
          break;
        }
      }
    }
    if (!m) break;
    let re: { m: Hub; dx: number; dy: number; cost: number } | null = null;
    for (const pair of [
      [m[0], m[1]],
      [m[1], m[0]],
    ]) {
      const W = pair[0];
      const M = pair[1];
      const opts = [
        { dx: 0, dy: M.box!.b + 24 - W.box!.t },
        { dx: 0, dy: M.box!.t - 24 - W.box!.b },
        { dx: M.box!.r + 24 - W.box!.l, dy: 0 },
        { dx: M.box!.l - 24 - W.box!.r, dy: 0 },
      ];
      for (const L of opts) {
        if (canPlaceHub(W, L.dx, L.dy)) {
          const cost = Math.abs(L.dx + L.dy);
          if (!re || cost < re.cost) re = { m: W, dx: L.dx, dy: L.dy, cost };
        }
      }
    }
    if (re) {
      moveHub(re.m, re.dx, re.dy);
      continue;
    }
    const Ie = Math.abs(m[0].x - m[0].x0) + Math.abs(m[0].y - m[0].y0);
    const ue = Math.abs(m[1].x - m[1].x0) + Math.abs(m[1].y - m[1].y0);
    (Ie >= ue ? m[0] : m[1]).el!.style.display = "none";
  }

  const tileDefs: TileDef[] = SEQUENCE.split(",").map((h, i) => ({
    id: "k" + i,
    themes: h
      .slice(0, -1)
      .split("")
      .map((ch) => THEME_KEYS[ch]),
    ratio: RATIOS[Number(h.slice(-1))],
    image: true,
  }));
  const placed = layout(ctx, keepout, hubs, tileDefs);

  const sats: Sat[] = [];
  const netLines: NetLine[] = [];
  const themeClass = (hubId: string) => "ktve-slot--" + hubId;
  const rects = placed.map((r, d) => {
    const hub = byId[r.hubId];
    const A = r.x;
    const P = r.y;
    const V = r.w * DRIFT.scale;
    const b = r.h * DRIFT.scale;
    const Y = makeEl("rect", {
      class: "ktve-slot " + themeClass(r.hubId),
      x: String(A - V / 2),
      y: String(P - b / 2),
      width: String(V),
      height: String(b),
      rx: "2",
    });
    rectsG.appendChild(Y);
    if (r.bleed) Y.setAttribute("data-bleed", "1");
    const geom = { x: A - V / 2, y: P - b / 2, width: V, height: b };
    const img = addTileImage(geom, TILE_IMG[r.id], "ktve-clip-" + r.id);
    const sat: Sat = {
      id: r.id,
      hub,
      hub2: r.hub2Id ? byId[r.hub2Id] : null,
      cx: A,
      cy: P,
      rect: Y,
      core: d % 2 === 0,
      e: 1,
      d: Math.hypot(A - CANVAS.w / 2, P - CANVAS.h / 2),
      bleed: r.bleed,
      box: { l: A - V / 2 - 4, r: A + V / 2 + 4, t: P - b / 2 - 4, b: P + b / 2 + 4 },
      delay: 0,
      lines: [],
      img,
    };
    if (r.hub2Id) {
      const Z = makeEl("rect", {
        class: "ktve-slot " + themeClass(r.hub2Id) + " ktve-slot--overlay",
        x: String(A - V / 2),
        y: String(P - b / 2),
        width: String(V),
        height: String(b),
        rx: "2",
      });
      rectsG.appendChild(Z);
      sat.overlay = Z;
    }
    return sat;
  });
  sats.push(...rects);

  const drawLine = (r: Hub, d: Box, R: number, A: number, P: Sat | undefined, V: boolean) => {
    const b = rayBox(r.x, r.y, r.box!, R, A);
    const m = rayBox(R, A, d, r.x, r.y);
    if (V && Math.hypot(m.x - b.x, m.y - b.y) > 300) return false;
    const Y = makeEl("line", {
      x1: String(b.x),
      y1: String(b.y),
      x2: String(m.x),
      y2: String(m.y),
      stroke: LINE_COLOR,
      "stroke-opacity": String(LINE_OPACITY),
      "stroke-width": "1",
    });
    linesG.appendChild(Y);
    const k: NetLine = {
      el: Y,
      x2: m.x,
      y2: m.y,
      len: Math.hypot(m.x - b.x, m.y - b.y),
      core: P ? P.core : true,
    };
    if (P) P.lines.push(k);
    netLines.push(k);
    return true;
  };
  sats.forEach((s) => {
    if (!s) return;
    if (!s.hub2) {
      drawLine(s.hub, s.box, s.cx, s.cy, s, true);
      return;
    }
    const blocked = (hub: Hub) => {
      const m = rayBox(hub.x, hub.y, hub.box!, s.cx, s.cy);
      const Y = rayBox(s.cx, s.cy, s.box, hub.x, hub.y);
      return hitsKeepout(m.x, m.y, Y.x, Y.y, keepout);
    };
    if ((s.hub.id === "using" || s.hub.id === "society") && (s.hub2.id === "using" || s.hub2.id === "society")) {
      const candidates = [s.hub, s.hub2].filter((hub) => !blocked(hub));
      const chosen = candidates.length
        ? candidates.reduce((min, hub) =>
            Math.hypot(s.cx - hub.x, s.cy - hub.y) < Math.hypot(s.cx - min.x, s.cy - min.y) ? hub : min,
          )
        : s.hub;
      drawLine(chosen, s.box, s.cx, s.cy, s, true);
      return;
    }
    const P = blocked(s.hub);
    const V = blocked(s.hub2);
    if (!P) drawLine(s.hub, s.box, s.cx, s.cy, s, true);
    if (!V) drawLine(s.hub2, s.box, s.cx, s.cy, s, true);
  });

  return {
    sats,
    labels: hubs.map((h) => h.el!),
    lines: netLines,
    coreSats: sats.filter((s) => s.core),
    bloomSats: sats
      .filter((s) => !s.core)
      .sort((a, b) => a.d - b.d),
  };
}

function resetLine(l: NetLine) {
  l.el.style.strokeDasharray = String(l.len);
  l.el.style.strokeDashoffset = String(l.len);
  l.el.style.strokeOpacity = "0";
}

export class KtveController {
  private net: Net | null = null;
  private raf = 0;
  private panelRaf = 0;
  private io: IntersectionObserver | null = null;
  private panelIo: IntersectionObserver | null = null;
  private resizeCleanup: () => void = () => {};
  private disposed = false;
  private reduced: boolean;
  private ve = 0;
  private last = 0;
  private tl = 0;
  private hasScrolledDown = false;
  private labelOp = 0;
  private lineOp = 0;
  private bloom = 0;
  private lastPanel = 0;
  private panelProgress = 0;

  constructor(
    private svg: SVGSVGElement,
    private bg: HTMLElement,
    private section: HTMLElement,
    private contentWrap: HTMLElement,
    private titleEl: HTMLElement,
  ) {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  init(hubLines: HubLines) {
    const run = () => {
      if (this.disposed) return;
      this.build(hubLines);
      this.setupPanelScrub();
      this.setupContentFade();
      if (!this.reduced) this.setupEntrance();
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }
  }

  private build(hubLines: HubLines) {
    this.net = buildNet(this.svg, this.bg, this.contentWrap, hubLines);
    if (this.net) {
      const all = [...this.net.coreSats, ...this.net.bloomSats];
      const maxD = all.reduce((m, s) => Math.max(m, s.d), 0);
      for (const s of all) s.delay = tweenPos(0.4 + 0.26 * (maxD ? s.d / maxD : 0));
    }
    if (!this.reduced && this.net) {
      for (const s of this.net.sats) s.e = 0;
      this.applyDrift();
      for (const l of this.net.labels) l.style.opacity = "0";
      for (const l of this.net.lines) resetLine(l);
      this.bloom = 0;
      this.tl = 0;
    }
  }

  private applyDrift() {
    const net = this.net;
    if (!net) return;
    const h = 6 * DRIFT.drift * this.bloom;
    net.sats.forEach((s, y) => {
      if (!s) return;
      let x = 0;
      let F = 0;
      if (h !== 0) {
        const w = 45e-5 + 8e-5 * (y % 5);
        const c = 38e-5 + 7e-5 * ((y + 2) % 6);
        const g = y * 2.399;
        x = h * Math.sin(this.ve * w + g);
        F = h * Math.sin(this.ve * c + g * 1.7);
      }
      const sc = 1.3 - 0.3 * s.e;
      const op = s.e.toFixed(3);
      if (op !== s.wOp) {
        s.wOp = op;
        s.rect.setAttribute("opacity", op);
        if (s.img) s.img.setAttribute("opacity", op);
      }
      if (s.overlay) {
        const o2 = (s.e * 0.35).toFixed(3);
        if (o2 !== s.wOp2) {
          s.wOp2 = o2;
          s.overlay.setAttribute("opacity", o2);
        }
      }
      const tr =
        "translate(" + (x + s.cx * (1 - sc)).toFixed(2) + " " + (F + s.cy * (1 - sc)).toFixed(2) + ") scale(" + sc.toFixed(4) + ")";
      if (tr !== s.wTr) {
        s.wTr = tr;
        s.rect.setAttribute("transform", tr);
        if (s.overlay) s.overlay.setAttribute("transform", tr);
        if (s.img) s.img.setAttribute("transform", tr);
      }
      s.lines.forEach((K) => {
        const U = (K.x2 + x).toFixed(2);
        const B = (K.y2 + F).toFixed(2);
        if (U !== K.wX2) {
          K.wX2 = U;
          K.el.setAttribute("x2", U);
        }
        if (B !== K.wY2) {
          K.wY2 = B;
          K.el.setAttribute("y2", B);
        }
      });
    });
  }

  private frame = () => {
    if (this.disposed) return;
    const net = this.net;
    if (!net) {
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    const now = performance.now();
    if (this.last === 0) this.last = now;
    const dtms = now - this.last;
    this.last = now;
    this.ve += dtms * DRIFT.pace;

    const vh = window.innerHeight;
    const rect = this.bg.getBoundingClientRect();
    const shouldPlay = this.hasScrolledDown && rect.top <= vh * TRIGGER_VIEW - TRIGGER_OFFSET;
    const step = dtms / 1000;
    if (shouldPlay) this.tl = Math.min(ENTRANCE_TOTAL, this.tl + step);
    else if (this.tl > 0) this.tl = Math.max(0, this.tl - step);

    const lp = easeOut(clamp01((this.tl - LABEL_DELAY) / LABEL_DUR));
    if (lp !== this.labelOp) {
      this.labelOp = lp;
      for (const l of net.labels) l.style.opacity = String(lp);
    }
    const lq = easeInOut(clamp01((this.tl - LINE_DELAY) / LINE_DUR));
    if (lq !== this.lineOp) {
      this.lineOp = lq;
      for (const l of net.lines) {
        l.el.style.strokeDashoffset = String(l.len * (1 - lq));
        l.el.style.strokeOpacity = String(LINE_OPACITY * lq);
      }
    }
    this.bloom = easeOut(clamp01((this.tl - BLOOM_DELAY) / BLOOM_DUR));
    for (const s of net.sats) {
      if (!s) continue;
      s.e = easeOut(clamp01((this.tl - s.delay) / TILE_DUR));
    }
    this.applyDrift();
    this.raf = requestAnimationFrame(this.frame);
  };

  private panelFrame = () => {
    if (this.disposed) return;
    const rect = this.section.getBoundingClientRect();
    const vh = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const target = clamp01((vh * TRIGGER_VIEW - center) / (vh * TRIGGER_VIEW - vh * 0.4));
    const now = performance.now();
    const dt = Math.min(64, now - (this.lastPanel || now));
    this.lastPanel = now;
    const k = 1 - Math.exp(-dt / 800);
    this.panelProgress += (target - this.panelProgress) * k;
    this.section.style.setProperty("--hq-progress", this.panelProgress.toFixed(4));
    this.panelRaf = requestAnimationFrame(this.panelFrame);
  };

  private setupPanelScrub() {
    const section = this.section;
    this.panelIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!this.panelRaf) this.panelRaf = requestAnimationFrame(this.panelFrame);
          } else if (this.panelRaf) {
            cancelAnimationFrame(this.panelRaf);
            this.panelRaf = 0;
          }
        });
      },
      { threshold: 0.02 },
    );
    this.panelIo.observe(section);
  }

  private setupEntrance() {
    const stage = this.svg;
    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!this.raf) {
              this.last = 0;
              this.raf = requestAnimationFrame(this.frame);
            }
          } else if (this.raf) {
            cancelAnimationFrame(this.raf);
            this.raf = 0;
          }
        });
      },
      { threshold: 0.25 },
    );
    this.io.observe(stage);

    const onScroll = () => {
      if (window.pageYOffset > 0) this.hasScrolledDown = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    this.resizeCleanup = () => window.removeEventListener("scroll", onScroll);

    let width = this.svg.getBoundingClientRect().width;
    let scheduled = false;
    const onResize = () => {
      if (scheduled || this.disposed) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const w = this.svg.getBoundingClientRect().width;
        if (Math.abs(w - width) < 1) return;
        width = w;
        const hubLines = this.buildLines;
        this.build(hubLines());
        this.tl = Math.min(this.tl, ENTRANCE_TOTAL);
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    const prevCleanup = this.resizeCleanup;
    this.resizeCleanup = () => {
      prevCleanup();
      window.removeEventListener("resize", onResize);
    };
  }

  private buildLines: () => HubLines = () => [];

  setHubLines(getter: () => HubLines) {
    this.buildLines = getter;
  }

  private setupContentFade() {
    if (!this.titleEl) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.contentWrap.classList.add("is-kt3-content-in");
            io.disconnect();
          }
        });
      },
      { rootMargin: "100% 0px -100% 0px", threshold: 0 },
    );
    io.observe(this.titleEl);
  }

  dispose() {
    this.disposed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.panelRaf) cancelAnimationFrame(this.panelRaf);
    if (this.io) this.io.disconnect();
    if (this.panelIo) this.panelIo.disconnect();
    this.resizeCleanup();
  }
}
