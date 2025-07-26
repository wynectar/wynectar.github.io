<script setup lang="ts">
import { darkTheme, NIcon, zhCN, dateZhCN } from "naive-ui";
import logo from "@ass/imgs/logo.jpeg";
import { ref, onBeforeUpdate } from "vue";
import { AudioMutedOutlined, AudioFilled } from "@vicons/antd";
import { SunnyOutline, MoonOutline } from "@vicons/ionicons5";
import webSpeech from "@/utils/web-speech";
import menuOptions from "@/router/menu-options";
import { useNBRouter } from "@/utils/router";
const { navigateToDefault, route } = useNBRouter();

const voiceActive = ref(false);
const themeActive = ref(false);
const collapsed = ref(false);
const updateTheme = (val: boolean) => {
  if (voiceActive.value) {
    const text = val ? "夜间模式开启" : "夜间模式关闭";
    webSpeech.speak(text);
  }
  themeActive.value = val;
};
const updateVioce = (val: boolean) => {
  const text = val ? "语音播报开启" : "语音播报关闭";
  webSpeech.speak(text);
  voiceActive.value = val;
};

const updateMenu = (val: string, item: any) => {
  menuValue.value = val;
  if (voiceActive.value) {
    webSpeech.speak(item.description);
  }
};
// 更新菜单选择项
const menuValue = ref("");
function updateMenuVal() {
  const component = route.path.split("/")[1];
  menuValue.value = component === "BlogPost" ? "HomePage" : component;
}
updateMenuVal();
onBeforeUpdate(() => {
  updateMenuVal();
});
</script>

<template>
  <n-config-provider :theme="themeActive ? darkTheme : null" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout style="height: 100vh">
      <!-- 顶部信息 -->
      <n-layout-header style="height: 55px; padding: 5px 20px" bordered>
        <n-flex justify="space-between" align="center" size="large">
          <n-flex align="center" style="cursor: pointer" @click="navigateToDefault">
            <n-avatar round size="large" :src="logo" />
            <span style="color: #18a058">NectarBlog</span>
          </n-flex>
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
            <n-button circle size="small" :type="themeActive ? 'primary' : 'default'" ghost :focusable="false"
              @click="updateTheme(!themeActive)">
              <template #icon>
                <n-icon>
                  <MoonOutline v-if="themeActive" />
                  <SunnyOutline v-else />
                </n-icon>
              </template>
            </n-button>
          </n-flex>
        </n-flex>
      </n-layout-header>
      <!-- 内容区域 -->
      <n-layout has-sider position="absolute" style="top: 55px; bottom: 0">
        <!-- 左侧菜单 -->
        <n-layout-sider collapse-mode="width" :collapsed-width="84" :width="220" :show-collapsed-content="false"
          show-trigger="arrow-circle" content-style="padding: 20px 10px;" :native-scrollbar="false" bordered
          :collapsed="collapsed" @collapse="collapsed = true" @expand="collapsed = false">
          <n-menu content-style="padding: 20px;" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
            :options="menuOptions" :value="menuValue" :on-update:value="updateMenu" />
        </n-layout-sider>
        <!-- 右侧内容 -->
        <n-layout-content content-style="padding: 20px;" :native-scrollbar="false">
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
