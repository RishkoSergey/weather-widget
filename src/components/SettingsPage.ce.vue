<template>
<div class="settings">
  <div class="settings__header">
    Settings
    <img
      src="@/assets/close.png"
      class="settings__header__close"
      @click="emits('close')"
    >
  </div>
    <div clas="settings__list">
      <draggable v-model="cities" item-key="id">
        <template #item="{element}">
          <div class="settings__list__item">
            <img src="@/assets/drag.png" class="settings__list__drag">
            {{ element.name }}, {{ element.sys.country }}
            <img
              src="@/assets/delete.png"
              class="settings__list__delete"
              @click="deleteCity(element.id)"
            >
          </div>
        </template>
      </draggable>
    </div>
  <div class="settings__new">
    <input
      type="text"
      v-model="inputCity"
      class="settings__new__input"
      :class="{warning: inputWarning}"
      placeholder="Type city"
    />
    <img
      src="@/assets/add.png"
      class="settings__new__image"
      @click="getCoordsByCity"
    >
    <div
      v-if="inputWarning"
      class="settings__new__warning"
    >
      We can't find this city.<br>Please try to type the city name again
    </div>
  </div>
  <div
    class="settings__save"
    @click="emits('save', cities)"
  >
    Save
  </div>
</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { IWeatherResponse } from '../types'
import draggable from 'vuedraggable'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'

const props = defineProps<{
  citiesList: IWeatherResponse[]
}>()

const emits = defineEmits(['close', 'save'])

const cities = ref<IWeatherResponse[]>(cloneDeep(props.citiesList))

const apiKey = '7148d04d70acb0c5f3981134ebefa9b1'

const inputCity = ref('')

const inputWarning = ref(false)

const url = process.env.VUE_APP_URL

const getCoordsByCity = async () => {
  const { data } = await axios
    .get(`${url}/geo/1.0/direct?q=${inputCity.value}&appid=${apiKey}`)

  if (data.length) {
    const city = data[0]
    const weather = await axios
      .get(`${url}/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)

    cities.value.push(weather.data)
    inputCity.value = ''
    inputWarning.value = false
  } else {
    inputWarning.value = true
  }
}

const deleteCity = (id: number) => {
  const idx = cities.value.findIndex(item => item.id === id)
  cities.value.splice(idx, 1)
}
</script>
