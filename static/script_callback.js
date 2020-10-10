const temperatureType = 'temperature'
const precipitationType = 'precipitation'
const windType = 'wind speed'
const cloudType = 'cloud coverage'

const waetherMeasurmentsTable = "weather_measurements_data"
const minimumTemperatureTable = "minimum_temperature_data"
const totalPrecipitationTable = "total_precipitation_data"
const averageWindSpeedTable = "average_wind_speed_data"
const dominantWindDirectionTable = "wind_direction_data"
const averageCloudCoverageTable = "average_cloud_coverage_data"
const hourlyPredictionHorsensTable = "hourly_prediction_horsens_data"
const hourlyPredictionAarhusTable = "hourly_prediction_aarhus_data"
const hourlyPredictionCopenhagenTable = "hourly_prediction_copenhagen_data"

function init() {
    let horsens
    let aarhus
    let copenhagen

    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/data/Horsens`)
    request.send()
    request.onload = () => {
        horsens = JSON.parse(request.responseText)
        horsens = groupDataByType(horsens)
        request.open('GET', `http://localhost:8080/data/Aarhus`)
        request.send()
        request.onload = () => {
            aarhus = JSON.parse(request.responseText)
            aarhus = groupDataByType(aarhus)
            request.open('GET', `http://localhost:8080/data/Copenhagen`)
            request.send()
            request.onload = () => {
                copenhagen = JSON.parse(request.responseText)
                copenhagen = groupDataByType(copenhagen)
                const data = {
                    'horsens': horsens,
                    'aarhus': aarhus,
                    'copenhagen': copenhagen
                }
                createTable(waetherMeasurmentsTable, createMeasurementsCell, data)
                createTable(minimumTemperatureTable, createMinMaxTempCell, data)
                createTable(totalPrecipitationTable, createPrecipitationCell, data)
                createTable(averageWindSpeedTable, createAverageWindCell, data)
                createTable(dominantWindDirectionTable, createWindDirectionCell, data)
                createTable(averageCloudCoverageTable, createCloudCoverageCell, data)

                request.open('GET', `http://localhost:8080/forecast/Horsens`)
                request.send()
                request.onload = () => {
                    let horsens_predictions = JSON.parse(request.responseText)
                    horsens_predictions = groupDataByType(horsens_predictions);
                    createHourlyTable(hourlyPredictionHorsensTable, createHourlyPredictionCell, horsens_predictions)
                    request.open('GET', `http://localhost:8080/forecast/Aarhus`)
                    request.send()
                    request.onload = () => {
                        let aarhus_predictions = JSON.parse(request.responseText)
                        aarhus_predictions = groupDataByType(aarhus_predictions);
                        createHourlyTable(hourlyPredictionAarhusTable, createHourlyPredictionCell, aarhus_predictions)
                        request.open('GET', `http://localhost:8080/forecast/Copenhagen`)
                        request.send()
                        request.onload = () => {
                            let copenhagen_predictions = JSON.parse(request.responseText)
                            copenhagen_predictions = groupDataByType(copenhagen_predictions);
                            createHourlyTable(hourlyPredictionCopenhagenTable, createHourlyPredictionCell, copenhagen_predictions)
                        }
                    }
                }
            }
        }
    }
}


function groupDataByType(data) {
    // Group by data type
    return data.reduce((types, entry) => {
        const type = (types[entry.type] || [])
        type.push(entry)
        types[entry.type] = type
        return types
    }, {});
}

function createTable(tableId, cellFactory, data) {
    const table = document.getElementById(tableId)

    cellFactory(table, "Horsens", data['horsens'])
    cellFactory(table, "Aarhus", data['aarhus'])
    cellFactory(table, "Copenhagen", data['copenhagen'])
}


function createHourlyTable(tableId, cellFactory, data) {
    const table = document.getElementById(tableId)
    for (let i = 0; i < 24; i++) {
        let time = data['cloud coverage'][i].time
        let date = new Date(time)
        cellFactory(table,`${date.getHours()}:${date.getMinutes()}0`, data, i)
    }
}

function createMeasurementsCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(getLastMeasurementForDataType(temperatureType, data, formatTemp)))
    tr.insertCell().appendChild(document.createTextNode(getLastMeasurementForDataType(precipitationType, data, formatPrecipitation)))
    tr.insertCell().appendChild(document.createTextNode(getLastMeasurementForDataType(windType, data, formatWind)))
    tr.insertCell().appendChild(document.createTextNode(getLastMeasurementForDataType(cloudType, data, formatCloud)))
}

function createMinMaxTempCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(findMinimumTemperature(data[temperatureType].slice(-5))))
    tr.insertCell().appendChild(document.createTextNode(findMaximumTemperature(data[temperatureType].slice(-5))))
}

function createPrecipitationCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(findTotalPrecipitation(data[temperatureType].slice(-5))))
}

function createAverageWindCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(findAverage(data[windType].slice(-5))))
}

function createWindDirectionCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(findDominantWindDirection(data[windType].slice(-5))))
}

function createCloudCoverageCell(table, place, data) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(place))
    tr.insertCell().appendChild(document.createTextNode(findAverage(data[cloudType].slice(-5))))
}

function createHourlyPredictionCell(table, time, data, index) {
    const tr = table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(time))
    tr.insertCell().appendChild(document.createTextNode(formatHourlyTemp(data['temperature'][index])))
    tr.insertCell().appendChild(document.createTextNode(formatHourlyPrecipitation(data['precipitation'][index])))
    tr.insertCell().appendChild(document.createTextNode(formatHourlyWind(data['wind speed'][index])))
    tr.insertCell().appendChild(document.createTextNode(formatHourlyCloud(data['cloud coverage'][index])))
}

function getLastMeasurementForDataType(type, data, format) {
    const typeData = data[type];
    const result = typeData[typeData.length - 1];
    return format ? format(result) : result;
}

function findMinimumTemperature(data) {
    return Math.min(...data.map(entry => entry.value)).toString();
}

function findMaximumTemperature(data) {
    return Math.max(...data.map(entry => entry.value)).toString();
}

function findTotalPrecipitation(data) {
    return data
        .map(entry => entry.value)
        .reduce((total, entry) => {
            return total + entry;
        }, 0).toFixed(1)
}

function findAverage(data) {
    return data
        .map(entry => entry.value)
        .reduce((total, entry) => {
            return total + entry / data.length;
        }, 0).toFixed(1)
}

function findDominantWindDirection(data) {
    return data
        .map(entry => entry.direction)
        .sort((a, b) =>
            data.filter(value => value === a).length - data.filter(value => value === b).length
        ).pop()
}

function formatTemp(temp) {
    return `${temp.value} ${temp.unit} at ${temp.time}`
}

function formatHourlyTemp(temp) {
    return `from ${temp.from} ${temp.unit} to ${temp.to} ${temp.unit}`
}

function formatPrecipitation(prec) {
    return `${prec.value}${prec.unit} of ${prec.precipitation_type} at ${prec.time}`
}

function formatHourlyPrecipitation(prec) {
    return `from ${prec.from}${prec.unit} to ${prec.to}${prec.unit} of ${prec.precipitation_types.join(", ")} `
}

function formatWind(wind) {
    return `${wind.value}${wind.unit} from ${wind.direction} at ${wind.time}`
}

function formatHourlyWind(wind) {
    return `from ${wind.from} ${wind.unit} to ${wind.to} ${wind.unit} from directions: ${wind.directions.join(", ")} `
}

function formatCloud(cloud) {
    return `${cloud.value}${cloud.unit} at ${cloud.time}`
}

function formatHourlyCloud(cloud) {
    return `from ${cloud.from} ${cloud.unit} to ${cloud.to} ${cloud.unit}`
}