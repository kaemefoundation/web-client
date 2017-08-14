import React from "react";
import { FormField } from "react-form";

function MultiCheckbox ({field, value, ...rest}) {
  return (
    <FormField field={field}>
      {({ setValue, getValue, setTouched }) => {
        let currentValue = getValue() || []
        if(typeof currentValue === 'string'){
          currentValue = currentValue.split(',');
        }
        const checked = currentValue.indexOf(value) > -1
        return (
          <input
            {...rest}
            type="checkbox"
            checked={checked}
            onChange={e => {
              if(e.target.checked){
                
                setValue([
                  ...currentValue,
                  value
                ].join());
              } else{
                setValue(currentValue.filter(d => d !== value).join());
              }
            }}
            onBlur={() => setTouched()}
          />
        );
      }}
    </FormField>
  )
}

export default MultiCheckbox;



