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
        all
    }
}

export default model
