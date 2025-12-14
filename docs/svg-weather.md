---
outline: deep
navbar: false
sidebar: false
---

# 【交互式天气仪表盘】项目带你快速了解 SVG 知识

::: tip 本文目标
- 通过此项目来完成 SVG 的基础学习
- 完成此项目，会对 SVG 有个清晰的认识并能绘制出一些简易及稍微复杂的图案
:::

**工具**
- [SVG 在线编辑器](https://www.jyshare.com/more/svgeditor/)
- [SVG 在线编译器](https://developer.mozilla.org/en-US/play)

**文档**
- [SVG 参考手册](https://www.runoob.com/svg/svg-reference.html)
- [MDN 学习参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg)

## SVG 基础

SVG，可缩放矢量图形（Scalable Vector Graphics），是一种用于描述二维图形的 XML 标记语言。

### SVG 常见属性

SVG 不但可以通过 `class`、`style` 来间接的变化样式，还可以直接用对应的属性修改。

| 常见属性 | 描述 |
| ----- | ----- |
| id | 元素的唯一标识符 |
| class | 元素的类名，用于CSS样式 |
| style | 元素的内联样式 |
| transform | 应用到元素上的变换 |
| x, y | `元素的位置` |
| width, height | `元素的尺寸` |
| fill | `填充颜色` |
| stroke | `描边颜色` |
| stroke-width | `描边宽度` |
| opacity | 透明度 |
| visibility | 元素的可见性 |


### SVG 在 HTML 页面的使用方式

1. SVG 的`代码可以直接嵌入`到 HTML 页面中
2. `通过 HTML 的特定标签`，将 SVG 图像作为图片或文件嵌入到 HTML 页面中。
3. `通过 CSS 的 background-image 属性`，可以将 SVG 图像作为背景图嵌入到 HTML 元素中。

示例如下：

::: code-group

```html [直接嵌入]
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

```html [< img> 标签]
<img src="example.svg" alt="SVG Image" width="200" height="200" >
```

```html [< object> 标签]
<object data="example.svg" type="image/svg+xml" width="200" height="200">
  Your browser does not support SVG
</object>
```

```html [< iframe> 标签]
<iframe src="example.svg" width="200" height="200"></iframe>
```

```html [< a> 标签]
<a href="example.svg">查看 SVG 文件</a>
```

```css [CSS 背景图]
.svg-bg {
  width: 200px;
  height: 200px;
  background-image: url('example.svg');
  background-size: cover;
}
```

:::

## 本文项目

交互式天气仪表盘主要包含温度计、湿度计、风速计三部分。

### 通用仪表盘

温度计、湿度计、风速计本质都是仪表盘的变化，仪表盘背景、填充和指针部分都是通用的，可以封装一个组件 `<GuageBox />`，主要代码如下：

```html{13,18,19,23,26}
<svg width="200" height="150" viewBox="0 0 200 150">
    <!-- 仪表盘背景 -->
    <path
    fill="none"
    stroke="#dfe6e9"
    stroke-width="20"
    stroke-linecap="round"
    d="M 40,110 A 60,60 0 1,1 160,110"
    />
    <!-- 仪表盘填充 -->
    <path
    fill="none"
    :stroke="color"
    stroke-width="20"
    stroke-linecap="round"
    transition="stroke-dashoffset 1s ease-in-out"
    d="M 40,110 A 60,60 0 1,1 160,110"
    :stroke-dasharray="dasharray"
    :stroke-dashoffset="dashoffset"
    />
    <slot />
    <!-- 指针 -->
    <g :fill="color">
        <path
            transform-origin="center 110"
            :transform="transform"
            style="transition: transform 1s ease-in-out"
            d="M100,90 l-4,20 l8,0 Z"
        />
        <circle cx="100" cy="110" r="4" />
    </g>
</svg>
```

<script setup>
import GaugeBox from './components/WeatherDashboard/GaugeBox.vue'
import GaugeTemperature from './components/WeatherDashboard/GaugeTemperature.vue'
import GaugeHumidity from './components/WeatherDashboard/GaugeHumidity.vue'
import GaugeWind from './components/WeatherDashboard/GaugeWind.vue'
import WeatherDashboard from './components/WeatherDashboard/index.vue'
</script>
<GaugeBox title="仪表盘" />

> ⚠️ 组件里面存在变量，如果直接复制使用，需把变量替换成对应属性的值。

这里我们只关注 SVG 部分，整个组件其实还有其他元素组成。通过这个组件，我们需要知道一些知识：

#### svg 元素
svg 的绘制需要在 `svg` 标签内进行。
- `width, height`属性：共同决定SVG画布的显示区域。单位默认为像素（px）`即 width="200" 等于 width="200px"`，也可使用百分比（%）表示相对尺寸。
- `viewBox`属性：它的值是一个包含 4 个参数的列表 `min-x, min-y, width and height`，以空格或者逗号分隔开。它定义了SVG的`坐标系范围`，与width/height配合可实现缩放。示例如下：
    ```html
    <svg width="400" height="300" viewBox="0 0 200 150">
    <!-- 内容 -->
    </svg>
    ```
    表示 `200x150` 区域内的内容放大了两倍。

#### path 元素

SVG 中的 `<path>` 元素用于创建路径，可以绘制直线、曲线、弧线等各种复杂的图形，并且可以通过设置路径命令来控制路径的形状和样式。

- `fill`属性：路径的填充颜色。
- `stroke`属性：路径的描边颜色。
- `stroke-width`属性：路径的描边宽度。
- `stroke-linecap`属性：开放自路径两端的形状。可选 `butt` | `round` | `square` | `inherit`
- `stroke-dasharray`属性：用于绘制形状轮廓的虚线段和间隙的排列形式。可选 `实,虚,实,虚......` | `none`
- `stroke-dashoffset`属性：虚线与路径起点之间的偏移量。相对于虚线当前所在位置，`正数往左移动`，`负数往右移动`，利用这个特性可模拟“绘制”路径的过程。
- `d`属性：路径的路径数据，是一个路径命令组成的列表。
    - [常用的路径命令](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Attribute/d#%E8%B7%AF%E5%BE%84%E5%91%BD%E4%BB%A4)
    > *`命令是大小写敏感的`*。大写的命令指定绝对坐标，而小写命令指定相对（于当前位置的）坐标。
    
    | 路径命令类型 | 路径命令 | 举🌰 |
    | ----- | ----- | ----- |
    | MoveTo | `M、m` | **M10,10** *新的绘画起点坐标(10,10)*|
    | LineTo | `L、l` 🍎 `H、h` 🍎 `V、v` | **L20,20** *当前位置与点(20,20)绘制一条直线* <br> **H20** *当前位置与点(20,当前位置y)绘制一条水平线* <br> **V20** *当前位置与点(当前位置x,20)绘制一条垂直线* |
    | 三次贝塞尔曲线 | `C、c` 🍎 `S、s` |*参考常用的路径命令* |
    | 二次贝塞尔曲线 | `Q、q` 🍎 `T、t` |*参考常用的路径命令* |
    | 椭圆曲线 | `A、a` | *参考常用的路径命令* |
    | ClosePath | `Z、z` | 当前子路径通过起点和终点闭合 |
    
    - d 是一个表现属性，该属性可以通过 CSS 采用 `path() 或 none` 进行修改。示例如下：
    ```css
    svg:hover path {
        d: path(
            "M10,30 A20,20 0,0,1 50,30 A20,20 0,0,1 90,30 Q90,60 50,90 Q10,60 10,30 z M5,5 L90,90"
        );
    }
  ```

#### g 元素
SVG 中的 `g` 元素主要有两个功能：一是作为容器，用于将其他 SVG 元素进行分组；二是设置属性值让子元素继承。

#### circle 元素
SVG中的 `circle` 元素用于绘制圆形.
```html
<circle
  cx="x-coordinate"      <!-- 圆心的 x 坐标 -->
  cy="y-coordinate"      <!-- 圆心的 y 坐标 -->
  r="radius"             <!-- 圆的半径 -->
  fill="fill-color"      <!-- 圆的填充颜色 -->
  stroke="stroke-color"  <!-- 圆的描边颜色 -->
  stroke-width="width"   <!-- 圆的描边宽度 -->
/>
```

### 温度计

基于仪表盘 `<GuageBox />` 组件增加了温度计🌡️、太阳🌞等元素。

```vue
<template>
  <GuageBox title="温度计" :value="weather" :maxValue="maxValue" :color="color" unit="°C">
    <!-- 温度计图标 -->
    <g style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 温度计主体 -->
      <rect x="15" y="40" width="10" height="60" rx="5" fill="#a9a9a9" />
      <!-- 温度计底部 -->
      <circle cx="20" cy="110" r="6" fill="#ff7675" />
      <!-- 温度计液体 -->
      <rect x="17" :y="y" width="6" :height="height" rx="3" :fill="color" />
      <!-- 太阳 -->
      <g stroke="#fdcb6e" stroke-width="3">
        <circle cx="150" cy="40" r="15" fill="#fdcb6e" stroke-width="0" />
        <line class="sun-ray" x1="150" y1="20" x2="150" y2="15" />
        <line class="sun-ray" x1="165" y1="35" x2="170" y2="35" />
        <line class="sun-ray" x1="150" y1="60" x2="150" y2="65" />
        <line class="sun-ray" x1="135" y1="35" x2="130" y2="35" />
        <line class="sun-ray" x1="140" y1="25" x2="137" y2="22" />
        <line class="sun-ray" x1="160" y1="25" x2="163" y2="22" />
        <line class="sun-ray" x1="160" y1="55" x2="163" y2="58" />
        <line class="sun-ray" x1="140" y1="55" x2="137" y2="58" />
      </g>
    </g>
  </GuageBox>
</template>
```

<GaugeTemperature />

#### line 元素
SVG 中的 `line` 元素用于绘制直线。
```html
<line
  x1="x1-coordinate"     <!-- 起点的 x 坐标 -->
  y1="y1-coordinate"     <!-- 起点的 y 坐标 -->
  x2="x2-coordinate"     <!-- 终点的 x 坐标 -->
  y2="y2-coordinate"     <!-- 终点的 y 坐标 -->
  stroke="stroke-color"  <!-- 直线的颜色 -->
  stroke-width="width"   <!-- 直线的宽度 -->
/>
```

#### rect 元素
SVG中的 `rect` 元素用于绘制矩形.
```html
<rect
  x="x-coordinate"        <!-- 矩形左上角的 x 坐标 -->
  y="y-coordinate"        <!-- 矩形左上角的 y 坐标 -->
  width="width-value"     <!-- 矩形的宽度 -->
  height="height-value"   <!-- 矩形的高度 -->
  rx="rx-value"           <!-- 矩形的圆角半径（水平方向） -->
  ry="ry-value"           <!-- 矩形的圆角半径（垂直方向） -->
  fill="fill-color"       <!-- 矩形的填充颜色 -->
  stroke="stroke-color"   <!-- 矩形的描边颜色 -->
  stroke-width="width-value" <!-- 矩形的描边宽度 -->
/>
```

### 湿度计

基于仪表盘 `<GuageBox />` 组件增加了云☁️、小雨滴🌧️等元素。

```vue
<template>
  <GuageBox title="湿度计" :value="value" :maxValue="maxValue" :color="color" unit="%">
    <!-- 水滴和云图标 -->
    <g style="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 云 -->
      <path
        fill="#dfe6e9"
        d="M 145,40 
          A 15,15 0 1,1 155,40
          A 10,10 0 1,1 170,40
          A 12,12 0 1,1 180,40
          A 8,8 0 1,1 190,40
          Z"
      />
      <!-- 小雨滴 -->
      <circle cx="150" y="40" r="3" fill="#74b9ff">
        <animate attributeName="cy" from="40" to="50" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" y="45" r="2" fill="#74b9ff">
        <animate
          attributeName="cy"
          from="45"
          to="55"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <circle cx="170" y="43" r="2.5" fill="#74b9ff">
        <animate
          attributeName="cy"
          from="43"
          to="53"
          dur="1.8s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
    </g>
  </GuageBox>
</template>
```

<GaugeHumidity />

#### animate 元素

SVG 中的动画元素，将其放在形状元素的内部，用来定义一个元素的某个属性如何改变。

- `attributeName` 属性：动画属性。
- `values` 属性：作用取决于使用的上下文。可以是值序列、颜色矩阵的数字列表等。
- `from/to` 属性：动画属性的值从 from 属性的值到 to 属性的值。作用和 values 属性类似。
- `dur` 属性：动画的简单持续时间。
- `repeatCount` 属性：动画将发生的次数。可选 `number` number 需大于0 | `indefinite`
- `begin/end` 属性：动画何时开始/结束。
- `fill` 属性：动画在持续时间结束后，是否保留当前动画。可选  `remove` 移除 | `freeze` 保留

### 风速计

基于仪表盘 `<GuageBox />` 组件增加了风吹线条、风车等元素。

```vue
<template>
  <GuageBox title="风速计" :value="value" :maxValue="maxValue" :color="color" unit="km/h">
    <!-- 风车图标 -->
    <g style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 风车杆 -->
      <rect x="173" y="40" width="5" height="70" fill="#b2bec3" />
      <!-- 风车叶片 -->
      <g transform="translate(175, 40)">
        <g class="windmill"  fill="#a29bfe" :style="{'--dur': `${3 - (value / 15)}s`}">
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(0)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(90)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(180)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(270)" />
        </g>
      </g>
      <!-- 风吹线条 -->
      <line class="wind-line" x1="120" y1="25" x2="140" y2="25" />
      <line class="wind-line" x1="110" y1="35" x2="130" y2="35" />
      <line class="wind-line" x1="125" y1="45" x2="145" y2="45" />
    </g>
  </GuageBox>
</template>
```

<GaugeWind />

## 整体效果

前面主要部分已完成，整体项目还需要加上一些辅助元素，如：标题、数据交互按钮等。至此，交互式天气仪表盘项目已完成，相信你对 SVG 有了基础的了解。接下来我们来做个总结：

- `path 元素比较复杂`，基本上复杂的图形都由它来完成，里面涉及到椭圆曲线、贝塞尔曲线等，对于这种复杂的图形可以先用编辑器画好再复制路径到项目中
- SVG 的`动画可以使用 animate 元素`，也可以增加类名在 CSS 中定义动画
- SVG 零基础的同学刚接触可能感觉无从下手，相信我，坚持完成这个项目，定有收获

<WeatherDashboard />


