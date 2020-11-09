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

    const temperatureData = () => temperature?.filter(filter? x => filter: () => true)
    console.log(filter)
    console.log("temperature")
    console.log(temperature)
    console.log("temperatureData")
    console.log(temperatureData().length)
    const precipitationData = () => precipitation.filter(x=> filter)
    console.log("precip")
    console.log(precipitation)
    console.log("precipitationData")
    console.log(precipitationData().length)
    const windData = () => wind?.filter(filter? filter: ()=>true)
    const cloudData = () => cloud?.filter(filter? filter: ()=>true)
    const temperaturePredictionData = () => temperaturePrediction?.filter(()=>true)
    const precipitationPredictionData = () => precipitationPrediction?.filter(()=>true)
    const windPredictionData = () => windPrediction?.filter(()=>true)
    const cloudPredictionData = () => cloudPrediction?.filter(()=>true)

    const filtered = (from,to) => model(
        place,
        temperature,
        precipitation,
        wind,
        cloud,
        temperaturePrediction,
        precipitationPrediction,
        windPrediction,
        cloudPrediction,
        filter = (from,to,x) => {
            console.log(from)
            console.log(to)
            console.log(x)
            return from<=new Date(x.time) && new Date(x.time)<=to}
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