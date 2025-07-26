<template>
  <div class="light"></div>
</template>

<style scoped>
.light {
  --size: 10rem;
  --color: cyan;
  --borderColor: #fff;
  width: var(--size);
  height: var(--size);
  border: calc(var(--size) * 0.05) solid var(--borderColor);
  border-radius: 50%;
  box-shadow: 0 0 calc(var(--size) * 0.1) var(--color),
    0 0 calc(var(--size) * 0.1) var(--color) inset;
  -webkit-box-reflect: below calc(var(--size) * 0.1)
    linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.2));
  animation: _animate 4s linear infinite;
}

@keyframes _animate {
  100% {
    filter: hue-rotate(360deg);
    -webkit-box-reflect: below calc(var(--size) * 0.1)
      linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.2));
  }
}
</style>