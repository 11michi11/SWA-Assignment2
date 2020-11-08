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

    const reload = (
        place,               
        temperature,
        precipitation,
        wind,
        cloud,
        temperaturePrediction,
        precipitationPrediction,
        windPrediction,
        cloudPrediction) => model(
            place,               
            temperature,
            precipitation,
            wind,
            cloud,
            temperaturePrediction,
            precipitationPrediction,
            windPrediction,
            cloudPrediction,
            filter
        )

    const temperatureData = () => temperature?.filter(filter)
    const precipitationData = () => precipitation?.filter(filter)
    const windData = () => wind?.filter(filter)
    const cloudData = () => cloud?.filter(filter)
    const temperaturePredictionData = () => temperaturePrediction?.filter(filter)
    const precipitationPredictionData = () => precipitationPrediction?.filter(filter)
    const windPredictionData = () => windPrediction?.filter(filter)
    const cloudPredictionData = () => cloudPrediction?.filter(filter)

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

    const latest = () => model(
        place,
        findLatest(temperature),
        findLatest(precipitation),
        findLatest(wind),
        findLatest(cloud)
    )

    const lastFive = () => model(
        place,
        getLastFive(temperature),
        getLastFive(precipitation),
        getLastFive(wind),
        getLastFive(cloud)
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
        latest,
        lastFive,
        reload,
        all
    }
}

export default model

function findLatest(data) {
    return [data[data.length-1]];
}

function getLastFive(data) {
    return data.slice(-5);
}