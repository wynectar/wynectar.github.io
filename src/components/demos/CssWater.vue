<template>
  <div class="container">
    <div class="water"></div>
  </div>
</template>

<style scoped>
.container {
  --size: 10rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: calc(var(--size) * 0.05) solid transparent;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  animation: _animate 6s linear infinite;
}

.container::before,
.container::after {
  content: "";
  width: 50%;
  height: 20%;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  left: 25%;
}

.container::before {
  box-shadow: 0 0 1rem rgba(255, 255, 255, 0.1);
  border: calc(var(--size) * 0.05) solid rgba(255, 255, 255, 0.3);
  top: calc(var(--size) * -0.05);
}

.container::after {
  background-color: rgba(255, 255, 255, 0.1);
  top: 30%;
}

.water {
  width: 100%;
  height: 50%;
  border-radius: 0 0 50% 50%/0 0 100% 100%;
  background-color: gold;
  position: absolute;
  bottom: 0;
  box-shadow: 0 0 1rem gold;
  transform-origin: center top;
  animation: _animate2 6s linear infinite;
}

.water::before {
  content: "";
  width: 100%;
  height: 30%;
  border-radius: 50%;
  background-color: rgb(105, 91, 8);
  position: absolute;
  top: -15%;
}

@keyframes _animate {
  0%,
  100% {
    transform: rotate(-30deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(30deg);
  }
}

@keyframes _animate2 {
  0%,
  100% {
    transform: rotate(15deg);
    filter: hue-rotate(360deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(-15deg);
    filter: hue-rotate(0deg);
  }
}
</style>