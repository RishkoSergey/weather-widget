export interface ICoordinates {
  lat: number
  lon: number
}

export interface IWeatherResponse {
  coord: ICoordinates
  weather: {
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    // eslint-disable-next-line camelcase
    feels_like: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  },
  sys: {
    country: string
  }
  name: string
  id: number
}
