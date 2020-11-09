export default store => async ({type, ...params}) =>  {
  console.log("Dispatcher new request")
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = window.prompt('Salary?')
        if (salary) {
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          const employee = await fetch('http://localhost:9090/employees',
            { method: 'POST', 
              body: JSON.stringify({ salary, manager: false }), 
              headers}).then(res => res.json())
          const person = await fetch('http://localhost:9090/persons/' + id,
            { method: 'PATCH', 
              body: JSON.stringify({ employeeId: employee.employeeId }), 
              headers}).then(res => res.json())
          store({type, ...params, employee, person})
        }
        break;

      case 'loadDataForPlace':
        const { place } = params
        console.log("Dispatcher request: loadDataForPlace + "+place)
        if (place) {
          const historyData = await fetch(`http://localhost:8080/data/${place}`).then(res => res.json())
          const forecastData = await fetch(`http://localhost:8080/forecast/${place}`).then(res => res.json())
          
          const historyDataGrouped = groupDataByType(historyData)
          const forecastDataGrouped = groupDataByType(forecastData)

          const temperature = historyDataGrouped["temperature"]
          const precipitation = historyDataGrouped["precipitation"]
          const wind = historyDataGrouped["wind speed"]
          const cloud = historyDataGrouped["cloud coverage"]
          const temperaturePrediction = forecastDataGrouped["temperature"]
          const precipitationPrediction = forecastDataGrouped["precipitation"]
          const windPrediction = forecastDataGrouped["wind speed"]
          const cloudPrediction = forecastDataGrouped["cloud coverage"] 

          store({
            type, 
            ...params,           
            temperature,
            precipitation,
            wind,
            cloud,
            temperaturePrediction,
            precipitationPrediction,
            windPrediction,
            cloudPrediction
          })
        }
        break;

        case 'updateHistoryDataFilter':
            const {historyFrom,historyTo} = params
            console.log("Dispatcher request: updateHistoryDataFilter")
            store({type,historyFrom,historyTo} )
            break;

        case 'updateForecastDataFilter':
            const {forecastFrom,forecastTo} = params
            console.log("Dispatcher request: updateForecastDataFilter")
            store({type,forecastFrom,forecastTo} )
            break;

      default:
    }
}

function groupDataByType(data) {
    // Group by data type
    return data.reduce((types, entry) => {
      const type = (types[entry.type] || []);
      type.push(entry);
      types[entry.type] = type;
      return types;
  }, {});
}
