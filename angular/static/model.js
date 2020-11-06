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

    const getLastMeasurement = () => model(
        place,
        temperature[temperature.length - 1],
        precipitation[precipitation.length - 1],
        wind[wind.length - 1],
        cloud[cloud.length - 1],
        temperaturePrediction,
        precipitationPrediction,
        windPrediction,
        cloudPrediction
    )

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
        getLastMeasurement
    }
}

export default model
