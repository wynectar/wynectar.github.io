<template>
  <div class="container"></div>
</template>

<style scoped>
.container {
  --size: 15rem;
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: _animate 4s linear infinite;
}

.container::before,
.container::after {
  content: "";
  display: block;
  border-radius: 50%;
}

.container::before {
  background-color: wheat;
  animation: _animate1 4s linear infinite;
}

.container::after {
  background-color: yellow;
  animation: _animate2 4s linear infinite;
}
@keyframes _animate {
  100% {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
@keyframes _animate1 {
  0%,
  100% {
    width: calc(var(--size) * 0.25);
    height: calc(var(--size) * 0.25);
  }
  50% {
    width: calc(var(--size) * 0.75);
    height: calc(var(--size) * 0.75);
  }
}
@keyframes _animate2 {
  0%,
  100% {
    width: calc(var(--size) * 0.75);
    height: calc(var(--size) * 0.75);
  }
  50% {
    width: calc(var(--size) * 0.25);
    height: calc(var(--size) * 0.25);
  }
}
</style>