const temperatureType = 'temperature'
const precipitationType = 'precipitation'
const windType = 'wind speed'
const cloudType = 'cloud coverage'

const waetherMeasurmentsTable = "weather_measurements_data";
const minimumTemperatureTable = "minimum_temperature_data";
const totalPrecipitationTable = "total_precipitation_data";

async function init() {

    const horsens = await getGroupedDataForPlace("Horsens")
    const aarhus = await getGroupedDataForPlace("Aarhus")
    const copenhagen = await getGroupedDataForPlace("Copenhagen")

    const data = {
        'horsens':horsens,
        'aarhus':aarhus,
        'copenhagen':copenhagen
    }

    createTable(waetherMeasurmentsTable, createMeasurementsCell, data)
    createTable(minimumTemperatureTable, createMinMaxTempCell, data)
    createTable(totalPrecipitationTable, createPrecipitationCell, data)
}

async function getGroupedDataForPlace(place) {
    const response = await fetch(`http://localhost:8080/data/${place}`)
    const data = await response.json();

    // Group by data type
    return data.reduce((types, entry) => {
        const type = (types[entry.type] || []);
        type.push(entry);
        types[entry.type] = type;
        return types;
    }, {});
}

function createTable(tableId, cellFactory, data) {
    const table = document.getElementById(tableId)

    cellFactory(table, "Horsens", data['horsens'])
    cellFactory(table, "Aarhus", data['aarhus'])
    cellFactory(table, "Copenhagen", data['copenhagen'])
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
    tr.insertCell().appendChild(document.createTextNode(findTotalPrecipitation(data[temperatureType].slice(-5))));
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
        .map(entry => entry.value).reduce((total, entry) => {
            return total + entry;
        }, 0).toFixed(1)
}

function formatTemp(temp) {
    return `${temp.value} ${temp.unit} at ${temp.time}`
}

function formatPrecipitation(prec) {
    return `${prec.value}${prec.unit} of ${prec.precipitation_type} at ${prec.time}`
}

function formatWind(wind) {
    return `${wind.value}${wind.unit} from ${wind.direction} at ${wind.time}`
}

function formatCloud(cloud) {
    return `${cloud.value}${cloud.unit} at ${cloud.time}`
}