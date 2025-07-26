<template>
  <div class="camera">
    <div class="container">
      <div style="--i: 0"></div>
      <div style="--i: 1"></div>
      <div style="--i: 2"></div>
      <div style="--i: 3"></div>
    </div>
  </div>
</template>

<style scoped>
.camera {
  transform-style: preserve-3d;
  transform: rotateX(-20deg);
}

.container {
  --size: 10rem;
  position: relative;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
  animation: _animate 6s linear infinite;
}

.container::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: center center;
  transform: rotateX(90deg) translateZ(calc(var(--size) * -0.5));
  background: radial-gradient(gold, transparent);
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, transparent, #0004);
}

.container div {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: radial-gradient(transparent, cyan);
  transform: rotateY(calc(var(--i) * 90deg)) translateZ(calc(var(--size) * 0.5));
  filter: hue-rotate(calc(var(--i) * 90deg));
  box-shadow: 0 0 0.5rem cyan, 0 0 1rem cyan;
  border-radius: 50% 50% 0 0;
}

@keyframes _animate {
  100% {
    transform: rotateY(360deg);
  }
}
</style>