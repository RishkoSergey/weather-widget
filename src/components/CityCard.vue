<template>
  <div class="city-card">
    <div class="city-card__city">
      {{ `${props.weatherData.name}, ${props.weatherData.sys.country}` }}
    </div>
    <div class="city-card__icon-block">
      <img
        :src="`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`"
        class="city-card__icon-block__icon"
      >
      <div class="city-card__icon-block__temp">
        {{ Math.round(props.weatherData.main.temp - 273.15) }} ºC
      </div>
    </div>
    <div class="city-card__feels-like">
      Feels like {{ Math.round(props.weatherData.main.feels_like - 273.15) }} ºC, {{ props.weatherData.weather[0].description }}
    </div>
    <div class="city-card__wind-block">
      <div class="city-card__wind-block__wind">
        <img src="@/assets/wind.png">
        <div>{{ props.weatherData.wind.speed }} m/s</div>
      </div>
      <div class="city-card__wind-block__pressure">
        <img src="@/assets/pressure.png">
        <div>{{ props.weatherData.main.pressure }} hPa</div>
      </div>
    </div>
    <div class="city-card__visibility-block">
      <div class="city-card__visibility-block__visibility">
        Visibility: {{ props.weatherData.visibility }} km
      </div>
      <div class="city-card__visibility-block__humidity">
        Humidity: {{ props.weatherData.main.humidity }} %
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { IWeatherResponse } from '../types'

const props = defineProps<{
  weatherData: IWeatherResponse
}>()
</script>
