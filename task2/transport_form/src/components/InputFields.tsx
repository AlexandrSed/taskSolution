import { Form } from "../types"

type Props = {
    formData: Form | undefined,
		handleChange: (parameter: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputFields({formData, handleChange}: Props) {

  return (
    <>
        <p>Гос-номер</p>
      <input type='text' value={formData?.stateNumber} placeholder='введите гос-номер'
      onChange={ e => handleChange('stateNumber', e)}/>

      <p>Транспортное средство</p>
      <input value={formData?.transport} type="text" placeholder='Транспортное средство'
      onChange={e => handleChange('transport', e)}/>

      <p>Ориентировочная дата прибытия к покупателю</p>
      <input value={formData?.date} type="date"
      onChange={e => handleChange('date', e)}/>

      <h3>Данные о водителе</h3>

      <p>ФИО</p>
      <input value={formData?.fio} type="text" placeholder='укажите ФИО водителя'
      onChange={e => handleChange('fio', e)}/>

      <p>Паспортные данные</p>
      <div className='pasportNumber'>
        <input value={formData?.pasportSeries} type="text" placeholder='Серия'
        onChange={e => handleChange('pasportSeries', e)}/>
        <input value={formData?.pasportNumber} type="text" placeholder='Номер'
        onChange={e => handleChange('pasportNumber', e)}/>
      </div>

      <p>Кем выдан</p>
      <input value={formData?.whoIssued} type="text" placeholder='Кем выдан'
      onChange={e => handleChange('whoIssued', e)}/>

      <p>Когда выдан</p>
      <input value={formData?.whenIssued} type="date"
      onChange={e => handleChange('whenIssued', e)}/>
    </>
  )

}