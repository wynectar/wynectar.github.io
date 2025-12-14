<template>
  <div class="loading">
    <span style="--i: 0"></span>
    <span style="--i: 1"></span>
    <span style="--i: 2"></span>
    <span style="--i: 3"></span>
    <span style="--i: 4"></span>
    <span style="--i: 3"></span>
    <span style="--i: 2"></span>
    <span style="--i: 1"></span>
    <span style="--i: 0"></span>
  </div>
</template>

<style scoped>
.loading {
  --h: 10rem;
  width: calc(var(--h) * 1.3);
  height: var(--h);
  position: relative;
  display: flex;
  justify-content: space-around;
}

.loading span {
  width: calc(var(--h) * 0.05);
  background: violet;
  filter: hue-rotate(calc(var(--i) * 72deg));
  position: relative;
  height: var(--sh);
  top: var(--top);
  border-radius: calc(var(--h) * 0.05);
  animation: _animate 3s linear infinite;
}

.loading span:nth-child(1),
.loading span:nth-child(9) {
  --sh: calc(var(--h) * 0.2);
  --top: calc(var(--h) * 0.2);
}

.loading span:nth-child(2),
.loading span:nth-child(8) {
  --sh: calc(var(--h) * 0.4);
  --top: calc(var(--h) * 0.1);
}

.loading span:nth-child(3),
.loading span:nth-child(7) {
  --sh: calc(var(--h) * 0.65);
  --top: calc(var(--h) * 0);
}

.loading span:nth-child(4),
.loading span:nth-child(6) {
  --sh: calc(var(--h) * 0.7);
  --top: calc(var(--h) * 0.1);
}

.loading span:nth-child(5) {
  --sh: calc(var(--h) * 0.8);
  --top: calc(var(--h) * 0.2);
}

@keyframes _animate {
  0%,
  100% {
    height: 10%;
    top: 45%;
  }

  50% {
    height: var(--sh);
    top: var(--top);
  }
}
</style>