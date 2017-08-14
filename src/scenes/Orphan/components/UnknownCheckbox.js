import React from "react";
import { FormField } from "react-form";
function UnknownCheckbox({ fieldToUpdate, customText, ...rest }) {
  let unknownText = typeof customText === 'string' && customText !== '' ? customText : "Unknown";
  return (
    <FormField>
      {({ setValue, getValue }) => {
        return (
          <div style={{ marginTop: "2em" }}>
            <input
              style={{ marginTop: 3, padding: 5 }}
              type="checkbox"
              checked={getValue(fieldToUpdate) === unknownText}
              onChange={evt => {
                if (getValue(fieldToUpdate) === unknownText) {
                  setValue(fieldToUpdate, "");
                } else {
                  setValue(fieldToUpdate, unknownText);
                }
              }}
            /> <label>{unknownText}</label>
          </div>
        );
      }}
    </FormField>
  );
}

export default UnknownCheckbox;
