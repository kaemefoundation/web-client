import React, { useState, useEffect} from "react";


import{
 getRegions,
  getOrphanages,
  getData
} from "./api.js";


export const OrphanContext = React.createContext({onSave:function(){},child:{},formClass:"",onClickLoadData:function(){}});

export function useRegionsAndOrphanages() {
  let [regions, updateRegions] = useState([]);
  let [orphanages, updateOrphanages] = useState([]);
  useEffect(() => {
    let promises = getData([getRegions(), getOrphanages()]);
    promises.then(values => {
      updateRegions(values[0].value);
      updateOrphanages(values[1].value);
    });
  }, [regions.length, orphanages.length]);
  return [regions, orphanages];
}

