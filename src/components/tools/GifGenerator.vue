<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import GIF from "gif.js";
// 底部使用提示
const useTips = reactive([
  {
    name: "上传图片",
    decs: "至少选择2张图片，建议使用相同尺寸的图片以获得最佳效果"
  },
  { name: "预览动画", decs: '点击"预览动画"可以实时查看效果，调整参数' },
  { name: "生成GIF", decs: '点击"生成GIF"创建真正的GIF文件，支持下载' },
  { name: "参数调整", decs: "帧延迟控制速度，尺寸和质量影响文件大小" },
  { name: "性能优化", decs: "图片数量越多、尺寸越大，生成时间越长" },
  { name: "兼容性", decs: "生成的GIF文件兼容所有设备和平台" }
]);
// 响应式数据
const images = ref([]);
const imageElements = ref([]);
const hoveredIndex = ref(-1);
const isDragging = ref(false);
const isGenerating = ref(false);
const isLoading = ref(false);
const loadingText = ref("正在处理...");
const showProgress = ref(false);
const progress = ref(0);
const progressText = ref("0%");

// GIF相关
const generatedGifUrl = ref(null);
const generatedGifBlob = ref(null);
const gifStatusText = ref("点击播放按钮观看生成的动态GIF");

// 参数设置
const delay = ref(200);
const outputWidth = ref(400);
const outputHeight = ref(400);
const quality = ref(7);
const loop = ref(0);

// 动画控制
const isPlaying = ref(false);
const currentFrame = ref(0);
const animationInterval = ref(null);

// 显示控制
const showCanvas = ref(false);
const showGif = ref(false);
const showFrameControls = ref(false);
const showGifStatus = ref(false);
const showResultInfo = ref(false);

// Refs
const fileInput = ref(null);
const previewCanvas = ref(null);
const previewCtx = ref(null);
const gifPreview = ref(null);

// 计算属性
const dragStyle = computed(() => ({
  borderColor: isDragging.value ? "#2980b9" : "#3498db",
  background: isDragging.value ? "#f0f9ff" : "#fff",
  transform: isDragging.value ? "translateY(-3px)" : "translateY(0)"
}));

const hasContent = computed(
  () => showCanvas.value || showGif.value || isLoading.value
);

const infoSize = computed(
  () => `${outputWidth.value}×${outputHeight.value} 像素`
);
const infoFrames = computed(() => `${imageElements.value.length} 帧`);
const infoFileSize = computed(() => {
  if (generatedGifBlob.value) {
    return `${(generatedGifBlob.value.size / 1024).toFixed(2)} KB`;
  }

  let totalSize = 0;
  images.value.forEach(img => {
    totalSize += img.size || 1024;
  });
  return `${(totalSize / 1024).toFixed(2)} KB`;
});

const infoFps = computed(() => {
  const fps = delay.value > 0 ? Math.round(1000 / delay.value) : 0;
  return `${fps} FPS`;
});

// 方法
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleDragOver = e => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = e => {
  e.preventDefault();
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  if (files.length > 0) {
    handleFiles(files);
  }
};

const handleFileSelect = e => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  handleFiles(files);
  e.target.value = "";
};

const handleFiles = async files => {
  const validFiles = files.filter(file => file.type.startsWith("image/"));
  if (validFiles.length === 0) return;

  if (images.value.length + validFiles.length > 50) {
    alert("最多只能上传50张图片");
    return;
  }

  showLoading("正在加载图片...");

  for (const file of validFiles) {
    try {
      const imageData = await readFileAsImage(file);
      images.value.push(imageData);
    } catch (error) {
      console.error("加载图片失败:", error);
    }
  }

  hideLoading();
};

