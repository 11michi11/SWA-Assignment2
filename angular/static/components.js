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
              <td>{{$ctrl.model.lastMeasurements.temperature.value}}</td>
              <td>{{$ctrl.model.lastMeasurements.precipitation.value}}</td>
              <td>{{$ctrl.model.lastMeasurements.wind.value}}</td>
              <td>{{$ctrl.model.lastMeasurements.cloud.value}}</td>
          </tr>
    </tbody>
</table>`,
    controller: ['$model', '$scope', function ($model, $scope) {
        this.model = $model
        this.changePlace = $scope.$parent.changePlace
        console.log(this)
    }]
})

const temperatureType = 'temperature'
const precipitationType = 'precipitation'
const windType = 'wind speed'
const cloudType = 'cloud coverage'

module.controller('WeatherController', function ($scope, $model, $http) {
    $scope.model = $model
    let aModel
    $http.get(`http://localhost:8080/data/Horsens`)
        .then(({data: measurements}) => {
            $http.get(`http://localhost:8080/forecast/Horsens`)
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
                    $scope.model.lastMeasurements = aModel.getLastMeasurement
                });
        });
    $scope.changePlace = place => {
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
                        $scope.model.lastMeasurements = aModel.getLastMeasurement
                    });
            });
    }
})


