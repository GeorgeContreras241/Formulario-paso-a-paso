import { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";


export const FormCode = () => {
  const [currentState, setCurrentState] = useState({
    step1: { name: "", lastname: "" },
    step2: { email: "", tel: "" },
    step3: { adress: "", postal: "" },
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, seterrors] = useState({
    step1: { name: "", lastname: "" },
    step2: { email: "", tel: "" },
    step3: { adress: "", postal: "" },
  })
  const [resultForm, setresultForm] = useState({
    step1: { name: "", lastname: "" },
    step2: { email: "", tel: "" },
    step3: { adress: "", postal: "" },
  })

  /*Handle change event*/
  const handleChange = (e, step) => {
    setCurrentState({
      ...currentState,
      [step]: {
        ...currentState[step],
        [e.target.name]: e.target.value
      }
    }
    )
  };
  /**/
  const errorModifty = (error, step, valueMin, valueMax, name, lastname) => {
    console.log(step)
    seterrors({
      ...errors, [step]: {
        ...error[step], name: name.length < valueMin || name.length > valueMax ? "El nombre no puede ser menor a 3 caracteres y mas de 30" : ""
        , lastname: lastname.length < valueMin || lastname.length > valueMax ? "El apellido no puede ser menor a 3 caracteres y mas de 30" : ""
      }
    })
  }

  const toogleVerify = (e) => {
    e.preventDefault()
    const { name, lastname } = currentState.step1;
    const { email, tel } = currentState.step2;
    const { adress, postal } = currentState.step3;

    if (currentStep === 1) {
      if ((name.length < 3 || name.length > 30) || (lastname.length < 3 || lastname.length > 30)) {
        errorModifty(errors, "step1", 3, 30, currentState.step1.name, currentState.step1.lastname)
      } else {
        seterrors(() => {
          setCurrentStep(2)
          return { ...errors, step1: { name: "", lastname: "" } }
        })
      }
    } else if (currentStep === 2) {
      if ((email.length < 3 || email.length > 30) || (tel.length < 7 || tel.length > 10)) {
        seterrors({
          ...errors, step2: {
            ...errors.step2, email: email.length < 3 || email.length > 30 ? "El correo no puede ser menor a 3 caracteres y mas de 30" : ""
            , tel: tel.length < 7 || tel.length > 10 ? "El telefono no puede ser menor a 7 caracteres y mas de 10" : ""
          }
        })
      } else if (!(email.includes("@") && email.includes("."))) {
        seterrors({
          ...errors, step2: {
            ...errors.step2, email: "El email no es valido"
          }
        }
        )
      } else {
        seterrors({ ...errors, step2: { email: "", tel: "" } })
        setCurrentStep(3)
      }
    } else if (currentStep === 3) {
      if ((adress.length < 3 || adress.length > 30) || (postal.length < 3 || postal.length > 6)) {
        seterrors({
          ...errors, step3: {
            ...errors.step3, adress: adress.length < 3 || adress.length > 30 ? "La direccion no puede ser menor a 3 caracteres y mas de 30" : ""
            , postal: postal.length < 3 || postal.length > 6 ? "el codigo postal no puede ser menor a 3 caracteres y mas de 6" : ""
          }
        })
      } else {
        seterrors({ ...errors, step3: { adress: "", postal: "" } })
        setresultForm(currentState)
        console.log(resultForm)
        setCurrentStep(4)
      }
    }

  };
  const tooglePrevius = (e) => {
    e.preventDefault()
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)
    console.log(currentStep)
  }


  return (
    <div>
      <div className="process">
        <div className={currentStep === 1 ? "loading" : currentStep === 2 ? "loading one" : currentStep === 3 ? "loading two" : "loading three"}></div>
      </div>
      <form>
        {
          currentStep === 1 ? (
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
                <p className="error two">{errors.step1.lastname}</p>
              </div>
              <button className="next" onClick={(e) => toogleVerify(e, "step1")}>Next</button>
            </div>
          ) : currentStep === 2 ? (
            <div className="form">
              <div className="form-title">
                <button className="previus" onClick={tooglePrevius}><GrLinkPrevious /></button>
              </div>
              <div className="form-group">
                <input type="text" name="email" placeholder="Correo" onChange={(e) => handleChange(e, "step2")} value={currentState.step2.email} />
                <p className="error">{errors.step2.email}</p>
              </div>
              <div className="form-group">
                <input type="text" name="tel" placeholder="Telefono" onChange={(e) => handleChange(e, "step2")} value={currentState.step2.tel} />
                <p className="error two">{errors.step2.tel}</p>
              </div>
              <button className="next" onClick={(e) => toogleVerify(e, "step1")}>Next</button>
            </div>
          ) : currentStep === 3 ? (
            <div className="form">
              <div className="form-title">
                <button className="previus" onClick={tooglePrevius}><GrLinkPrevious /></button>
              </div>
              <div className="form-group">
                <input type="text" name="adress" placeholder="Direccion" onChange={(e) => handleChange(e, "step3")} value={currentState.step3.adress} />
                <p className="error">{errors.step3.adress}</p>
              </div>
              <div className="form-group">
                <input type="number" name="postal" placeholder="Codigo Postal" onChange={(e) => handleChange(e, "step3")} value={currentState.step3.postal} />
                <p className="error two">{errors.step3.postal}</p>
              </div>
              <button className="next" onClick={(e) => toogleVerify(e, "step3")}>Finalizar</button>
            </div>
          ) : (
            <div className="form">
              <button className="button-submit" type="submit" onClick={() => setCurrentStep(1)}>Probar otra Vez</button>
            </div>
          )
        }
      </form>
      <p>
        <SyntaxHighlighter language="javascript" style={dark}>
          {JSON.stringify(resultForm, null, 2)}
        </SyntaxHighlighter>
      </p>
    </div>
  )
}
