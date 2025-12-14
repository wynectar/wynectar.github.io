<script setup>
import { ref, computed } from "vue";
import GaugeTemperature from "./GaugeTemperature.vue";
import GaugeHumidity from "./GaugeHumidity.vue";
import GaugeWind from "./GaugeWind.vue";

const weatherModes = [
  {
    type: "sunny",
    text: "☀️ 晴天模式",
    temperature: 28,
    humidity: 40,
    wind: 8
  },
  {
    type: "cloudy",
    text: "☁️ 多云模式",
    temperature: 18,
    humidity: 65,
    wind: 12
  },
  {
    type: "rainy",
    text: "🌧️ 雨天模式",
    temperature: 12,
    humidity: 85,
    wind: 20
  },
  { type: "random", text: "🎲 随机天气" }
];
const temperature = ref(28);
const humidity = ref(40);
const wind = ref(8);
function updateWeather(v) {
  if (v.type === "random") {
    temperature.value = Math.floor(Math.random() * 40);
    humidity.value = Math.floor(Math.random() * 100);
    wind.value = Math.floor(Math.random() * 30);
  } else {
    temperature.value = v.temperature;
    humidity.value = v.humidity;
    wind.value = v.wind;
  }
}
</script>

<template>
  <div class="body">
    <div class="weather-dashboard">
      <h1>🌤️ 天气仪表盘</h1>
      <div class="dashboard-container">
        <GaugeTemperature :value="temperature" />
        <GaugeHumidity :value="humidity" />
        <GaugeWind :value="wind" />
      </div>
      <div class="controls">
        <button @click="updateWeather(w)" v-for="w in weatherModes" :key="w.type">{{w.text}}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  margin: 0;
  padding: 20px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-dashboard {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #2d3436;
  margin-bottom: 30px;
}

.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.controls {
  margin-top: 30px;
  text-align: center;
}

button {
  background: #00cec9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px 10px;
  transition: background 0.3s;
}

button:hover {
  background: #00b894;
}
</style>