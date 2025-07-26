<template>
  <canvas ref="clockCanvas" :width="size" :height="size"></canvas>
</template>
 
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps({
  size: {
    type: Number,
    default: 268
  },
  shadowBlur: {
    type: Number,
    default: 10
  }
});
const clockCanvas = ref(null);
let timer = null;
let ctx = null;
const { size, shadowBlur } = props;
const sizeHalf = size / 2;
const radius = size / 2 - shadowBlur; // 计算半径时需要去掉shadowBlur的长度

function drawClock() {
  if (!ctx) ctx = clockCanvas.value.getContext("2d");
  const now = new Date();
  // 清除画布
  ctx.clearRect(0, 0, size, size);

  // 绘制时钟表盘
  ctx.beginPath();
  ctx.arc(sizeHalf, sizeHalf, radius, 0, 2 * Math.PI);
  let radgrad = ctx.createRadialGradient(sizeHalf, sizeHalf, 0, sizeHalf, sizeHalf, radius);
  radgrad.addColorStop(0, "#fff");
  radgrad.addColorStop(0.4, "#fff");
  radgrad.addColorStop(1, "yellow");
  ctx.fillStyle = radgrad;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = "orange";
  ctx.fill();

  // 绘制时针、分针、秒针刻度
  drawMarks(ctx, 12, radius * 0.02);
  drawMarks(ctx, 60, radius * 0.01);

  // 绘制年月日文本
  ctx.save();
  ctx.font = `bold ${sizeHalf/10}px Arial`;
  const text = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}`;
  const textWidth = ctx.measureText(text).width;
  ctx.fillStyle = "#333";
  ctx.fillText(text, (size - textWidth) / 2, sizeHalf * 1.5);
  ctx.textAlign = "center";
  ctx.fill();
  ctx.restore();

  // 绘制时针、分针、秒针
  drawHand(ctx, now, "hour", radius * 0.3, radius * 0.05);
  drawHand(ctx, now, "min", radius * 0.5, radius * 0.03);
  drawHand(ctx, now, "sec", radius * 0.8, radius * 0.01);
}

function drawMarks(ctx, splitNumber, lineWidth, fontSize = 10) {
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#999";
  const height = lineWidth * 5;
  // 因为需要显示刻度文字，所以1起始角色为-60deg
  const startdeg = -60;
  for (var i = 0; i < splitNumber; i++) {
    if (i % 5 === 0 && splitNumber === 60) continue;
    const x = Math.cos((((i * 360) / splitNumber + startdeg) * Math.PI) / 180);
    const y = Math.sin((((i * 360) / splitNumber + startdeg) * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(
      sizeHalf + (radius - height) * x,
      sizeHalf + (radius - height) * y
    );
    ctx.lineTo(sizeHalf + radius * x, sizeHalf + radius * y);
    ctx.stroke();
    if (splitNumber === 12) {
      ctx.fillStyle = "#666";
      ctx.fillText(
        i + 1,
        sizeHalf + (radius - height - fontSize) * x,
        sizeHalf + (radius - height - fontSize) * y
      );
      ctx.textAlign = "center";
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawHand(ctx, now, type, length, width) {
  const ratioSec = now.getSeconds() / 60;
  const ratioMin = (now.getMinutes() + ratioSec) / 60;
  const ratioHour = ((now.getHours() % 12) + ratioMin) / 12;
  const ratio = {
    hour: ratioHour,
    min: ratioMin,
    sec: ratioSec
  };
  const colors = {
    hour: '#333',
    min: 'red',
    sec: 'rgb(0, 255, 0)'
  };
  const angle = ratio[type] * 2 * Math.PI - 0.5 * Math.PI;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = colors[type];
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(sizeHalf, sizeHalf);
  ctx.lineTo(
    sizeHalf + length * Math.cos(angle),
    sizeHalf + length * Math.sin(angle)
  );
  ctx.stroke();
  ctx.restore();
}

onMounted(() => {
  timer = setInterval(drawClock, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  ctx = null;
});
</script>
 
<style>
canvas {
  /* border: 1px solid #000; */
  display: block;
  margin: 0 auto;
}
</style> 