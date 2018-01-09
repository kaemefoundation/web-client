import React from "react";
import { FormInput } from "react-form";
import DatePicker from "react-datepicker";
import moment from "moment";
export default ({ field, ...rest }) => {
  return (
    <FormInput field={field}>
      {({ setValue, getValue, setTouched }) => {
        if (getValue() === "Unknown") {
          return <div>Unknown</div>;
        } else {
          return (
            <DatePicker
              dateFormat="YYYY-MM-DD"
              showMonthDropdown
              showYearDropdown
              selected={
                getValue() === undefined ||
                getValue() === null ||
                getValue() === ""
                  ? null
                  : moment(getValue())
              } // momentPropTypes.momentObj or null
              onChange={date => {
                setValue(moment(date).format("YYYY-MM-DD"));
              }} // PropTypes.func.isRequired
            />
          );
        }
      }}
    </FormInput>
  );
};
