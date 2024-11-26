import { Formity } from './components/Formity.jsx'
import { FormCode } from './components/FormCode.jsx'
import './App.css'

function App() {
  return (
    <main>
      <h1>Formularios con React paso a paso</h1>
      <p className='description'>
        Este proyecto es un ejemplo de cómo crear formularios con React paso a paso usando
        <a href="https://www.formity.app/" target="_blank" rel="noreferrer"> Formity</a> y con la librería
        <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer"> React</a>.
      </p>
      <section className='form__container'>
        <div className='formity'>
          <h2>Formulario con Formity</h2>
          <Formity />
        </div>
        <div className='formCode'>
          <h2>Formulario con React</h2>
          <FormCode />
        </div>
      </section>
    </main>
  )
}

export default App
