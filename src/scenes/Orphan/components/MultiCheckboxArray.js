import React from "react";

import MultiCheckbox from "./MultiCheckbox";
function getCheckbox(field,value){
  return (<div key={value} className="four wide column">
          <label>
            <MultiCheckbox

              value={value}
              field={field}
            />
            {value}
          </label>
        </div>)
}
function MultiCheckboxArray({ field, values,label }) {
  
  return (<div>
    <div className="field">
        <label>{label}</label>
      </div>
    <div className="ui equal width grid">
      
      {values.map((value)=>{
        return getCheckbox(field,value);
      })}
    </div></div>
  )
}

export default MultiCheckboxArray;
