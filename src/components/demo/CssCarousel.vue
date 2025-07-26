<template>
  <div class="camera">
    <div class="container">
      <div style="--i: 0"></div>
      <div style="--i: 1"></div>
      <div style="--i: 2"></div>
      <div style="--i: 3"></div>
      <div style="--i: 4"></div>
      <div style="--i: 5"></div>
    </div>
  </div>
</template>

<style scoped>
.camera {
  transform-style: preserve-3d;
  transform: rotateX(55deg);
}

.container {
  --size: 5rem;
  position: relative;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
  animation: _animate 6s linear infinite;
}

.container div {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: radial-gradient(transparent, cyan);
  transform: rotateY(calc(var(--i) * 60deg)) translateZ(calc(var(--size) * 1));
  filter: hue-rotate(calc(var(--i) * 60deg));
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, transparent, #0004);
}

@keyframes _animate {
  100% {
    transform: rotateY(360deg);
  }
}
</style>