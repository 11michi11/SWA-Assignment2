import model from './model.js'

const module = angular.module('weatherApp', [])

/*/
TWO WAYS DATA BIDING
 */
module.value('$model', {
    place: "Horsens",
    data: {},
    intervalStart: "0",
    intervalEnd: "23",
    dateStart: null,
    dateEnd: null,
    temperature: "",
    precipitation: "",
    precipitation_type: "",
    wind_speed: "",
    wind_direction: "",
    cloud: ""
})

module.component('weatherMeasurementsTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.formatTemp($ctrl.model.lastMeasurements.temperature)}}</td>
              <td>{{$ctrl.formatPrecipitation($ctrl.model.lastMeasurements.precipitation)}}</td>
              <td>{{$ctrl.formatWind($ctrl.model.lastMeasurements.wind)}}</td>
              <td>{{$ctrl.formatCloud($ctrl.model.lastMeasurements.cloud)}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
        this.formatTemp = $scope.$parent.formatTemp
        this.formatHourlyTemp = $scope.$parent.formatHourlyTemp
        this.formatPrecipitation = $scope.$parent.formatPrecipitation
        this.formatHourlyPrecipitation = $scope.$parent.formatHourlyPrecipitation
        this.formatWind = $scope.$parent.formatWind
        this.formatHourlyWind = $scope.$parent.formatHourlyWind
        this.formatCloud = $scope.$parent.formatCloud
        this.formatHourlyCloud = $scope.$parent.formatHourlyCloud
    }]
})

module.component('historyMeasurementsTable', {
    bindings: {attribute: '@'},
    template: `
<p>{{$ctrl.model.place}}</p>
<table>
    <thead>
        <tr>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
    </thead>
        <tbody>
          <tr ng-repeat="data in $ctrl.model.historyData">
              <td>{{$ctrl.formatTemp(data.temperature)}}</td>
              <td>{{$ctrl.formatPrecipitation(data.precipitation)}}</td>
              <td>{{$ctrl.formatWind(data.wind)}}</td>
              <td>{{$ctrl.formatCloud(data.cloud)}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
        this.formatTemp = $scope.$parent.formatTemp
        this.formatHourlyTemp = $scope.$parent.formatHourlyTemp
        this.formatPrecipitation = $scope.$parent.formatPrecipitation
        this.formatHourlyPrecipitation = $scope.$parent.formatHourlyPrecipitation
        this.formatWind = $scope.$parent.formatWind
        this.formatHourlyWind = $scope.$parent.formatHourlyWind
        this.formatCloud = $scope.$parent.formatCloud
        this.formatHourlyCloud = $scope.$parent.formatHourlyCloud
    }]
})

module.component('temperatureTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Minimum temperature</td>
            <td>Maximum temperature</td>
   
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.model.minimumTemperature}}</td>
              <td>{{$ctrl.model.maximumTemperature}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
    }]
})

module.component('precipitationTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Precipitation</td>
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.model.totalPrecipitation}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
    }]
})

module.component('averageWindTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Average wind speed</td>
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.model.averageWindSpeed}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
    }]
})

module.component('dominantWindTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Wind direction</td>
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.model.dominantWindDirection}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
    }]
})

module.component('averageCloudTable', {
    bindings: {attribute: '@'},
    template: `
<table>
    <thead>
        <tr>
            <td>Place</td>
            <td>Cloud coverage</td>
        </tr>
    </thead>
        <tbody>
          <tr>
              <td>{{$ctrl.model.place}}</td>
              <td>{{$ctrl.model.averageCloudCoverage}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
    }]
})

module.component('hourlyPredictionTable', {
    bindings: {attribute: '@'},
    template: `
<h2>{{$ctrl.model.place}}</h2>
<table>
    <thead>
        <tr>
            <td>Hour</td>
            <td>Temperature</td>
            <td>Precipitation</td>
            <td>Wind Speed</td>
            <td>Cloud coverage</td>
        </tr>
    </thead>
    <tbody id='hourly_prediction_horsens_data'>
        <tr ng-repeat="prediction in $ctrl.model.predictions">
            <td>{{$ctrl.formatHour(prediction.temperature.time)}}</td>
            <td>{{$ctrl.formatHourlyTemp(prediction.temperature)}}</td>
            <td>{{$ctrl.formatHourlyPrecipitation(prediction.precipitation)}}</td>
            <td>{{$ctrl.formatHourlyWind(prediction.wind)}}</td>
            <td>{{$ctrl.formatHourlyCloud(prediction.cloud)}}</td>
        </tr>
    </tbody>
</table>
    `,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        this.reload = $scope.$parent.reload
        this.formatTemp = $scope.$parent.formatTemp
        this.formatHourlyTemp = $scope.$parent.formatHourlyTemp
        this.formatPrecipitation = $scope.$parent.formatPrecipitation
        this.formatHourlyPrecipitation = $scope.$parent.formatHourlyPrecipitation
        this.formatWind = $scope.$parent.formatWind
        this.formatHourlyWind = $scope.$parent.formatHourlyWind
        this.formatCloud = $scope.$parent.formatCloud
        this.formatHourlyCloud = $scope.$parent.formatHourlyCloud
        this.formatHour = $scope.$parent.formatHour
    }]
})

const temperatureType = 'temperature'
const precipitationType = 'precipitation'
const windType = 'wind speed'
const cloudType = 'cloud coverage'