const readFileAsImage = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        resolve({
          id: Date.now() + Math.random(),
          dataUrl: e.target.result,
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
          element: img
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const removeImage = index => {
  images.value.splice(index, 1);
  if (isPlaying.value) {
    pauseAnimation();
  }
};

const clearAll = () => {
  if (images.value.length === 0) return;

  if (confirm(`确定要清除所有 ${images.value.length} 张图片吗？`)) {
    images.value = [];
    imageElements.value = [];
    pauseAnimation();
    clearGeneratedGif();
    resetPreview();
  }
};

const clearGeneratedGif = () => {
  if (generatedGifUrl.value) {
    URL.revokeObjectURL(generatedGifUrl.value);
    generatedGifUrl.value = null;
    generatedGifBlob.value = null;
  }
};

const resetPreview = () => {
  showCanvas.value = false;
  showGif.value = false;
  showFrameControls.value = false;
  showGifStatus.value = false;
  showResultInfo.value = false;

  if (previewCtx.value) {
    drawWelcomeScreen();
  }
};

const showLoading = message => {
  loadingText.value = message;
  isLoading.value = true;
};

const hideLoading = () => {
  isLoading.value = false;
};

const updateProgress = (current, total, message) => {
  const percent = Math.round((current / total) * 100);
  progress.value = percent;
  progressText.value = `${message} (${current}/${total})`;
  showProgress.value = true;
};

const updateDelay = () => {
  if (isPlaying.value) {
    restartAnimation();
  }
};

const updateSize = () => {
  if (previewCanvas.value) {
    previewCanvas.value.width = outputWidth.value;
    previewCanvas.value.height = outputHeight.value;
    if (isPlaying.value || imageElements.value.length > 0) {
      drawFrame(currentFrame.value);
    }
  }
};

const startPreview = () => {
  if (images.value.length < 2) return;

  showLoading("正在准备动画预览...");

  try {
    imageElements.value = images.value.map(img => img.element);

    showCanvas.value = true;
    showGif.value = false;
    showFrameControls.value = true;
    showGifStatus.value = false;
    showResultInfo.value = true;

    startAnimation();

    hideLoading();
  } catch (error) {
    console.error("预览失败:", error);
    hideLoading();
  }
};

const startAnimation = () => {
  pauseAnimation();
  isPlaying.value = true;
  currentFrame.value = 0;

  drawFrame(currentFrame.value);

  animationInterval.value = setInterval(() => {
    currentFrame.value = (currentFrame.value + 1) % imageElements.value.length;
    drawFrame(currentFrame.value);
  }, delay.value);

  updateResultInfo();
};

const restartAnimation = () => {
  if (isPlaying.value) {
    pauseAnimation();
    startAnimation();
  }
};

const drawFrame = frameIndex => {
  if (!imageElements.value || imageElements.value.length === 0) return;
  if (!previewCtx.value) return;

  const img = imageElements.value[frameIndex];
  const ctx = previewCtx.value;
  const w = outputWidth.value;
  const h = outputHeight.value;

  ctx.clearRect(0, 0, w, h);

  const scale = Math.min(w / img.width, h / img.height);
  const width = img.width * scale;
  const height = img.height * scale;
  const x = (w - width) / 2;
  const y = (h - height) / 2;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);

  ctx.drawImage(img, x, y, width, height);

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, 10, 140, 50);
  ctx.fillStyle = "white";
  ctx.font = '14px "Microsoft YaHei", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`帧: ${frameIndex + 1}/${imageElements.value.length}`, 20, 20);
  ctx.fillText(`延迟: ${delay.value}ms`, 20, 40);

  currentFrame.value = frameIndex;
};

const drawWelcomeScreen = () => {
  if (!previewCtx.value) return;

  const ctx = previewCtx.value;
  const w = outputWidth.value;
  const h = outputHeight.value;

  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "#f8f9fa");
  gradient.addColorStop(1, "#e9ecef");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#3498db";
  ctx.font = 'bold 48px "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🖼️", w / 2, h / 2 - 40);

  ctx.fillStyle = "#2c3e50";
  ctx.font = 'bold 24px "Microsoft YaHei", sans-serif';
  ctx.fillText("GIF生成工具", w / 2, h / 2 + 10);

  ctx.fillStyle = "#7f8c8d";
  ctx.font = '16px "Microsoft YaHei", sans-serif';
  ctx.fillText("上传图片开始制作动画", w / 2, h / 2 + 50);
};

