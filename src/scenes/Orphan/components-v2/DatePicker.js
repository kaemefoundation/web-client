import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function getFormattedDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}
function padZeros(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}
function PickDate({ field, form, ...props }) {
   let currentDate = null;
  if(field.value !== null && field.value !== undefined){
    currentDate = new Date(field.value);
  }

  return (
    <div>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        selected={currentDate}
        onChange={newDate => {
          form.setFieldValue(field.name, getFormattedDate(newDate));
        }}
      />
    </div>
  );
}
export default PickDate;