module.controller('WeatherController', function ($scope, $model, $http) {
    $scope.model = $model
    loadData($scope, $model, $http, $model.place)

    $scope.changePlace = place => {
        loadData($scope, $model, $http, place)
    }

    $scope.changeInterval = () => {
        loadData($scope, $model, $http, $model.place, $model.intervalStart, $model.intervalEnd)
    }

    $scope.changeDateInterval = () => {
        loadData($scope, $model, $http, $model.place, null, null, $model.dateStart,$model.dateEnd)
    }

    $scope.reload = () => {
        loadData($scope, $model, $http, $model.place)
    }

    $scope.submit = () => {
        postData($http, $model, $scope)
    }

    $scope.formatTemp = formatTemp
    $scope.formatHourlyTemp = formatHourlyTemp
    $scope.formatPrecipitation = formatPrecipitation
    $scope.formatHourlyPrecipitation = formatHourlyPrecipitation
    $scope.formatWind = formatWind
    $scope.formatHourlyWind = formatHourlyWind
    $scope.formatCloud = formatCloud
    $scope.formatHourlyCloud = formatHourlyCloud
    $scope.formatHour = formatHour
})


function loadData($scope, $model, $http, place,intervalStart,intervalEnd,dateStart,dateEnd) {
    let aModel
    $http.get(`http://localhost:8080/data/${place}`)
        .then(({data: measurements}) => {
            $http.get(`http://localhost:8080/forecast/${place}`)
                .then(({data: forecasts}) => {
                    const groupedData = measurements.reduce((types, entry) => {
                        const type = (types[entry.type] || []);
                        type.push(entry);
                        types[entry.type] = type;
                        return types;
                    }, {});
                    const groupedForecasts = forecasts.reduce((types, entry) => {
                        const type = (types[entry.type] || []);
                        type.push(entry);
                        types[entry.type] = type;
                        return types;
                    }, {});
                    aModel = model(
                        place,
                        groupedData[temperatureType],
                        groupedData[precipitationType],
                        groupedData[windType],
                        groupedData[cloudType],
                        groupedForecasts[temperatureType],
                        groupedForecasts[precipitationType],
                        groupedForecasts[windType],
                        groupedForecasts[cloudType],
                        () => true
                    );
                    $scope.model.data = aModel
                    $scope.model.lastMeasurements = aModel.lastMeasurement
                    $scope.model.historyData = aModel.getHistoryMeasurements(dateStart,dateEnd)
                    $scope.model.predictions = aModel.getPredictions(intervalStart, intervalEnd)
                    $scope.model.minimumTemperature = aModel.getMinimumTemperature()
                    $scope.model.maximumTemperature = aModel.getMaximumTemperature()
                    $scope.model.totalPrecipitation = aModel.getTotalPrecipitation()
                    $scope.model.averageWindSpeed = aModel.getAverageWindSpeed()
                    $scope.model.dominantWindDirection = aModel.getDominantWindDirection()
                    $scope.model.averageCloudCoverage = aModel.getAverageCloudCoverage()
                });
        });
}

function postData($http, $model, $scope) {
    let date = new Date()
    date = date.toISOString()
    let data = [{
        "type": temperatureType,
        "time": date,
        "place": $model.place,
        "value": Number($model.temperature),
        "unit": "C"
    }, {
        "type": precipitationType,
        "time": date,
        "place": $model.place,
        "value": Number($model.precipitation),
        "unit": "mm",
        "precipitation_type": $model.precipitation_type
    }, {
        "type": windType,
        "time": date,
        "place": $model.place,
        "value": Number($model.wind_speed),
        "unit": "m/s",
        "direction": $model.wind_direction
    }, {
        "type": cloudType,
        "time": date,
        "place": $model.place,
        "value": Number($model.cloud),
        "unit": "%"
    }]
    console.log(data)
    $http.post(`http://localhost:8080/data`, data).then(
        (response) => {
            console.log(response)
            $scope.reload()
        }
    )
}

function formatHour(time) {
    let date = new Date(time)
    return `${date.getHours()}:${date.getMinutes()}0`
}

function formatTemp(temp) {
    if (temp != null) {
        return `${temp.value} ${temp.unit} at ${temp.time}`
    }
}

function formatHourlyTemp(temp) {
    if (temp != null) {
        return `from ${temp.from} ${temp.unit} to ${temp.to} ${temp.unit}`
    }
}

function formatPrecipitation(prec) {
    if (prec != null) {
        return `${prec.value}${prec.unit} of ${prec.precipitation_type} at ${prec.time}`
    }
}

function formatHourlyPrecipitation(prec) {
    if (prec != null) {
        return `from ${prec.from}${prec.unit} to ${prec.to}${prec.unit} of ${prec.precipitation_types.join(", ")} `
    }
}

function formatWind(wind) {
    if (wind != null) {
        return `${wind.value}${wind.unit} from ${wind.direction} at ${wind.time}`
    }
}

function formatHourlyWind(wind) {
    if (wind != null) {
        return `from ${wind.from} ${wind.unit} to ${wind.to} ${wind.unit} from directions: ${wind.directions.join(", ")} `
    }
}

function formatCloud(cloud) {
    if (cloud != null) {
        return `${cloud.value}${cloud.unit} at ${cloud.time}`
    }
}

function formatHourlyCloud(cloud) {
    if (cloud != null) {
        return `from ${cloud.from} ${cloud.unit} to ${cloud.to} ${cloud.unit}`
    }
}

