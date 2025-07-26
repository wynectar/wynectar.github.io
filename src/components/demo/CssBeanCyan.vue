<template>
  <div class="container"></div>
</template>

<style scoped>
.container {
  --size: 10rem;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(cyan, transparent 20%);
  --grid: calc(var(--size) * 0.2);
  background-size: var(--grid) var(--grid);
  position: relative;
}
.container::before {
  content: "";
  width: var(--grid);
  height: var(--grid);
  background: radial-gradient(cyan, rgb(9, 81, 129) 40%, transparent 50%);
  position: absolute;
  animation: _animate 8s linear infinite;
}

@keyframes _animate {
  0% {
    left: 0;
    top: 0;
  }
  8% {
    left: calc(var(--grid) * 4);
    top: 0;
  }
  16% {
    left: calc(var(--grid) * 4);
    top: calc(var(--grid) * 4);
  }
  24% {
    left: 0;
    top: calc(var(--grid) * 4);
  }
  30% {
    left: 0;
    top: calc(var(--grid) * 1);
  }
  36% {
    left: calc(var(--grid) * 3);
    top: calc(var(--grid) * 1);
  }
  40% {
    left: calc(var(--grid) * 3);
    top: calc(var(--grid) * 3);
  }
  44% {
    left: calc(var(--grid) * 1);
    top: calc(var(--grid) * 3);
  }
  46% {
    left: calc(var(--grid) * 1);
    top: calc(var(--grid) * 2);
  }
  48% {
    left: calc(var(--grid) * 2);
    top: calc(var(--grid) * 2);
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 1rem cyan inset;
  }
}
</style>