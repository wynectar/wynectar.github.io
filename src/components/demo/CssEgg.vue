<template>
  <div class="egg"></div>
</template>

<style scoped>
.egg {
  --size: 6rem;
  width: var(--size);
  height: calc(var(--size) * 5 / 3);
  border-radius: 50%/60% 60% 40% 40%;
  background-color: #fca;
  box-shadow: 0 calc(var(--size) * -0.2) calc(var(--size) * 0.15)
    rgba(200, 80, 0, 0.3) inset;
}
</style>