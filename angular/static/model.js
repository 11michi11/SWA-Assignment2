const model = (place,
               temperature,
               precipitation,
               wind,
               cloud,
               temperaturePrediction,
               precipitationPrediction,
               windPrediction,
               cloudPrediction,
               filter = () => true
) => {

    const temperatureData = () => temperature.filter(filter)
    const precipitationData = () => precipitation.filter(filter)
    const windData = () => wind.filter(filter)
    const cloudData = () => cloud.filter(filter)
    const temperaturePredictionData = () => temperaturePrediction.filter(filter)
    const precipitationPredictionData = () => precipitationPrediction.filter(filter)
    const windPredictionData = () => windPrediction.filter(filter)
    const cloudPredictionData = () => cloudPrediction.filter(filter)

    const filtered = filter => model(
        place,
        temperatureData,
        precipitationData,
        windData,
        cloudData,
        temperaturePredictionData,
        precipitationPredictionData,
        windPredictionData,
        cloudPredictionData,
        filter
    )

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
        temperature:temperature[temperature.length - 1],
        precipitation:precipitation[precipitation.length - 1],
        wind:wind[wind.length - 1],
        cloud:cloud[cloud.length - 1],
    }

    const getMinimumTemperature = () => {
        return Math.min(...temperature.slice(-5).map(entry => entry.value))
    }

    const getMaximumTemperature = () => {
        return Math.max(...temperature.slice(-5).map(entry => entry.value))
    }

    const getTotalPrecipitation = () => {
        return precipitation
            .slice(-5)
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry;
            }, 0).toFixed(1)
    }

    const getAverageWindSpeed = () => {
        return wind
            .slice(-5)
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry / wind.length;
            }, 0).toFixed(1)
    }

    const getDominantWindDirection = () => {
        return wind
            .slice(-5)
            .map(entry => entry.direction)
            .sort((a, b) =>
                wind.filter(value => value === a).length - wind.filter(value => value === b).length
            ).pop()
    }

    const getAverageCloudCoverage = () => {
        return cloud
            .slice(-5)
            .map(entry => entry.value)
            .reduce((total, entry) => {
                return total + entry / cloud.length;
            }, 0).toFixed(1)
    }

    const getPredictions = () => {
        let result = []
        for(let i = 0;i<24;i++) {
            result.push({
                temperature: temperaturePrediction[i],
                precipitation: precipitationPrediction[i],
                wind: windPrediction[i],
                cloud: cloudPrediction[i],
            })
        }
        return result;
    }

    // const getPredictionByHour = hour => {
    //     let result = []
    //     let predictions = getPredictions();
    //     for (let i = 0;i<predictions.length;i++)  {
    //         let date = new Date(temperaturePrediction[i].time)
    //         if (date.getHours() == hour) {
    //             result.push({
    //                 temperature: temperaturePrediction[i],
    //                 precipitation: precipitationPrediction[i],
    //                 wind: windPrediction[i],
    //                 cloud: cloudPrediction[i],
    //             })
    //             return result;
    //         }
    //     }
    // }


    return {
        place,
        temperatureData,
        precipitationData,
        windData,
        cloudData,
        temperaturePredictionData,
        precipitationPredictionData,
        windPredictionData,
        cloudPredictionData,
        filtered,
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
