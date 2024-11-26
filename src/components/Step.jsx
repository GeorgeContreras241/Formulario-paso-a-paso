import React from 'react'

export const Step = ({step , errors, handleChange , currentState , setCurrentState , seterrors , toogleVerify}) => {
    return (
        <div className="form">
            <div className="form-title">
                <h3>Fomulario</h3>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Nombre" name="name" onChange={(e) => handleChange(e, "step1")} value={currentState.step1.name} />
                <p className="error">{errors.step1.name}</p>
            </div>
            <div className="form-group">
                <input type="text" name="lastname" placeholder="Apellido" onChange={(e) => handleChange(e, "step1")} value={currentState.step1.lastname} />
                <p className="error">{errors.step1.lastname}</p>
            </div>
            <button className="next" onClick={(e) => toogleVerify(e, "step1")}>Next</button>
        </div>
    )
}
