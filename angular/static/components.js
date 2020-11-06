import model from './model.js'

const module = angular.module('weatherApp', [])

module.value('$model', { data: [] })

module.component('weatherMeasurementsTable', {
  bindings: { attribute: '@' },
  template: `
<p>{{model.data}}</p>
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
        <tbody id='data'>
          <tr>
              <td>Horsens</td>
              <td>{{$ctrl.model.data.getLastMeasurement().temperature}}</td>
<!--              <td ng-if='employee.employeeId'>{{employee.employeeId}}</td>-->
<!--              <td ng-if='employee.employeeId'>{{employee.salary}}</td>-->
<!--              <td ng-if='employee.employeeId'>{{employee.manager}}</td>-->
<!--              <td colspan='3' ng-if='!employee.employeeId'><button ng-click='$ctrl.hire(employee.id)'>Hire</button></td>-->
          </tr>
    </tbody>
</table>
    
   

<!--<table>-->
<!--    <thead><tr><td>Id</td><td>Name</td><td>Employee id</td><td>Salary</td><td>Manager</td></tr></thead>-->
<!--    <tbody id='employee_data'>-->
<!--        <tr ng-repeat="employee in $ctrl.model[$ctrl.attribute]">-->
<!--            <td>{{employee.id}}</td>-->
<!--            <td>{{employee.name}}</td>-->
<!--            <td ng-if='employee.employeeId'>{{employee.employeeId}}</td>-->
<!--            <td ng-if='employee.employeeId'>{{employee.salary}}</td>-->
<!--            <td ng-if='employee.employeeId'>{{employee.manager}}</td>-->
<!--            <td colspan='3' ng-if='!employee.employeeId'><button ng-click='$ctrl.hire(employee.id)'>Hire</button></td>-->
<!--        </tr>-->
<!--    </tbody>-->
<!--  </table>-->`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $scope.$parent.model
      console.log(this.model)
    // The parent of the component scope is the controller scope
    // this.hire = $scope.$parent.hire
  }]
})

const temperatureType = 'temperature'
const precipitationType = 'precipitation'
const windType = 'wind speed'
const cloudType = 'cloud coverage'

module.controller('WeatherController', async function($scope, $model, $http)  {
    $scope.model = $model
    let aModel
    let response = await $http.get(`http://localhost:8080/data/Horsens`);
    let data = response.data
    // Group by data type
    const groupedData = data.reduce((types, entry) => {
        const type = (types[entry.type] || []);
        type.push(entry);
        types[entry.type] = type;
        return types;
    }, {});

    response = await $http.get(`http://localhost:8080/forecast/Horsens`)
    data = response.data
    // Group by data type
    const groupedForecasts = data.reduce((types, entry) => {
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
    );
    $scope.model.data = aModel
    // console.log($scope)
  // $scope.hire = id => {
  //   if ($scope.model.salary > 0) {
  //     const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
  //     $http.post('http://localhost:9090/employees', JSON.stringify({salary: $scope.model.salary, manager: false}), { headers })
  //     .then(({data: employee})=> {
  //       $http.patch('http://localhost:9090/persons/' + id, JSON.stringify({ employeeId: employee.employeeId }), {headers })
  //       .then(({data: person}) => {
  //         aModel.addEmployee(employee)
  //         aModel.updatePerson(person)
  //         $scope.model.persons = aModel.personData()
  //         $scope.model.salary = 0
  //       })
  //     })
  //   }
  // }
})
