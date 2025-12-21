<script setup lang="ts">
import { darkTheme, NIcon, zhCN, dateZhCN } from "naive-ui";
import logo from "@/assets/imgs/logo.jpeg";
import { ref, onBeforeUpdate, onMounted } from "vue";
import { AudioMutedOutlined, AudioFilled } from "@vicons/antd";
import { SunnyOutline, MoonOutline } from "@vicons/ionicons5";
import webSpeech from "@/utils/web-speech";
import menuOptions from "@/router/menu-options";
import { useNBRouter } from "@/utils/router";
const { navigateToDefault, route } = useNBRouter();
import { useThemeStore } from '@/stores/theme'

// 主题模式控制
const theme = useThemeStore()

/**
 * @voiceActive 语音模式控制
 * @collapsed 菜单折叠控制
 * @updateTheme 主题切换
 * @updateVioce 语音切换
 * */

const voiceActive = ref(false);
const collapsed = ref(false);
const updateTheme = () => {
  theme.change()
  if (voiceActive.value) {
    const text = theme.isDark ? "夜间模式开启" : "夜间模式关闭";
    webSpeech.speak(text);
  }
};
const updateVioce = (val: boolean) => {
  const text = val ? "语音播报开启" : "语音播报关闭";
  webSpeech.speak(text);
  voiceActive.value = val;
};


/**
 * @menuValue 当前菜单
 * @isFull 容器是否撑满
 * @updateMenu 菜单选择
 * @updateMenuVal 更新当前菜单
 * */
const menuValue = ref("");
const isFull = ref(false);
const updateMenu = (val: string, item: any) => {
  menuValue.value = val;
  if (voiceActive.value) {
    webSpeech.speak(item.description);
  }
};
function updateMenuVal() {
  const component = route.path.split("/")[1];
  menuValue.value = component === "blog-detail" ? "blog-post" : component;
  isFull.value = component === "blog-detail"
}
updateMenuVal();
onBeforeUpdate(() => {
  updateMenuVal();
});

const currentTime = ref("00:00:00");
const currentDate = ref("2021年1月1日");
// 更新时间显示
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("zh-CN");
  const dateString = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  currentTime.value = timeString;
  currentDate.value = dateString;
}
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <n-config-provider :theme="theme.isDark ? darkTheme : null" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout style="height: 100vh">
      <!-- 顶部信息 -->
      <n-layout-header style="height: 55px; padding: 5px 20px" bordered>
        <n-flex justify="space-between" align="center" size="large">
          <!-- logo 标题 -->
          <n-flex align="center" style="cursor: pointer" @click="navigateToDefault">
            <n-avatar round size="large" :src="logo" />
            <span style="color: #18a058;font-weight:bold">NectarBlog</span>
          </n-flex>
          <!-- 切换按钮 -->
          <n-flex align="center">
            <n-button circle size="small" :type="voiceActive ? 'primary' : 'default'" ghost :focusable="false"
              @click="updateVioce(!voiceActive)">
              <template #icon>
                <n-icon>
                  <AudioFilled v-if="voiceActive" />
                  <AudioMutedOutlined v-else />
                </n-icon>
              </template>
            </n-button>
            <n-button circle size="small" :type="theme.isDark ? 'primary' : 'default'" ghost :focusable="false"
              @click="updateTheme">
              <template #icon>
                <n-icon>
                  <MoonOutline v-if="theme.isDark" />
                  <SunnyOutline v-else />
                </n-icon>
              </template>
            </n-button>
          </n-flex>
        </n-flex>
      </n-layout-header>
      <!-- 内容区域 -->
      <n-layout has-sider position="absolute" style="top: 55px; bottom: 0">
        <!-- 左侧内容 -->
        <n-layout-sider collapse-mode="width" :collapsed-width="84" :width="220" :show-collapsed-content="false"
          show-trigger="arrow-circle" content-style="padding: 20px 10px;" :native-scrollbar="false" bordered
          :collapsed="collapsed" @collapse="collapsed = true" @expand="collapsed = false">
          <!-- 菜单列表 -->
          <n-menu content-style="padding: 20px;" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
            :options="menuOptions" :value="menuValue" :on-update:value="updateMenu" />
          <!-- 装饰内容 -->
          <n-card content-style="text-align:center;padding-left:0;padding-right:0">
            <div style="color: #18a058;font-size: 24px;">{{ currentTime }}</div>
            <span>{{ currentDate }}</span>
          </n-card>
        </n-layout-sider>
        <!-- 右侧内容 -->
        <n-layout-content :content-style="`padding: 20px;height:${isFull ? '100%' : 'initial'}`"
          :native-scrollbar="false">
          <RouterView></RouterView>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
