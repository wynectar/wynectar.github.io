<template>
  <div class="loading"></div>
</template>

<style scoped>
.loading {
  --h: 5rem;
  width: calc(var(--h) * 2);
  height: var(--h);
  border-radius: 50% 50% 0 0/100% 100% 0 0;
  background: linear-gradient(to right, transparent, cyan);
  position: relative;
  transform-origin: center bottom;
  animation: _animate 2s linear infinite;
  top: calc(var(--h) * -0.5);
}

.loading::before {
  content: "";
  width: 80%;
  height: 80%;
  position: absolute;
  left: 5%;
  bottom: 0;
  border-radius: 50% 50% 0 0/100% 100% 0 0;
  background: #000;
}

.loading::after {
  content: "";
  width: 15%;
  height: 30%;
  border-radius: 50%;
  background: cyan;
  position: absolute;
  right: 0;
  bottom: -15%;
  box-shadow: 0 0 0.2rem #000 inset;
}

@keyframes _animate {
  100% {
    filter: hue-rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>