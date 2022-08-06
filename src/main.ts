import { defineCustomElement } from 'vue'

import WeatherWidget from './weather-widget.ce.vue'

customElements.define('weather-widget', defineCustomElement(WeatherWidget))
