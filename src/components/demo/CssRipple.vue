<template>
  <div class="ripple">
    <span
      :style="{ '--coefficient': item - 1 }"
      v-for="item in 5"
      :key="item"
    ></span>
  </div>
</template>

<style scoped>
.ripple {
  width: 20rem;
  height: 20rem;
  position: relative;
  --color: red;
}

.ripple span {
  display: block;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color);
  --delay: calc(var(--coefficient) * 1s);
  animation: _spread 5s linear var(--delay) infinite;
}

@keyframes _spread {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>