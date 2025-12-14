<template>
  <div class="mirror"></div>
</template>

<style scoped>
.mirror {
  --size: 6rem;
  width: 100%;
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  -webkit-box-reflect: below 0.1rem
    linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  transform: rotate(-30deg);
}
.mirror::before {
  content: "";
  width: var(--size);
  height: var(--size);
  position: absolute;
  background: cyan;
  box-shadow: 0 0 0.5rem cyan, 0 0 2.5rem cyan, 0 0 5rem cyan, 0 0 10rem cyan;
  transform-origin: bottom right;
  animation: _animateMove 1s ease-in infinite;
}

@keyframes _animateMove {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: translateX(calc(var(--size) * -1)) rotate(90deg);
  }
}
</style>