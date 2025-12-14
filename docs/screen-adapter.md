---
outline: deep
navbar: false
sidebar: false
---

# 谈一谈可视化大屏的适配方案

说起大屏可视化，就要了解大屏分辨率与尺寸的概念、实际应用场景、自适应适配方案等。

## 大屏分辨率与尺寸的异同

| 特性 | 分辨率 | 物理尺寸 |
| ----- | ----- | ----- |
| 定义 | 屏幕上像素点的数量 | 屏幕对角线的实际长度 |
| 单位 | 像素 (px) | 英寸 (in) 或 厘米 (cm) |
| 决定因素 | 显示面板的制造工艺 | 屏幕的物理制造尺寸 |
| 影响方面 | 图像清晰度、细节表现 | 可视面积、观看距离 |
| 相互关系 | 通过PPI（每英寸像素数）相互关联|--|

核心要点：
- `分辨率`决定了图像的精细程度，是数字概念
- `物理尺寸`决定了屏幕大小，是物理概念
- 相同尺寸下，分辨率越高，图像越清晰
- 相同分辨率下，尺寸越小，图像越密集
- PPI = 分辨率 / 尺寸，是衡量清晰度的关键指标

  ::: tip 设计目标
  - **`PPI = √(水平像素² + 垂直像素²) / 对角线尺寸`**
  - `PPI > 80`: 适合近距离观看 | `PPI 30-80`: 适合中距离观看 | `PPI < 30`: 适合远距离观看
  :::

## 实际应用场景

### 常见显示屏
一般是`2K (1920×1080) 显示屏`，标准的`16:9`宽高比。但还有较宽`21:9`、较老`4:3`等宽高比的显示屏。适用于日常办公。

### 汇报显示屏
一般是`2K (1920×1080) 显示屏` 或 `2K (2560×1440) 显示屏`，标准的`16:9`宽高比。适用于会议室汇报、房间展示屏、医院叫号屏等。

### 指挥中心显示屏
一般都是`4K (3840×2160) 显示屏`，少有的`8K (7680×4320) 显示屏`。指挥中心的显示屏一般都是拼接屏，可以是超长屏，也可以是方屏，所以它的宽高比有`32:9`、`21:9`、`16:9`、`4:3`等。适用于企业指挥作战实验室、大数据中心、博物展览馆等需要大屏幕观看的指挥中心。


## 自适应适配方案

大屏可视化自适应方案，一般都是从`vw vh`、`rem`、`scale`去考虑。

无论使用哪种自适应方案，我们都需要考虑以下几点：
- 根据宽高比调整布局结构
- 根据分辨率动态调整字体大小
- 考虑地图等鼠标事件是否偏移
- 考虑图表等矢量图形动态的更新图形和字体大小
- 考虑大图片、视频、模型等性能优化

一般来说做可视化大屏的时候都是定制化开发，但是有时候在其他`宽高比不同 或 分辨率不同的显示屏`上进行演示报告，这时候就需要考虑自适应。

