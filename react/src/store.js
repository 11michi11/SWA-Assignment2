export default (init_model, view, renderer) => {
  let model = init_model

  function reducer(action, model) {
    switch(action.type) {
      case 'hire':
        const { employee, person } = action
        return model.addEmployee(employee).updatePerson(person)

      case 'loadDataForPlace':
        const { 
          place,
          temperature,
          precipitation,
          wind,
          cloud,
          temperaturePrediction,
          precipitationPrediction,
          windPrediction,
          cloudPrediction 
        } = action
        return model.reload(
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

      case 'updateHistoryDataFilter':
          const {from,to} = action
          console.log("Store: updateHistoryDataFilter")
        console.log(model.temperatureData())
        console.log("Filtered")
        console.log(model.filtered({from,to}).temperatureData())
          return model.filtered({from,to})
          // return model.filtered(x => (from,to) => from<=new Date(x.time) && new Date(x.time)<=to)

      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}
