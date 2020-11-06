import React from 'react'

// const EmployeeData = ({person: {id, name, employeeId, salary, manager}, dispatcher}) => {
//     if (employeeId) 
//         return [<td key='empId'>{employeeId}</td>, <td key='salary'>{salary}</td>, <td key='manager'>{manager.toString()}</td>]
//     else
//         return [<td colspan="3" key='hire'>
//             <button onClick = {() => dispatcher()({type:'hire', id})}>Hire</button>
//         </td>]
// }

// const PersonData = ({person, dispatcher}) => [
//     <td key='id'>{person.id}</td>,
//     <td key='name'>{person.name}</td>,
//     ...EmployeeData({person, dispatcher})
// ] 

// const PersonRow = (props) => (
//     <tr>
//         <PersonData {...props}/>
//     </tr>
// )

// const PersonDataBody = ({model, dispatcher}) => (
//     <tbody>
//         {
//             model.personData().map(person => <PersonRow key={person.id.toString()} {...{person, dispatcher}}/>)
//         }
//     </tbody>
// )

const LatestData = ({model, dispatcher}) => {

    let latest = model.latest();
    return [
        <td key='place'>{latest.place}</td>,
        <td key='temperature'>{formatTemp(latest.temperatureData()[0])}</td>,
        <td key='precipitation'>{formatPrecipitation(latest.precipitationData()[0])}</td>,
        <td key='wind'>{formatWind(latest.windData()[0])}</td>,
        <td key='cloud'>{formatCloud(latest.cloudData()[0])}</td>,
        <td key='reload'>
                <button onClick = {() => dispatcher({type:'loadDataForPlace', place: latest.place})}>Reload</button>
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

export default dispatcher => model => (
    // <div id='base'>
    //     <h1>People</h1>
    //     <table id='employees'>
    //         <thead><tr><td>Id</td><td>Name</td><td>Employee id</td><td>Salary</td><td>Manager</td></tr></thead>
    //         <PersonDataBody {...{model, dispatcher}}/>
    //     </table>
    // </div>
    <div id='base'>
        <div class="dropdown">
            <button class="dropbtn">Dropdown 
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div> 
        </div>
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

    {/* <h1>Temperature for last 5 days</h1>
    <table id='minimum_temperature'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Minimum Temperature</td>
            <td>Maximum Temperature</td>
        </tr>
        </thead>
        <tbody id='minimum_temperature_data'></tbody>
    </table>

    <h1>Total precipitation for last 5 days</h1>
    <table id='total_precipitation'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Precipitation</td>
        </tr>
        </thead>
        <tbody id='total_precipitation_data'></tbody>
    </table>

    <h1>Average Wind Speed for last 5 days</h1>
    <table id='average_wind_speed'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Average wind speed</td>
        </tr>
        </thead>
        <tbody id='average_wind_speed_data'></tbody>
    </table>

    <h1>Dominant wind direction for last 5 days</h1>
    <table id='wind_direction'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Wind direction</td>
        </tr>
        </thead>
        <tbody id='wind_direction_data'></tbody>
    </table>

    <h1>Average cloud coverage for the last 5 day</h1>
    <table id='average_cloud_coverage'>
        <thead>
        <tr>
            <td>Place</td>
            <td>Cloud coverage</td>
        </tr>
        </thead>
        <tbody id='average_cloud_coverage_data'></tbody>
    </table>

    <h1>Hourly predictions for the next 24 hours</h1>
    <h2>Horsens</h2>
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
        <tbody id='hourly_prediction_horsens_data'></tbody>
    </table>

    <h2>Aarhus</h2>
    <table id='hourly_prediction_aarhus'>
        <thead>
        <tr>
            <td>Hour</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
        </thead>
        <tbody id='hourly_prediction_aarhus_data'></tbody>
    </table>

    <h2>Copenhagen</h2>
    <table id='hourly_prediction_copenhagen'>
        <thead>
        <tr>
            <td>Hour</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
        </thead>
        <tbody id='hourly_prediction_copenhagen_data'></tbody>
    </table> */}
    </div>
)