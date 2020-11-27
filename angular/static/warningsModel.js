const warningsModel = (warnings, minSeverityLevel) => {

    const warningsFilteredBySeverity = () => {
        return warnings.filter(warning => warning.severity >= minSeverityLevel)
    }

    const updateWarning = (newWarning) => {
        warnings = warnings.filter(warning => warning.prediction != null);
        let i = warnings.findIndex(x => x.id === newWarning.id)
        if(i >= 0) {
            if (newWarning.prediction == null) {
                warnings.splice(i, 1)
                console.log(newWarning.id + "null in predictions")
            } else {
                newWarning['oldWarning'] = warnings[i]
                warnings.splice(i, 1)
                warnings.push(newWarning)
                console.log(newWarning.id + " updated")
            }
        } else {
            console.log(newWarning.id + " new added")
            warnings.push(newWarning)
        }
        return warnings.filter(warning => warning.severity >= minSeverityLevel)
    }

    return {
        warnings,
        minSeverityLevel,
        warningsFilteredBySeverity,
        updateWarning
    }


}

export default warningsModel;