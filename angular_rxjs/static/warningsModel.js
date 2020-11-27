const warningsModel = (warnings, previousWarnings, minSeverityLevel) => {

    const warningsFilteredBySeverity = () => {
        return warnings.filter( warning => warning.severity >= minSeverityLevel)
    }



    return {
        warnings,
        previousWarnings,
        minSeverityLevel,
        warningsFilteredBySeverity
    }

}

export default warningsModel;