const model = (place,
               temperature,
               precipitation,
               wind,
               cloud,
               temperaturePrediction,
               precipitationPrediction,
               windPrediction,
               cloudPrediction,
) => {

    const all = () => model(
        place,
        temperature,
        precipitation,
        wind,
        cloud,
        temperaturePrediction,
        precipitationPrediction,
        windPrediction,
        cloudPrediction
    )

    const lastMeasurement = {
        temperature: temperature[temperature.length - 1],
        precipitation: precipitation[precipitation.length - 1],
        wind: wind[wind.length - 1],
        cloud: cloud[cloud.length - 1],
    }

    const getMinimumTemperature = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < temperature.length; i++) {
                let date = new Date(temperature[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(temperature[i])
                }
            }
        } else {
            /*
            * If interval is not selected return min temperature for last 5 days
            * */
            return Math.min(...temperature.slice(-5 * 24).map(entry => entry.value))
        }
        return Math.min(...result.map(entry => entry.value))
    }

    const getMaximumTemperature = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < temperature.length; i++) {
                let date = new Date(temperature[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(temperature[i])
                }
            }
        } else {
            /*
           * If interval is not selected return max temperature for last 5 days
           * */
            return Math.max(...temperature.slice(-5 * 24).map(entry => entry.value))
        }
        return Math.max(...result.map(entry => entry.value))
    }

    const getTotalPrecipitation = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < precipitation.length; i++) {
                let date = new Date(precipitation[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(precipitation[i])
                }
            }
        } else {
            /*
           * If interval is not selected return precipitation for last 5 days
           * */
            return precipitation
                .slice(-5 * 24)
                .map(entry => entry.value)
                .reduce((total, entry) => {
                    return total + entry;
                }, 0).toFixed(1)
        }
        return result
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry;
            }, 0).toFixed(1)
    }

    const getAverageWindSpeed = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < wind.length; i++) {
                let date = new Date(wind[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(wind[i])
                }
            }
        } else {
            /*
           * If interval is not selected return wind speed for last 5 days
           * */
            return wind
                .slice(-5 * 24)
                .map(entry => entry.value)
                .reduce((total, entry) => {
                    return total + entry / wind.length;
                }, 0).toFixed(1)
        }
        return result
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry / result.length;
            }, 0).toFixed(1)
    }

    const getDominantWindDirection = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < wind.length; i++) {
                let date = new Date(wind[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(wind[i])
                }
            }
        } else {
            /*
           * If interval is not selected return wind direction for last 5 days
           * */
            return wind
                .slice(-5 * 24)
                .map(entry => entry.direction)
                .sort((a, b) =>
                    wind.filter(value => value === a).length - wind.filter(value => value === b).length
                ).pop()
        }
        return result
            .map(entry => entry.direction)
            .sort((a, b) =>
                wind.filter(value => value === a).length - result.filter(value => value === b).length
            ).pop()


    }

    const getAverageCloudCoverage = (intervalStart, intervalEnd) => {
        let result = []
        if (intervalStart != null && intervalEnd != null) {
            for (let i = 0; i < cloud.length; i++) {
                let date = new Date(cloud[i].time)
                if (date >= intervalStart && date <= intervalEnd) {
                    result.push(cloud[i])
                }
            }
        } else {
            /*
           * If interval is not selected return cloud coverage for last 5 days
           * */
            return cloud
                .slice(-5 * 24)
                .map(entry => entry.value)
                .reduce((total, entry) => {
                    return total + entry / cloud.length;
                }, 0).toFixed(1)
        }
        return result
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry / result.length;
            }, 0).toFixed(1)
    }

    const getPredictions = (intervalStart, intervalEnd) => {
        let result = []
        for (let i = 0; i < 24; i++) {
            if (intervalStart != null && intervalEnd != null) {
                let date = new Date(temperaturePrediction[i].time)
                if (date.getHours() >= intervalStart && date.getHours() <= intervalEnd) {
                    result.push({
                        temperature: temperaturePrediction[i],
                        precipitation: precipitationPrediction[i],
                        wind: windPrediction[i],
                        cloud: cloudPrediction[i],
                    })
                    result.sort()
                }
            } else {
                result.push({
                    temperature: temperaturePrediction[i],
                    precipitation: precipitationPrediction[i],
                    wind: windPrediction[i],
                    cloud: cloudPrediction[i],
                })
            }
        }
        return result
    }

    return {
        place,
        all,
        lastMeasurement,
        getPredictions,
        getMinimumTemperature,
        getMaximumTemperature,
        getTotalPrecipitation,
        getAverageWindSpeed,
        getDominantWindDirection,
        getAverageCloudCoverage
    }
}

export default model
