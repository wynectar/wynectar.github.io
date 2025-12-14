<template>
  <div class="container">
    <span :style="{ '--i': item - 1 }" v-for="item in 12" :key="item"></span>
  </div>
</template>

<style scoped>
.container {
  --size: 2.5rem;
  width: var(--size);
  height: var(--size);
  position: relative;
}
.container span {
  display: inline-block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid cyan;
  filter: hue-rotate(calc(var(--i) * 30deg));
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(calc(var(--i) * 30deg)) scale(calc(1 + var(--i) * 0.1));
  animation: _animate 2s linear calc(var(--i) * 0.1s) infinite;
}

@keyframes _animate {
  100% {
    transform: rotate(calc(var(--i) * 1360deg)) scale(calc(1 + var(--i) * 0.5));
  }
}
</style>