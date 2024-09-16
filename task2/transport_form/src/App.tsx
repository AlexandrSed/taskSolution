import { useEffect, useState } from 'react'
import './App.css'
import { Form } from './types'
import ErrorMessage from './components/ErrorMessage'
import InputFields from './components/InputFields'
import { clearInputsAndErrors, handleChange, handleClickSendBtn, handleModalBtn } from './formHandlers/formHandler'
import ModalWindow from './components/ModalWindow'

function App() {
  const [formData, setFormData] = useState<Form>()
  const [errors, setErrors] = useState<string[]>([])
  const [isModal, setIsModal] = useState<boolean>(false)

  useEffect(() => {
    const fData : string | null = localStorage.getItem('form')

    if (fData !== null)
      setFormData(JSON.parse(fData))
    else {
      setFormData({
        stateNumber: '',
        transport: '',
        date: '',
        fio: '',
        pasportSeries: '',
        pasportNumber: '',
        whoIssued: '',
        whenIssued: ''
      });
    }
  }, [])

  

  return (
    <div className='container'>
      <h1>Транспортные средства и водители</h1>

      <InputFields formData={formData} 
      handleChange={(parameter, event) => handleChange(parameter, event, setFormData, formData)}>
      </InputFields>

      <ErrorMessage errors={errors}></ErrorMessage>
      <div className='buttons'>
        <button className='primary' 
        onClick={() => handleClickSendBtn(formData, setErrors, setIsModal)}>
          Отправить
        </button>

        <button className='cancel'
        onClick={ () => clearInputsAndErrors(setFormData, setErrors)}>
          Отменить
        </button>
      </div>
      <ModalWindow isModal={isModal}
      handleOk={() => handleModalBtn(setFormData, setErrors, setIsModal)}></ModalWindow>
    </div>
  )
}

export default App
