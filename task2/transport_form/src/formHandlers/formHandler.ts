import { Form } from "../types";

export const clearInputsAndErrors = (
    setFormData : React.Dispatch<React.SetStateAction<Form | undefined>>,
    setErrors : React.Dispatch<React.SetStateAction<string[]>>
) => {
  localStorage.clear();
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
  setErrors([])
}

export const handleChange = (
  parameter: string,
  event : React.ChangeEvent<HTMLInputElement>,
  setFormData : React.Dispatch<React.SetStateAction<Form | undefined>>,
  formData : Form | undefined
) => {
  const tempForm : Form | null = {
    ...formData,
    [parameter] : event.target.value
  }

  if (parameter === 'stateNumber' && 
    (event.target.value.length < 2 && !/^[А-Я]?$/.test(event.target.value) || 
    event.target.value.length > 1 && event.target.value.length < 5 && !/^[А-Я][0-9]*$/.test(event.target.value) ||
    event.target.value.length > 4 && event.target.value.length < 7 && !/^[А-Я][0-9]{3}[А-Я]*$/.test(event.target.value) ||
    event.target.value.length > 6 && !/^[А-Я][0-9]{3}[А-Я]{2}[0-9]*$/.test(event.target.value) ||
    event.target.value.length > 8)
  )
    return;

  if (parameter === 'pasportSeries' && (!/^[0-9]*$/.test(event.target.value) || event.target.value.length > 4))
    return;

  if ((parameter === 'fio' || parameter === 'whoIssued') && !/^[А-Яа-яёЁ\s]*$/.test(event.target.value))
    return;

  if (parameter === 'pasportNumber' && (!/^[0-9]*$/.test(event.target.value) || event.target.value.length > 6))
    return;

  localStorage.setItem('form' , JSON.stringify(tempForm))
  setFormData(tempForm)
}

export const handleClickSendBtn = (
  formData : Form | undefined,
  setErrors : React.Dispatch<React.SetStateAction<string[]>>,
  setIsModal : React.Dispatch<React.SetStateAction<boolean>>
) => {
  const tempErrors : string[] = []
  for(const key in formData) {
    if (formData[key as keyof Form] === '' && !tempErrors.includes('Не все поля заполнены')) {
      tempErrors.push('Не все поля заполнены')
    }

    if(key === 'stateNumber' && formData[key]?.length !== 8) {
      tempErrors.push('Гос-номер не введен или введен не полностью')
    }

    if(key === 'fio' && !/^[А-Яа-яЁё]+\s+[А-Яа-яЁё]+\s*[А-Яа-яЁё]*$/
      .test(formData[key] !== undefined ? formData[key].trim() : '')) 
    {
      tempErrors.push('ФИО не введены или введены не правильно')
    }

    if(key === 'pasportSeries' && formData[key]?.length !== 4) {
      tempErrors.push('Серия паспорта не введена или введена не полностью')
    }

    if(key === 'pasportNumber' && formData[key]?.length !== 6) {
      tempErrors.push('Номер паспорта не введен или введен не полностью')
    }

    if(key === 'whoIssued' && formData[key]?.length === 0) {
      tempErrors.push('Не указано кем выдан паспорт')
    }

    if (key === 'date' && (
      new Date(formData[key] !== undefined ? formData[key] : '') < new Date() || 
      new Date(formData[key] !== undefined ? formData[key] : '') > new Date('01.01.2200'))) 
      tempErrors.push('Указана не корректная дата прибытия')

    if (key === 'whenIssued' && (
      new Date(formData[key] !== undefined ? formData[key] : '') > new Date() || 
      new Date(formData[key] !== undefined ? formData[key] : '') < new Date('01.01.1900'))) 
      tempErrors.push('Указана не корректная дата выдачи паспорта')

  }

  setErrors(tempErrors)

  if ( tempErrors.length === 0) {
    setIsModal(true)
  }
}

export const handleModalBtn = (
  setFormData : React.Dispatch<React.SetStateAction<Form | undefined>>,
  setErrors : React.Dispatch<React.SetStateAction<string[]>>,
  setIsModal : React.Dispatch<React.SetStateAction<boolean>>
) => {
  clearInputsAndErrors(setFormData, setErrors)
  setIsModal(false)
}