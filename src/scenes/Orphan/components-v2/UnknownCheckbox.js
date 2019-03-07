import React from "react";
import { Field } from "formik";
function UnknownCheckbox({ fieldToUpdate, customText, ...rest }) {
  let unknownText = typeof customText === 'string' && customText !== '' ? customText : "Unknown";
        return (
          <div className="unknown_checkbox_container">
          <Field  render={({ field,form }) => {
           return  <input
              style={{marginTop:"4px"}}
              type="checkbox"
              checked={form.values[fieldToUpdate] === unknownText}
              onChange={evt => {
                if (form.values[fieldToUpdate] === unknownText) {
                  form.setFieldValue(fieldToUpdate, "");
                } else {
                  form.setFieldValue(fieldToUpdate, unknownText);
                }
              }}
            /> 


            }}/>
            <label>{unknownText}</label>
          </div>
       
  );
}

export default UnknownCheckbox;