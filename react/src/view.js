import React, { useRef } from 'react'

const LatestData = ({model, dispatcher}) => {

    let latest = model.latest();
    return [
        <td key='place'>{latest.place}</td>,
        <td key='temperature'>{formatTemp(latest.temperatureData()[0])}</td>,
        <td key='precipitation'>{formatPrecipitation(latest.precipitationData()[0])}</td>,
        <td key='wind'>{formatWind(latest.windData()[0])}</td>,
        <td key='cloud'>{formatCloud(latest.cloudData()[0])}</td>,
        <td key='reload'>
                <button onClick = {() => dispatcher()({type:'loadDataForPlace', place: latest.place})}>Reload</button>
        </td>
    ] 
}

const LatestDataBody = ({model, dispatcher}) => (
    <tbody>
        <tr>
            <LatestData {...{model,dispatcher}}/>
        </tr>
    </tbody>
)

const LastFiveTables = ({model}) => {
    console.log("LastFIve")
    console.log(this)
    let lastFive = model.lastFive()
    return (
        <div>
            <h1>Temperature for last 5 days</h1>
            <table id='minimum_temperature'>
                <thead>
                <tr>
                    <td>Place</td>
                    <td>Minimum Temperature</td>
                    <td>Maximum Temperature</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <TemperatureMinMaxData {...{lastFive}}/>
                    </tr>
                </tbody>
            </table>
            <h1>Total precipitation for last 5 days</h1>
            <table id='total_precipitation'>
                <thead>
                <tr>
                    <td>Place</td>
                    <td>Precipitation</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <TotalPrecipitaionData {...{lastFive}}/>
                    </tr>
                </tbody>
            </table>
            <h1>Average Wind Speed for last 5 days</h1>
            <table id='average_wind_speed'>
                <thead>
                <tr>
                    <td>Place</td>
                    <td>Average wind speed</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <AverageWindSpeedData {...{lastFive}}/>
                    </tr>
                </tbody>
            </table>

            <h1>Dominant wind direction for last 5 days</h1>
            <table id='wind_direction'>
                <thead>
                <tr>
                    <td>Place</td>
                    <td>Wind direction</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <DominantWindData {...{lastFive}}/>
                    </tr>
                </tbody>
            </table>

            <h1>Average cloud coverage for the last 5 day</h1>
            <table id='average_cloud_coverage'>
                <thead>
                <tr>
                    <td>Place</td>
                    <td>Cloud coverage</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <AverageCloudCoverageData {...{lastFive}}/>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const TemperatureMinMaxData = ({lastFive}) => ([
    <td key='place'>{lastFive.place}</td>,
    <td key='minTemp'>{findMinimumTemperature(lastFive.temperatureData())}</td>,
    <td key='maxTemp'>{findMaximumTemperature(lastFive.temperatureData())}</td>
])


const TotalPrecipitaionData = ({lastFive}) => ([
        <td key='place'>{lastFive.place}</td>,
        <td key='total'>{findTotalPrecipitation(lastFive.precipitationData())}</td>
])

const AverageWindSpeedData = ({lastFive}) => ([
        <td key='place'>{lastFive.place}</td>,
        <td key='averageWind'>{findAverage(lastFive.windData())}</td>
])

const DominantWindData = ({lastFive}) => ([
        <td key='place'>{lastFive.place}</td>,
        <td key='windDirection'>{findDominantWindDirection(lastFive.windData())}</td>
])

const AverageCloudCoverageData = ({lastFive}) => ([
        <td key='place'>{lastFive.place}</td>,
        <td key='coverage'>{findAverage(lastFive.cloudData())}</td>
])

const HourlyPredictionsDataBody = ({model}) => {     
    let rows = [];
    for (let index = 0; index < model.temperaturePredictionData().length; index++) {
        rows.push(<HourlyPredictionsDataRow key={index.toString()} {...{model,index}}/>)                    
    }
    return rows;
}

const HourlyPredictionsDataRow = (props) => (
    <tr>
        <HourlyPredictionsData {...props}/>
    </tr>
)

const HourlyPredictionsData = ({model,index}) => ([
    <td key='time'>{formatHour(model.temperaturePredictionData()[index])}</td>,
    <td key='temperature'>{formatHourlyTemp(model.temperaturePredictionData()[index])}</td>,
    <td key='precipitation'>{formatHourlyPrecipitation(model.precipitationPredictionData()[index])}</td>,
    <td key='wind'>{formatHourlyWind(model.windPredictionData()[index])}</td>,
    <td key='cloud'>{formatHourlyCloud(model.cloudPredictionData()[index])}</td>
])

function formatHour(data) {
    let date = new Date(data.time)
    return `${date.getHours()}:${date.getMinutes()}0`
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

export default dispatcher => model => {
    // let city = useRef();
    let city;
    

return (
    <div id='base'>       
        <button onClick = {() => dispatcher()({type:'loadDataForPlace', place: 'Horsens'})}>Horsens</button>
        <button onClick = {() => dispatcher()({type:'loadDataForPlace', place: 'Aarhus'})}>Aarhus</button>
        <button onClick = {() => dispatcher()({type:'loadDataForPlace', place: 'Copenhagen'})}>Copenhagen</button>
    
    <select name='cities' onChange={console.log(this)} >
        <option value='CRIME' >Crime</option>
        <option value='HISTORY'>History</option>
        <option value='HORROR'>Horror</option>
        <option value='SCIFI'>SciFi</option>
    </select>
    
    {/* {function onCityChanged(element) {
        console.log(element.value)
        // let xxx = React.findDOMNode(this.refs.cities);
        // console.log(xxx.value)
    }} */}

    <h1>Latest weather measurements</h1>
    <table id='weather_measurements'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
        </thead>
        <LatestDataBody {...{model,dispatcher}}/>
    </table>

    <LastFiveTables {...{model}}/> 

    <h1>Hourly predictions for the next 24 hours</h1>
    <h2>{model.place}</h2>
    <table id='hourly_prediction_horsens'>
        <thead>
        <tr>
            <td>Hour</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
        </thead>
        <tbody>
            <HourlyPredictionsDataBody {...{model}}/>
        </tbody>
    </table>
    {/* <p>{findPlace(city)}</p> */}

    </div>
)}


function findPlace(city) {
    var button = city;
    return button.value;
}