const playAnimation = () => {
  if (imageElements.value.length === 0) return;

  if (!isPlaying.value) {
    startAnimation();
  }
};

const pauseAnimation = () => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value);
    animationInterval.value = null;
  }
  isPlaying.value = false;
};

const prevFrame = () => {
  if (imageElements.value.length === 0) return;
  currentFrame.value =
    (currentFrame.value - 1 + imageElements.value.length) %
    imageElements.value.length;
  drawFrame(currentFrame.value);
  if (isPlaying.value) {
    pauseAnimation();
  }
};

const nextFrame = () => {
  if (imageElements.value.length === 0) return;
  currentFrame.value = (currentFrame.value + 1) % imageElements.value.length;
  drawFrame(currentFrame.value);
  if (isPlaying.value) {
    pauseAnimation();
  }
};

const updateResultInfo = () => {
  showResultInfo.value = true;
};

const generateGIF = async () => {
  if (isGenerating.value) return;

  if (images.value.length < 2) return;

  isGenerating.value = true;
  showLoading("正在生成GIF文件...");

  try {
    clearGeneratedGif();

    imageElements.value = images.value.map(img => img.element);

    const gifBlob = await createGIFWithGIFJS();

    if (!gifBlob) {
      throw new Error("GIF生成失败");
    }

    generatedGifBlob.value = gifBlob;
    generatedGifUrl.value = URL.createObjectURL(gifBlob);

    showCanvas.value = false;
    showGif.value = true;
    showFrameControls.value = false;
    showGifStatus.value = true;
    gifStatusText.value = "点击播放按钮观看生成的动态GIF";

    hideLoading();
  } catch (error) {
    console.error("生成GIF失败:", error);
    hideLoading();
    alert("生成GIF失败，请重试或减少图片数量");
  } finally {
    isGenerating.value = false;
  }
};

const createGIFWithGIFJS = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof GIF === "undefined") {
        reject(new Error("GIF.js未加载"));
        return;
      }

      const gif = new GIF({
        workers: 2,
        quality: quality.value * 10,
        width: outputWidth.value,
        height: outputHeight.value,
        workerScript: "gif.worker.js",
        repeat: loop.value === 0 ? 0 : loop.value,
        background: "#FFFFFF",
        dither: "FloydSteinberg",
        debug: false
      });

      const canvas = document.createElement("canvas");
      canvas.width = outputWidth.value;
      canvas.height = outputHeight.value;
      const ctx = canvas.getContext("2d");

      let framesProcessed = 0;

      const addFrame = index => {
        if (index >= imageElements.value.length) {
          gif.on("finished", blob => {
            resolve(blob);
          });

          gif.on("progress", p => {
            const percent = Math.round(p * 100);
            updateProgress(percent, 100, "渲染GIF");
          });

          gif.render();
          return;
        }

        const img = imageElements.value[index];

        ctx.clearRect(0, 0, outputWidth.value, outputHeight.value);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, outputWidth.value, outputHeight.value);

        const scale = Math.min(
          outputWidth.value / img.width,
          outputHeight.value / img.height
        );
        const width = img.width * scale;
        const height = img.height * scale;
        const x = (outputWidth.value - width) / 2;
        const y = (outputHeight.value - height) / 2;

        ctx.drawImage(img, x, y, width, height);

        gif.addFrame(canvas, { delay: delay.value, copy: true });

        framesProcessed++;
        updateProgress(framesProcessed, imageElements.value.length, "添加帧");

        setTimeout(() => addFrame(index + 1), 10);
      };

      addFrame(0);
    } catch (error) {
      console.error("GIF.js生成失败:", error);
      reject(error);
    }
  });
};

