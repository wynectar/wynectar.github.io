import {
  _ as F,
  p as g,
  h as y,
  c as r,
  o as h,
  j as s,
  e as A,
  t as o,
  r as D,
  b,
  w as C,
  N as w,
  G as k,
  F as _,
  B as S,
  ae as E,
  a as d
} from './chunks/framework.DjAKN8N1.js';
const V = { class: 'gauge-box' },
  G = { class: 'gauge-title' },
  M = { width: '200', height: '150', viewBox: '0 0 200 150' },
  T = ['stroke', 'stroke-dasharray', 'stroke-dashoffset'],
  N = ['fill'],
  P = ['transform'],
  L = { key: 0, class: 'gauge-value' },
  $ = {
    __name: 'GaugeBox',
    props: {
      title: String,
      value: { type: Number, default: 50 },
      maxValue: { type: Number, default: 100 },
      color: { type: String, default: '#000' },
      unit: { type: String, default: '' }
    },
    setup(a) {
      const n = a,
        i = g(188.5),
        p = y(() => i.value - ((n.value || 0) / n.maxValue) * i.value),
        e = y(() => `rotate(${-90 + ((n.value || 0) / n.maxValue) * 180})`);
      return (t, l) => (
        h(),
        r('div', V, [
          s('div', G, o(a.title), 1),
          (h(),
          r('svg', M, [
            l[1] ||
              (l[1] = s(
                'path',
                {
                  fill: 'none',
                  stroke: '#dfe6e9',
                  'stroke-width': '20',
                  'stroke-linecap': 'round',
                  d: 'M 40,110 A 60,60 0 1,1 160,110'
                },
                null,
                -1
              )),
            s(
              'path',
              {
                fill: 'none',
                stroke: a.color,
                'stroke-width': '20',
                'stroke-linecap': 'round',
                transition: 'stroke-dashoffset 1s ease-in-out',
                d: 'M 40,110 A 60,60 0 1,1 160,110',
                'stroke-dasharray': i.value,
                'stroke-dashoffset': p.value
              },
              null,
              8,
              T
            ),
            D(t.$slots, 'default', {}, void 0, !0),
            s(
              'g',
              { fill: a.color },
              [
                s(
                  'path',
                  {
                    'transform-origin': 'center 110',
                    transform: e.value,
                    style: { transition: 'transform 1s ease-in-out' },
                    d: 'M100,90 l-4,20 l8,0 Z'
                  },
                  null,
                  8,
                  P
                ),
                l[0] || (l[0] = s('circle', { cx: '100', cy: '110', r: '4' }, null, -1))
              ],
              8,
              N
            )
          ])),
          a.unit ? (h(), r('div', L, o(a.value) + ' ' + o(a.unit), 1)) : A('', !0)
        ])
      );
    }
  },
  u = F($, [['__scopeId', 'data-v-9b76d40f']]),
  I = { style: { filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' } },
  Z = ['y', 'height'],
  B = '#ff7675',
  m = 40,
  z = {
    __name: 'GaugeTemperature',
    props: { value: { type: Number, default: 28 } },
    setup(a) {
      const n = a,
        i = y(() => ((n.value || 0) / m) * 56),
        p = y(() => 98 - i.value);
      return (e, t) => (
        h(),
        b(
          u,
          { title: '温度计', value: a.value, maxValue: m, color: B, unit: '°C' },
          {
            default: C(() => [
              s('g', I, [
                t[0] ||
                  (t[0] = s(
                    'rect',
                    { x: '15', y: '40', width: '10', height: '60', rx: '5', fill: '#a9a9a9' },
                    null,
                    -1
                  )),
                t[1] ||
                  (t[1] = s('circle', { cx: '20', cy: '110', r: '6', fill: '#ff7675' }, null, -1)),
                s(
                  'rect',
                  { x: '17', y: p.value, width: '6', height: i.value, rx: '3', fill: B },
                  null,
                  8,
                  Z
                ),
                t[2] ||
                  (t[2] = s(
                    'g',
                    { stroke: '#fdcb6e', 'stroke-width': '3' },
                    [
                      s('circle', {
                        cx: '150',
                        cy: '40',
                        r: '15',
                        fill: '#fdcb6e',
                        'stroke-width': '0'
                      }),
                      s('line', { class: 'sun-ray', x1: '150', y1: '20', x2: '150', y2: '15' }),
                      s('line', { class: 'sun-ray', x1: '165', y1: '35', x2: '170', y2: '35' }),
                      s('line', { class: 'sun-ray', x1: '150', y1: '60', x2: '150', y2: '65' }),
                      s('line', { class: 'sun-ray', x1: '135', y1: '35', x2: '130', y2: '35' }),
                      s('line', { class: 'sun-ray', x1: '140', y1: '25', x2: '137', y2: '22' }),
                      s('line', { class: 'sun-ray', x1: '160', y1: '25', x2: '163', y2: '22' }),
                      s('line', { class: 'sun-ray', x1: '160', y1: '55', x2: '163', y2: '58' }),
                      s('line', { class: 'sun-ray', x1: '140', y1: '55', x2: '137', y2: '58' })
                    ],
                    -1
                  ))
              ])
            ]),
            _: 1
          },
          8,
          ['value']
        )
      );
    }
  },
  v = F(z, [['__scopeId', 'data-v-e22044d7']]),
  H = '#74b9ff',
  O = 100,
  f = {
    __name: 'GaugeHumidity',
    props: { value: { type: Number, default: 40 } },
    setup(a) {
      return (n, i) => (
        h(),
        b(
          u,
          { title: '湿度计', value: a.value, maxValue: O, color: H, unit: '%' },
          {
            default: C(
              () =>
                i[0] ||
                (i[0] = [
                  s(
                    'g',
                    { style: {} },
                    [
                      s('path', {
                        fill: '#dfe6e9',
                        d: `M 145,40 
          A 15,15 0 1,1 155,40
          A 10,10 0 1,1 170,40
          A 12,12 0 1,1 180,40
          A 8,8 0 1,1 190,40
          Z`
                      }),
                      s('circle', { cx: '150', y: '40', r: '3', fill: '#74b9ff' }, [
                        s('animate', {
                          attributeName: 'cy',
                          from: '40',
                          to: '50',
                          dur: '1.5s',
                          repeatCount: 'indefinite'
                        })
                      ]),
                      s('circle', { cx: '160', y: '45', r: '2', fill: '#74b9ff' }, [
                        s('animate', {
                          attributeName: 'cy',
                          from: '45',
                          to: '55',
                          dur: '1.2s',
                          repeatCount: 'indefinite',
                          begin: '0.3s'
                        })
                      ]),
                      s('circle', { cx: '170', y: '43', r: '2.5', fill: '#74b9ff' }, [
                        s('animate', {
                          attributeName: 'cy',
                          from: '43',
                          to: '53',
                          dur: '1.8s',
                          repeatCount: 'indefinite',
                          begin: '0.6s'
                        })
                      ])
                    ],
                    -1
                  )
                ])
            ),
            _: 1,
            __: [0]
          },
          8,
          ['value']
        )
      );
    }
  },
  R = { style: { filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' } },
  j = { transform: 'translate(175, 40)' },
  J = '#a29bfe',
  Q = 30,
  W = {
    __name: 'GaugeWind',
    props: { value: { type: Number, default: 8 } },
    setup(a) {
      return (n, i) => (
        h(),
        b(
          u,
          { title: '风速计', value: a.value, maxValue: Q, color: J, unit: 'km/h' },
          {
            default: C(() => [
              s('g', R, [
                i[1] ||
                  (i[1] = s(
                    'rect',
                    { x: '173', y: '40', width: '5', height: '70', fill: '#b2bec3' },
                    null,
                    -1
                  )),
                s('g', j, [
                  s(
                    'g',
                    {
                      class: 'windmill',
                      fill: '#a29bfe',
                      style: w({ '--dur': `${3 - a.value / 15}s` })
                    },
                    i[0] ||
                      (i[0] = [
                        s(
                          'path',
                          { d: 'M 0,0 L 25,-5 L 0,-25 Z', transform: 'rotate(0)' },
                          null,
                          -1
                        ),
                        s(
                          'path',
                          { d: 'M 0,0 L 25,-5 L 0,-25 Z', transform: 'rotate(90)' },
                          null,
                          -1
                        ),
                        s(
                          'path',
                          { d: 'M 0,0 L 25,-5 L 0,-25 Z', transform: 'rotate(180)' },
                          null,
                          -1
                        ),
                        s(
                          'path',
                          { d: 'M 0,0 L 25,-5 L 0,-25 Z', transform: 'rotate(270)' },
                          null,
                          -1
                        )
                      ]),
                    4
                  )
                ]),
                i[2] ||
                  (i[2] = s(
                    'line',
                    { class: 'wind-line', x1: '120', y1: '25', x2: '140', y2: '25' },
                    null,
                    -1
                  )),
                i[3] ||
                  (i[3] = s(
                    'line',
                    { class: 'wind-line', x1: '110', y1: '35', x2: '130', y2: '35' },
                    null,
                    -1
                  )),
                i[4] ||
                  (i[4] = s(
                    'line',
                    { class: 'wind-line', x1: '125', y1: '45', x2: '145', y2: '45' },
                    null,
                    -1
                  ))
              ])
            ]),
            _: 1
          },
          8,
          ['value']
        )
      );
    }
  },
  x = F(W, [['__scopeId', 'data-v-31b57ed5']]),
  Y = { class: 'body' },
  K = { class: 'weather-dashboard' },
  U = { class: 'dashboard-container' },
  X = { class: 'controls' },
  ss = ['onClick'],
  is = {
    __name: 'index',
    setup(a) {
      const n = [
          { type: 'sunny', text: '☀️ 晴天模式', temperature: 28, humidity: 40, wind: 8 },
          { type: 'cloudy', text: '☁️ 多云模式', temperature: 18, humidity: 65, wind: 12 },
          { type: 'rainy', text: '🌧️ 雨天模式', temperature: 12, humidity: 85, wind: 20 },
          { type: 'random', text: '🎲 随机天气' }
        ],
        i = g(28),
        p = g(40),
        e = g(8);
      function t(l) {
        l.type === 'random'
          ? ((i.value = Math.floor(Math.random() * 40)),
            (p.value = Math.floor(Math.random() * 100)),
            (e.value = Math.floor(Math.random() * 30)))
          : ((i.value = l.temperature), (p.value = l.humidity), (e.value = l.wind));
      }
      return (l, q) => (
        h(),
        r('div', Y, [
          s('div', K, [
            q[0] || (q[0] = s('h1', null, '🌤️ 天气仪表盘', -1)),
            s('div', U, [
              k(v, { value: i.value }, null, 8, ['value']),
              k(f, { value: p.value }, null, 8, ['value']),
              k(x, { value: e.value }, null, 8, ['value'])
            ]),
            s('div', X, [
              (h(),
              r(
                _,
                null,
                S(n, c => s('button', { onClick: ts => t(c), key: c.type }, o(c.text), 9, ss)),
                64
              ))
            ])
          ])
        ])
      );
    }
  },
  as = F(is, [['__scopeId', 'data-v-c3ee823c']]),
  hs = JSON.parse(
    '{"title":"【交互式天气仪表盘】项目带你快速了解 SVG 知识","description":"","frontmatter":{"outline":"deep","navbar":false,"sidebar":false},"headers":[],"relativePath":"svg-weather.md","filePath":"svg-weather.md","lastUpdated":1765714477000}'
  ),
  ns = { name: 'svg-weather.md' },
  ks = Object.assign(ns, {
    setup(a) {
      return (n, i) => (
        h(),
        r('div', null, [
          i[0] || (i[0] = E('', 20)),
          k(u, { title: '仪表盘' }),
          i[1] || (i[1] = E('', 16)),
          k(v),
          i[2] || (i[2] = E('', 9)),
          k(f),
          i[3] || (i[3] = E('', 6)),
          k(x),
          i[4] ||
            (i[4] = s(
              'h2',
              { id: '整体效果', tabindex: '-1' },
              [
                d('整体效果 '),
                s(
                  'a',
                  {
                    class: 'header-anchor',
                    href: '#整体效果',
                    'aria-label': 'Permalink to "整体效果"'
                  },
                  '​'
                )
              ],
              -1
            )),
          i[5] ||
            (i[5] = s(
              'p',
              null,
              '前面主要部分已完成，整体项目还需要加上一些辅助元素，如：标题、数据交互按钮等。至此，交互式天气仪表盘项目已完成，相信你对 SVG 有了基础的了解。接下来我们来做个总结：',
              -1
            )),
          i[6] ||
            (i[6] = s(
              'ul',
              null,
              [
                s('li', null, [
                  s('code', null, 'path 元素比较复杂'),
                  d(
                    '，基本上复杂的图形都由它来完成，里面涉及到椭圆曲线、贝塞尔曲线等，对于这种复杂的图形可以先用编辑器画好再复制路径到项目中'
                  )
                ]),
                s('li', null, [
                  d('SVG 的'),
                  s('code', null, '动画可以使用 animate 元素'),
                  d('，也可以增加类名在 CSS 中定义动画')
                ]),
                s(
                  'li',
                  null,
                  'SVG 零基础的同学刚接触可能感觉无从下手，相信我，坚持完成这个项目，定有收获'
                )
              ],
              -1
            )),
          k(as)
        ])
      );
    }
  });
export { hs as __pageData, ks as default };
