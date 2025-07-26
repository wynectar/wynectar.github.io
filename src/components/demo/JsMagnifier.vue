<template>
  <div class="magnifier" :style="{'--size':`${magnifierSize}px`, '--scale': scale }">
    <img
      :src="imageSrc"
      alt="小图片"
      class="magnifier-small absolute"
      @mousemove="handleMouseMove"
    />
    <div class="mask absolute" :style="{left: `${x }px`,top: `${y}px`}"></div>
    <div class="magnifier-large absolute">
      <img
        :src="imageSrc"
        alt="大图片"
        class="absolute"
        :style="{left: `${x * scale * -1}px`,top: `${y * scale* -1}px`}"
      />
    </div>
  </div>
</template>
 
<script>
import imageSrc from '@ass/imgs/shaohua.png'
export default {
  props: {
    smallImageSrc: {
      type: String,
      default: "@ass/imgs/shaohua.png"
    },
    largeImageSrc: {
      type: String,
      default: "@ass/imgs/shaohua.png"
    },
    magnifierSize: {
      type: Number,
      default: 308
    },
    scale: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      imageSrc,
      x: 0,
      y: 0
    };
  },
  methods: {
    handleMouseMove(event) {
      const size = this.magnifierSize;
      const maskHalf = size / this.scale / 2;
      const boundary = size * (1 - 1 / this.scale);
      // mask相对于父元素的坐标
      this.x = event.offsetX - maskHalf;
      this.y = event.offsetY - maskHalf;
      if (this.x < 0) this.x = 0;
      if (this.x > boundary) this.x = boundary;
      if (this.y < 0) this.y = 0;
      if (this.y > boundary) this.y = boundary;
    }
  }
};
</script>
 
<style scoped>
.magnifier {
  position: relative;
  width: var(--size);
  height: var(--size);
}

.absolute {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.magnifier-large {
  left: calc(var(--size) + 10px);
  border: 1px dashed red;
  overflow: hidden;
  z-index: 10;
  display: none;
}

.magnifier-large img {
  width: calc(var(--size) * var(--scale));
  height: calc(var(--size) * var(--scale));
  display: none;
}

.magnifier-small {
  cursor: move;
}

.mask {
  width: calc(var(--size) / var(--scale));
  height: calc(var(--size) / var(--scale));
  background-color: rgba(0, 255, 0, 0.5);
  pointer-events: none;
  display: none;
}

.magnifier-small:hover ~ .magnifier-large,
.magnifier-small:focus ~ .magnifier-large,
.magnifier-small:hover ~ .magnifier-large img,
.magnifier-small:focus ~ .magnifier-large img,
.magnifier-small:hover + .mask,
.magnifier-small:focus + .mask {
  display: block;
}
</style>