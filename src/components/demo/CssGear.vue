<template>
  <div class="rotate">
    <div class="gear">
      <span :style="{ '--i': item - 1 }" v-for="item in 5" :key="item"></span>
    </div>
  </div>
</template>
<style scoped>
.rotate {
  transform-style: preserve-3d;

  transform: rotate3d(1, 1, 1, 220deg);
}

.gear {
  --w: 5rem;
  --h: calc(var(--w) * 2.5);
  width: var(--w);
  height: var(--h);
  position: relative;
  transform-style: preserve-3d;
  animation: _animate 5s ease-in infinite;
}

.gear span {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  transform: rotateX(calc(72deg * var(--i)));
  background: cyan;
  filter: hue-rotate(calc(72deg * var(--i)));
}

@keyframes _animate {
  100% {
    transform: rotateX(360deg);
  }
}
</style>