import model from './model.js'

const module = angular.module('weatherApp', [])

module.value('$model', {place: "Horsens", data: {}})

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
              <td>Horsens</td>
              <td>{{$ctrl.formatTemp($ctrl.model.lastMeasurements.temperature)}}</td>
              <td>{{$ctrl.formatPrecipitation($ctrl.model.lastMeasurements.precipitation.value)}}</td>
              <td>{{$ctrl.formatWind($ctrl.model.lastMeasurements.wind.value)}}</td>
              <td>{{$ctrl.formatCloud($ctrl.model.lastMeasurements.cloud.value)}}</td>
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
        console.log(this)
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
            <td>{{prediction.temperature.time}}</td>
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
        console.log(this)
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

    $scope.reload = () => {
        loadData($scope, $model, $http, $model.place)
    }

    $scope.formatTemp = formatTemp
    $scope.formatHourlyTemp = formatHourlyTemp
    $scope.formatPrecipitation = formatPrecipitation
    $scope.formatHourlyPrecipitation = formatHourlyPrecipitation
    $scope.formatWind = formatWind
    $scope.formatHourlyWind = formatHourlyWind
    $scope.formatCloud = formatCloud
    $scope.formatHourlyCloud = formatHourlyCloud
})


function loadData($scope, $model, $http, place) {
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
                        'Horsens',
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
                    $scope.model.predictions = aModel.getPredictions();
                });
        });
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

