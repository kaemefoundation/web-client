import React from "react";
import { getIn } from "formik";

function MultiCheckbox({ value, field, form, ...props }) {
  let currentValue = getIn(form.values,field.name) || [];
  if (typeof currentValue === "string") {
    currentValue = currentValue.split(",");
  }
  const checked = currentValue.indexOf(value) > -1;
 return (
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={e => {
        if (e.target.checked) {
          form.setFieldValue(field.name,[...currentValue, value].join());
        } else {
          form.setFieldValue(field.name,currentValue.filter(d => d !== value).join());
        }
      }}
    />
  );
}

export default MultiCheckbox;