const downloadGIF = () => {
  if (!generatedGifBlob.value || !generatedGifUrl.value) return;

  const a = document.createElement("a");
  a.href = generatedGifUrl.value;
  a.download = `gif_animation_${Date.now()}.gif`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  gifStatusText.value = "GIF下载已开始！";
  setTimeout(() => {
    gifStatusText.value = "点击播放按钮观看生成的动态GIF";
  }, 3000);
};

const downloadAllFrames = async () => {
  if (imageElements.value.length === 0) return;

  try {
    showLoading("正在准备图片文件...");

    for (let i = 0; i < imageElements.value.length; i++) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = imageElements.value[i];

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `frame_${String(i + 1).padStart(3, "0")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      await new Promise(resolve => setTimeout(resolve, 100));

      updateProgress(
        i + 1,
        imageElements.value.length,
        `下载图片 ${i + 1}/${imageElements.value.length}`
      );
    }

    hideLoading();
  } catch (error) {
    console.error("下载失败:", error);
    hideLoading();
  }
};

const addSampleImages = async () => {
  images.value = [];
  showLoading("正在创建示例图片...");

  const colors = ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6"];
  const texts = ["帧 1", "帧 2", "帧 3", "帧 4"];

  for (let i = 0; i < 4; i++) {
    const canvas = document.createElement("canvas");
    canvas.width = outputWidth.value;
    canvas.height = outputHeight.value;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(
      0,
      0,
      outputWidth.value,
      outputHeight.value
    );
    gradient.addColorStop(0, colors[i]);
    gradient.addColorStop(1, lightenColor(colors[i], 40));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, outputWidth.value, outputHeight.value);

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.arc(outputWidth.value / 2, outputHeight.value / 2, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = 'bold 36px "Microsoft YaHei", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texts[i], outputWidth.value / 2, outputHeight.value / 2);

    ctx.font = '24px "Microsoft YaHei", sans-serif';
    ctx.fillText(
      "示例动画",
      outputWidth.value / 2,
      outputHeight.value / 2 + 50
    );

    const dataUrl = canvas.toDataURL("image/png");
    const img = new Image();
    img.src = dataUrl;

    await new Promise(resolve => {
      img.onload = () => {
        images.value.push({
          id: Date.now() + Math.random(),
          dataUrl,
          name: `示例图片${i + 1}.png`,
          size: 1024,
          width: outputWidth.value,
          height: outputHeight.value,
          element: img
        });
        resolve();
      };
    });

    updateProgress(i + 1, 4, "创建示例图片");

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  hideLoading();
};

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);

  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

// 生命周期
onMounted(() => {
  if (previewCanvas.value) {
    previewCtx.value = previewCanvas.value.getContext("2d");
    previewCanvas.value.width = outputWidth.value;
    previewCanvas.value.height = outputHeight.value;
    drawWelcomeScreen();
  }
});

onUnmounted(() => {
  pauseAnimation();
  clearGeneratedGif();
});

watch(generatedGifBlob, newVal => {
  showResultInfo.value = !!newVal;
});
</script>

<template>
  <div class="gif-container">
    <!-- 工具标题 -->
    <header>
      <h1>
        <i class="fas fa-film"></i> 图片转GIF工具
      </h1>
      <p class="subtitle">上传多张图片，生成高质量动态GIF文件，支持实时预览和下载</p>
    </header>
    <!-- 主要功能区域 -->
    <main>
      <!-- 左侧：上传区域 -->
      <section>
        <h2 class="section-title">
          <i class="fas fa-upload"></i> 上传图片
        </h2>

        <div class="button-group">
          <button
            id="sampleBtn"
            class="btn btn-purple"
            @click="addSampleImages"
            :disabled="isGenerating"
          >
            <i class="fas fa-magic"></i> 示例图片
          </button>
          <button
            id="clearBtn"
            class="btn btn-secondary"
            @click="clearAll"
            :disabled="images.length === 0"
          >
            <i class="fas fa-trash-alt"></i> 清除图片
          </button>
        </div>

        <div
          class="upload-area"
          @click="triggerFileInput"
          @dragover.prevent="handleDragOver"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop"
          :style="dragStyle"
        >
          <i class="fas fa-cloud-upload-alt"></i>
          <div class="upload-text">点击选择或拖拽图片到这里</div>
          <div class="upload-subtext">支持 JPG、PNG、GIF 等格式，建议尺寸一致</div>
        </div>
        <input
          type="file"
          id="fileInput"
          class="file-input"
          multiple
          accept="image/*"
          @change="handleFileSelect"
          ref="fileInput"
        />

        <div class="image-list-container">
          <div class="image-list">
            <div
              v-for="(img, index) in images"
              :key="img.id"
              class="image-item"
              @mouseover="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1"
            >
              <img :src="img.dataUrl" :alt="`图片 ${index + 1}`" />
              <button
                class="remove-btn"
                @click.stop="removeImage(index)"
                :style="{ opacity: hoveredIndex === index ? 1 : 0 }"
              >
                <i class="fas fa-times"></i>
              </button>
              <div class="frame-number">{{ index + 1 }}</div>
            </div>
          </div>
        </div>

        <div class="image-counter">
          <i class="fas fa-images"></i>
          已选择 {{ images.length }} 张图片
        </div>
      </section>

      <!-- 右侧：预览和结果区域 -->
      <section>
        <h2 class="section-title">
          <i class="fas fa-eye"></i> GIF预览与下载
        </h2>

        <div class="button-group">
          <button
            id="previewBtn"
            class="btn btn-generate"
            @click="startPreview"
            :disabled="images.length < 2"
          >
            <i class="fas fa-play"></i> 预览动画
          </button>
          <button
            id="generateBtn"
            class="btn"
            @click="generateGIF"
            :disabled="images.length < 2 || isGenerating"
          >
            <i class="fas fa-cogs"></i>
            {{ isGenerating ? '生成中...' : '生成GIF' }}
          </button>
        </div>

        <div class="preview-container" :class="{ 'has-content': hasContent }">
          <div class="loading-overlay" v-show="isLoading">
            <div class="loading-spinner"></div>
            <div class="loading-text">{{ loadingText }}</div>
            <div class="progress-container" v-show="showProgress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <div class="progress-text">{{ progressText }}</div>
            </div>
          </div>

          <div class="preview-placeholder" v-show="!hasContent && !isLoading">
            <i class="fas fa-photo-film"></i>
            <h3>等待生成GIF</h3>
            <p>请先上传图片并调整参数，然后点击"预览动画"或"生成GIF"</p>
          </div>

          <canvas
            id="previewCanvas"
            ref="previewCanvas"
            :style="{ display: showCanvas ? 'block' : 'none' }"
          ></canvas>
          <img
            id="gifPreview"
            ref="gifPreview"
            :src="generatedGifUrl"
            alt="生成的GIF"
            :style="{ display: showGif ? 'block' : 'none' }"
          />
        </div>

        <div class="frame-controls" v-show="showFrameControls">
          <button id="playBtn" class="btn" @click="playAnimation">
            <i class="fas fa-play"></i> 播放
          </button>
          <button id="pauseBtn" class="btn" @click="pauseAnimation">
            <i class="fas fa-pause"></i> 暂停
          </button>
          <button id="prevFrameBtn" class="btn" @click="prevFrame">
            <i class="fas fa-backward"></i> 上一帧
          </button>
          <button id="nextFrameBtn" class="btn" @click="nextFrame">
            <i class="fas fa-forward"></i> 下一帧
          </button>
        </div>

        <div class="gif-status" v-show="showGifStatus">
          <p>
            <i class="fas fa-info-circle"></i>
            {{ gifStatusText }}
          </p>
        </div>

        <div class="button-group">
          <button
            id="downloadBtn"
            class="btn btn-generate"
            @click="downloadGIF"
            :disabled="!generatedGifBlob"
          >
            <i class="fas fa-download"></i> 下载GIF文件
          </button>
          <button
            id="downloadFramesBtn"
            class="btn"
            @click="downloadAllFrames"
            :disabled="imageElements.length === 0"
          >
            <i class="fas fa-layer-group"></i> 下载所有帧
          </button>
        </div>

        <div class="result-info" :class="{ visible: showResultInfo }">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">
                <i class="fas fa-expand-alt"></i> 尺寸
              </div>
              <div class="info-value">{{ infoSize }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="fas fa-images"></i> 帧数
              </div>
              <div class="info-value">{{ infoFrames }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="fas fa-file"></i> 文件大小
              </div>
              <div class="info-value">{{ infoFileSize }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="fas fa-tachometer-alt"></i> 帧率
              </div>
              <div class="info-value">{{ infoFps }}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- 参数控制区域 -->
    <section>
      <h2 class="section-title">
        <i class="fas fa-sliders-h"></i> 设置参数
      </h2>

      <div class="controls">
        <div class="control-group">
          <label>帧延迟时间</label>
          <div class="slider-container">
            <input
              type="range"
              v-model.number="delay"
              min="50"
              max="1000"
              step="50"
              @input="updateDelay"
            />
            <div class="range-info">
              <span>快</span>
              <span class="range-value">{{ delay }}ms</span>
              <span>慢</span>
            </div>
          </div>
          <div class="control-note">控制GIF动画的播放速度，值越大动画越慢</div>
        </div>

        <div class="control-group">
          <label>GIF质量</label>
          <div class="slider-container">
            <input type="range" v-model.number="quality" min="1" max="10" step="1" />
            <div class="range-info">
              <span>低</span>
              <span class="range-value">{{ quality }}</span>
              <span>高</span>
            </div>
          </div>
          <div class="control-note">影响GIF的色彩质量和文件大小</div>
        </div>

        <div class="control-group">
          <label>GIF尺寸：宽</label>
          <div class="slider-container">
            <input
              type="range"
              v-model.number="outputWidth"
              min="100"
              max="800"
              step="10"
              @input="updateSize"
            />
            <div class="range-info">
              <span>小</span>
              <span class="range-value">{{ outputWidth }}px</span>
              <span>大</span>
            </div>
          </div>
          <div class="control-note">调整GIF的输出尺寸，影响文件大小</div>
        </div>

        <div class="control-group">
          <label>GIF尺寸：高</label>
          <div class="slider-container">
            <input
              type="range"
              v-model.number="outputHeight"
              min="100"
              max="800"
              step="10"
              @input="updateSize"
            />
            <div class="range-info">
              <span>小</span>
              <span class="range-value">{{ outputHeight }}px</span>
              <span>大</span>
            </div>
          </div>
          <div class="control-note">调整GIF的输出尺寸，影响文件大小</div>
        </div>

        <div class="control-group">
          <label>循环次数</label>
          <div class="slider-container">
            <input type="range" v-model.number="loop" min="0" max="10" step="1" />
            <div class="range-info">
              <span>有限</span>
              <span class="range-value">{{ loop === 0 ? '无限循环' : `${loop}次` }}</span>
              <span>无限</span>
            </div>
          </div>
          <div class="control-note">0表示无限循环，其他数字表示循环次数</div>
        </div>
      </div>
    </section>

    <!-- 使用提示 & 版本 -->
    <div class="tips">
      <h3>
        <i class="fas fa-lightbulb"></i> 使用提示
      </h3>
      <ul>
        <li v-for="(tip, index) in useTips" :key="index">
          <strong>{{ tip.name }}</strong>
          ：{{ tip.decs }}
        </li>
      </ul>
    </div>
    <div class="version">
      <i class="fas fa-code"></i> GIF生成工具 v1.0 | 基于HTML5 Canvas
    </div>
  </div>
</template>

<style scoped>
.gif-container {
  max-width: 1500px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.gif-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #9b59b6, #e74c3c);
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.8rem;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

@media (max-width: 992px) {
  main {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8ecf1;
}

.section-title {
  color: #3498db;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e8ecf1;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  font-size: 1.3rem;
}

.upload-area {
  border: 3px dashed #3498db;
  border-radius: 10px;
  padding: 50px 30px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  background: #f0f9ff;
  transform: translateY(-3px);
  border-color: #2980b9;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.2);
}

.upload-area i {
  font-size: 56px;
  color: #3498db;
  margin-bottom: 20px;
  display: block;
}

.upload-text {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 500;
}

.upload-subtext {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.file-input {
  display: none;
}

.image-list-container {
  background: white;
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  padding: 15px;
  max-height: 350px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.image-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 12px;
}

.image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.image-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.image-item img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  display: block;
  background: #f8f9fa;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
}

.image-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.frame-number {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.image-counter {
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #f8fafc, #e8ecf1);
  border-radius: 8px;
  margin-bottom: 25px;
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.controls {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8ecf1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.control-group {
  /* margin-bottom: 25px; */
}

.control-group label {
  display: block;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
}

.slider-container {
  position: relative;
  padding: 8px 0;
}

input[type="range"] {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 4px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  border: 2px solid #3498db;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.range-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.95rem;
  color: #7f8c8d;
}

.range-value {
  color: #3498db;
  font-weight: 600;
  font-size: 1rem;
}

.control-note {
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 5px;
  line-height: 1.4;
}

.btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
}

.btn:active {
  transform: translateY(-1px);
}

.btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-generate {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.btn-generate:hover {
  box-shadow: 0 10px 25px rgba(46, 204, 113, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.btn-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.btn-purple {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: center;
}

.preview-container {
  position: relative;
  min-height: 360px;
  border: 2px dashed #e8ecf1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  overflow: hidden;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.preview-container.has-content {
  border-color: #3498db;
  background: white;
}

#previewCanvas {
  max-width: 100%;
  max-height: 320px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#gifPreview {
  max-width: 100%;
  max-height: 320px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.preview-placeholder {
  text-align: center;
  padding: 40px;
  color: #95a5a6;
}

.preview-placeholder i {
  font-size: 64px;
  margin-bottom: 20px;
  color: #bdc3c7;
  display: block;
}

.preview-placeholder h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #7f8c8d;
}

.preview-placeholder p {
  font-size: 1rem;
  color: #bdc3c7;
  max-width: 300px;
  margin: 0 auto;
  line-height: 1.5;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 12px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 10px;
}

.progress-container {
  width: 100%;
  max-width: 320px;
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  width: 0%;
  transition: width 0.3s ease;
  border-radius: 5px;
}

.progress-text {
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
}

.result-info {
  background: linear-gradient(135deg, #f8fafc, #e8ecf1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  display: none;
}

.result-info.visible {
  display: block;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.info-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-value {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
}

.tips {
  background: linear-gradient(135deg, #fff9e6, #fff3cd);
  border-left: 4px solid #f39c12;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
}

.tips h3 {
  color: #f39c12;
  margin-bottom: 15px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tips ul {
  padding-left: 20px;
}

.tips li {
  margin-bottom: 10px;
  color: #856404;
  line-height: 1.5;
}

.frame-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.frame-controls .btn {
  padding: 10px 20px;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  h1 {
    font-size: 2.2rem;
  }

  main {
    gap: 20px;
  }

  section {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group .btn {
    width: 100%;
  }
}

.version {
  text-align: center;
  margin-top: 20px;
  color: #95a5a6;
  font-size: 0.9rem;
  padding-top: 20px;
  border-top: 1px solid #e8ecf1;
}

.gif-status {
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  background: #e8f4f8;
  border-left: 4px solid #3498db;
  display: none;
}

.gif-status.visible {
  display: block;
  animation: fadeIn 0.5s ease;
}

.gif-status p {
  margin: 0;
  color: #2c3e50;
  font-size: 0.95rem;
}
</style>
