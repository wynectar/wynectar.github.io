<template>
  <div class="loop">
    <div class="circle">
      <span :style="{ '--i': item }" v-for="item in 12" :key="item"></span>
    </div>
    <div class="circle">
      <span :style="{ '--i': item - 1 }" v-for="item in 12" :key="item"></span>
    </div>
  </div>
</template>

<style scoped>
.loop {
  --circleSize: 10rem;
  --borderSize: 1rem;
  --color: cyan;
  --delay: 0.1s;
  --n: 12;
  width: calc(var(--circleSize) * 2 - var(--borderSize));
  height: var(--circleSize);
  position: relative;
  animation: _animateColor calc(var(--delay) * var(--n) * 4) linear infinite;
}

.loop .circle {
  position: absolute;
  top: 0;
  width: var(--circleSize);
  height: var(--circleSize);
}

.loop .circle:nth-child(1) {
  left: 0;
}

.loop .circle:nth-child(2) {
  right: 0;
  transform: rotate(-180deg);
}

.loop .circle span {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(calc(360deg / var(--n) * var(--i)));
}

.loop .circle span::before {
  width: var(--borderSize);
  height: var(--borderSize);
  border-radius: 50%;
  content: "";
  position: absolute;
  right: 0;
  top: calc(50% - var(--borderSize) * 0.5);
  background-color: var(--color);
  box-shadow: 0 0 var(--borderSize) var(--color),
    0 0 calc(var(--borderSize) * 2) var(--color),
    0 0 calc(var(--borderSize) * 3) var(--color);
  transform: scale(0.1);
  animation: _animateScale calc(var(--delay) * var(--n) * 2) linear infinite;
}

.loop .circle:nth-child(1) span::before {
  animation-delay: calc(var(--i) * var(--delay));
}

.loop .circle:nth-child(2) span::before {
  animation-delay: calc(var(--i) * var(--delay) * -1);
}

@keyframes _animateScale {
  0% {
    transform: scale(1);
  }

  50%,
  100% {
    transform: scale(0.1);
  }
}

@keyframes _animateColor {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>