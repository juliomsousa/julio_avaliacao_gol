import axios from 'axios'

const api = axios.create({
	baseURL: 'https://www.metaweather.com/api'
})

function getWeatherIconURL(weatherStateAbbr) {
	const baseURL = 'https://www.metaweather.com/static/img/weather'
	const pngURL = `/png/${weatherStateAbbr}.png`
	return baseURL + pngURL
}

function convertToFahrenheit(celsiusTemp) {
	return (celsiusTemp * 9 / 5) + 32
}

async function getWoeid(lattitude, longitude) {
	try {
		const res = await api.get('/location/search', {
			params: {
				lattlong: `${lattitude},${longitude}`
			}
		})

		const nearestCity = res.data[0] // get [0] index of res.data array, which is the nearest city of a given lattitude / longitude
		const woeid = nearestCity.woeid // get the city's "Where On Earth ID"

		return woeid

	} catch (err) {
		console.log('getWoeid error: ', err)
		return null
	}
}

async function getWeatherForecast(lattitude, longitude) {
	try {

		const woeid = await getWoeid(lattitude, longitude)
		const res = await api.get(`/location/${woeid}/`)

		cityInfo = res.data

		const cityTitle = cityInfo.title
		const weather = cityInfo.consolidated_weather
		const celsiusforecast = weather.map(day => {
			return {
				date: day.applicable_date,
				minTemp: day.min_temp,
				maxTemp: day.max_temp,
				weatherStateIcon: getWeatherIconURL(day.weather_state_abbr)
			}
		})
		const fahrenreitforecast = weather.map(day => {
			return {
				date: day.applicable_date,
				minTemp: convertToFahrenheit(day.min_temp),
				maxTemp: convertToFahrenheit(day.max_temp),
				weatherStateIcon: getWeatherIconURL(day.weather_state_abbr)
			}
		})

		return {
			cityTitle: cityTitle,
			celsiusForecast: celsiusforecast,
			fahrenreitForecast: fahrenreitforecast
		}

	} catch (err) {
		console.log('getWeather error: ', err)
		return null
	}
}

export { getWeatherForecast }