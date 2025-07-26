<template>
  <div class="container">
    <span :style="{ '--i': item - 1 }" v-for="item in 12" :key="item"
      >我是忘忧</span
    >
  </div>
</template>

<style scoped>
.container {
  --size: 10rem;
  width: var(--size);
  position: relative;
  transform-style: preserve-3d;
  animation: _animate 8s linear infinite;
}

.container span {
  display: inline-block;
  text-align: center;
  letter-spacing: 1.5rem;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  text-shadow: 0 0 1rem cyan;
  transform: rotateX(calc(var(--i) * 30deg)) translateZ(3rem);
}

@keyframes _animate {
  0% {
    transform: rotate3d(1, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(1, 0, 1, 360deg);
  }
}
</style>