::: tip 官方文档
[less](https://less.bootcss.com/#%E5%8F%98%E9%87%8Fvariables)

[sass](https://www.sass.hk/docs/)

[查看具体功能的浏览器兼容性表/Can I Use](https://caniuse.com/)
:::

### vw/vh 方案

`基于视口百分比，适用纯CSS解决方案`，性能优秀，维护性中等。

- 优点：直接响应视口变化
- 缺点：计算复杂，字体可能过小

**核心代码：**
::: code-group

```css [Chrome 139 以上版本]
:root {
    /* 设计稿基准尺寸（假设设计稿为1920×1080） */
    --design-width: 1920;
    --design-height: 1080;

    /* 计算vw/vh单位 */
    --vw-unit: calc(100vw / var(--design-width));
    --vh-unit: calc(100vh / var(--design-height));
}

/* vw适配函数 */
@function --vw(--px) {
    result: calc(var(--px) * var(--vw-unit));
}

@function --vh(--px) {
    result: calc(var(--px) * var(--vh-unit));
}
```



```css [Less]
/* 设计稿基准尺寸（假设设计稿为1920×1080） */
@design-width: 1920;
@design-height: 1080;

/* 计算vw/vh单位 */
@vw-unit: (1 / @design-width) * 100vw;
@vh-unit: (1 / @design-height) * 100vh;

/* vw适配混合函数 */
.vw(@px, @name:width) {
    @{name}: @px * @vw-unit;
}

.vh(@px, @name:height) {
    @{name}: @px * @vh-unit;
}
```

```scss [Sass]
/* 设计稿基准尺寸（假设设计稿为1920×1080） */
$design-width: 1920;
$design-height: 1080;

/* 计算vw/vh单位 */
$vw-unit: 100vw / $design-width;
$vh-unit: 100vh / $design-height;

/* vw适配函数 */
@function vw($px) {
    @return $px * $vw-unit;
}

@function vh($px) {
    @return $px * $vh-unit;
}
```

:::


::: warning 注意事项
- 使用原生 CSS 时注意 Chrome 版本是否 `139+`
- 使用原生 CSS 和 Sass 时，直接`vw、vh`函数就行；但是使用 Less 时，要注意混合 `.vw、.vh` 入参有属性名，此时也可以扩展更多的混合，如：`.font-size(@px){ .vw(@@px, font-size) }`
- Less 和 Sass 如果需要做全局引入配置
- 因为字体会随着大屏的宽度变化而变化，也就是会说如果大屏超宽 或 超短，字体就会超大 或 超小，所以我们需要注意`大屏宽高比与设计稿基准尺寸宽高比不能悬殊太大`
- 注意滚动条会影响vw计算
- 如果宽高比极端情况、字体过小问题，需要做额外的处理
:::


### rem 方案

`基于根字体大小，适用需要精确字体控制`，性能良好，维护性良好。

- 优点：灵活控制字体大小
- 缺点：需要JS动态计算根字体大小

**核心方案：**
::: code-group

```md [动态计算 html 根元素的 font-size 部分]
- 使用 `window.addEventListener('resize', resizeHandler)` 监听，动态计算 font-size
- 媒体查询 `@media`，根据屏幕的大小来控制  font-size
- 使用 CSS `if()`函数中的`媒体查询（media()）`，控制根节点的 font-size，如：`:root {font-size: if(media(width >= 1200px): 16px; media(width >= 768px): 12px; else: 10px);}`
```

```css [CSS 使用部分]
/* rem适配CSS */
:root {
/* 设计稿基准（1920×1080下1rem=16px） */
--design-rem-size: 16;
}

/* rem转换函数 */
@function --rem(--px) {
    result: calc(var(--px) / var(--design-rem-size) * 1rem);
}

/* 使用Sass/Less时 转为对应的语法格式 */
```

::: 

::: warning 注意事项
- 如果是实际大屏宽高比与设计稿相同，动态更改根元素字体就能保证自适应方案；如果宽高比不同可能会出现元素溢出或留白的情况
- 注意移除旧监听器，添加新监听器
:::


### scale 方案

`整体缩放，适用简单适配需求`，性能优秀，维护性简单。

- 优点：简单快速
- 缺点：像素模糊，交互问题

**核心思想：**
```js
transform = `scale(${scale.scaleX}, ${scale.scaleY})`
```

::: warning 注意事项
- 实际大屏宽高比与设计稿不同时，填充容器会拉伸，产生形变，此时地图鼠标事件可能会便宜，需要单独处理
- 实际大屏宽高比与设计稿不同时，等高或等宽比例适应容器，会产生留白
:::


### 混合方案

`多种组合，适用复杂大屏项目`，性能中等，维护性复杂。

- 优点：取长补短
- 缺点：复杂度高

**核心思想：** `布局用vw/vh，字体用rem，整体用scale限制`

这里使用 `vw/vh + rem` 结合浏览器新的特性 CSS 的 `if()`、`@function`、`round()`，来做个简单的例子。

```css
:root {
  --design-width: 1920;
  --design-height: 1080;
  --design-rem-size: 16;
  font-size: if(media(width>=3840px):32px; media(width>=2560px):24px; media(width>=1920px):16px; else:12px);
  /* 计算vw/vh单位 */
  --vw-unit: calc(100vw / var(--design-width));
  --vh-unit: calc(100vh / var(--design-height));
}

/* vw适配函数 用于容器 */
@function --vw(--px) {
  result: calc(var(--px) * var(--vw-unit));
}

@function --vh(--px) {
  result: calc(var(--px) * var(--vh-unit));
}

/* rem转换函数 用于字体大小、padding */
@function --size(--px) {
  result: round(up, calc(var(--px) / var(--design-rem-size) * 1rem), 1px);
}
```


::: tip 提示
- 主要是封装 `--vw`、`--vh` 函数来完成布局，包括容器的宽高、间距、容器阴影；封装 `--size` 函数来控制字体大小、字体阴影。如果字体撑起容器`border-radius` 用 `--size`，否则用 `--vw`、`--vh`
- 这种方式需要制定大家需要遵守的规范
- 根字体大小也可以通过 js 动态改变，但要注意可能会造成闪屏等现象
:::


## 总结建议

选择流程图：
```text
开始
  ↓
确定项目需求
  ├── 简单展示项目 → scale方案
  ├── 数据可视化项目 → 混合方案(vw+rem)
  └── 复杂交互项目 → rem方案为主
  ↓
考虑目标设备
  ├── 固定大屏 → scale或vw
  ├── 多端适配 → rem或混合
  └── 移动端优先 → rem
  ↓
评估团队技术
  ├── CSS熟练 → vw/vh方案
  ├── JS熟练 → rem或混合方案
  └── 全栈团队 → 混合方案
  ↓
实施并监控
```

