import React from 'react'
import { FormInput } from 'react-form'
import DatePicker from 'react-datepicker';
import moment from 'moment'
export default ({field, ...rest}) => {
  return (
    <FormInput field={field}>
      {({ setValue, getValue, setTouched }) => {
        return (
          <DatePicker
          dateFormat="YYYY-MM-DD"
          showMonthDropdown
    showYearDropdown
  selected={(getValue() !== null && getValue() !== '') ? moment(getValue()) : null} // momentPropTypes.momentObj or null
  onChange={date => { console.log(date);setValue(moment(date).format("YYYY-MM-DD"))}} // PropTypes.func.isRequired
 />
        )
      }}
    </FormInput>
  )
}