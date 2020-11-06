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

      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}
