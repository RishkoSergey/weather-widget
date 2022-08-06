<template>
  <div class="widget">
    <img
      v-if="!isSettingsExist"
      src="@/assets/settings.png"
      class="widget__settings"
      @click="showSettings = true"
    >
    <CityCard
      v-for="city in citiesList"
      :key="city.id"
      :weather-data="city"
    />
    <SettingsPage
      v-if="showSettings"
      :cities-list="citiesList"
      @close="showSettings = false"
      @save="saveSettings"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import CityCard from './components/CityCard.vue'
import SettingsPage from './components/SettingsPage.ce.vue'
import { ICoordinates, IWeatherResponse } from './types'

const apiKey = process.env.VUE_APP_API_KEY
const url = process.env.VUE_APP_URL

const coordList = ref<ICoordinates[]>([])

coordList.value = JSON.parse(window.localStorage.getItem('coordinates') as string) || []

const citiesList = ref<IWeatherResponse[]>([])

const showSettings = ref(false)

const isSettingsExist = ref(false)

const saveSettings = (data: IWeatherResponse[]) => {
  citiesList.value = data
  window.localStorage.setItem('coordinates', JSON.stringify(citiesList.value.map(item => item.coord)))
  showSettings.value = false
  isSettingsExist.value = true
}

const getWeatherByCoord = async (coordinates: ICoordinates[]) => {
  for (const coord of coordinates) {
    const { data } = await axios
      .get(`${url}/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`)
    citiesList.value.push(data)
  }
}

if (!coordList.value.length) {
  const currentLocation = ref<ICoordinates>({} as ICoordinates)

  const userLocationSuccess = (position: any) => {
    currentLocation.value.lat = position.coords.latitude
    currentLocation.value.lon = position.coords.longitude
    getWeatherByCoord([currentLocation.value])
  }

  const userLocationError = (err: any) => {
    console.log(err)
  }

  navigator.geolocation.getCurrentPosition(userLocationSuccess, userLocationError)
} else {
  isSettingsExist.value = true
  getWeatherByCoord(coordList.value)
}
</script>

<style lang="scss">
.widget {
  font-family: 'GolosText', sans-serif;
  padding: 30px;
  width: 25%;
  min-width: 300px;
  position: relative;

  &__settings {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}

.city-card {
  width: 100%;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  &__city {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__icon-block {
    margin-bottom: 20px;
    display: flex;

    &__icon {
      width: 50%;
      height: auto;
      margin-right: 20px;
    }

    &__temp {
      font-size: 48px;
      font-weight: 600;
    }
  }

  &__feels-like,
  &__wind-block,
  &__visibility-block {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  &__wind-block,
  &__visibility-block {
    display: flex;
    & > div {
      width: 50%;

      &:first-child {
        padding-right: 15px;
      }
    }
  }

  &__wind-block {
    &__wind, &__pressure {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: auto;
        margin-right: 15px;
      }
    }
  }
}

.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    &__close {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }

  &__list {
    margin-bottom: 20px;

    &__item {
      background: lightgray;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    &__delete, &__drag {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  &__new {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    &__input {
      width: calc(100% - 35px);
      height: 25px;

      &.warning {
        border: 1px solid red;
      }
    }

    &__image {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    &__warning {
      color: red;
      margin-top: 10px;
    }
  }

  &__save {
    width: 140px;
    height: 40px;
    cursor: pointer;
    background: grey;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px auto 0;
  }
}
</style>
