<template>
  <div class="container">
    <div class="eat">
      <span></span>
    </div>
    <div class="bean"></div>
  </div>
</template>
<style scoped>
.container {
  --size: 10rem;
  width: calc(var(--size) * 2);
  height: var(--size);
  position: relative;
}

.eat {
  width: var(--size);
  height: var(--size);
  position: absolute;
  left: 0;
  top: 0;
}

.eat span {
  display: inline-block;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  background: #000;
  position: absolute;
  z-index: 1;
  left: 35%;
  top: 20%;
}

.eat::before,
.eat::after {
  content: "";
  width: 100%;
  height: 50%;
  background: gold;
  position: absolute;
  left: 0;
  animation: _rotate 2s linear infinite;
}

.eat::before {
  border-radius: 50% 50% 0 0 /100% 100% 0 0;
  transform-origin: center bottom;
  top: 0;
  transform: rotate(-45deg);
}

.eat::after {
  border-radius: 0 0 50% 50%/0 0 100% 100%;
  transform-origin: center top;
  bottom: 0;
  transform: rotate(45deg);
}
.bean {
  width: 100%;
  height: 100%;
  position: absolute;
  background: radial-gradient(gold, gold 5%, transparent 20%);
  background-size: var(--size) var(--size);
  z-index: 0;
  animation: _move 1s linear infinite;
}
@keyframes _rotate {
  50% {
    transform: rotate(0deg);
  }
}
@keyframes _move {
  100% {
    background-position-x: -100%;
  }
}
</style>