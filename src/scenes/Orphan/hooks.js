import React, { useState, useEffect} from "react";


import{
 getRegions,
  getOrphanages,
  getData
} from "./api.js";


export const OrphanContext = React.createContext({onSave:function(){},child:{},formClass:"",onClickLoadData:function(){}});

export function useOrphanages(){
  let [orphanages,updateOrphanages] = useState([]);

  useEffect(()=>{
     getOrphanages().then((data) =>
     { updateOrphanages(data);});
    },[orphanages.length]);
  
  return [orphanages,updateOrphanages];
}
export function useRegions(){
  let [regions, updateRegions] = useState([]);
  useEffect(()=>{
     getRegions().then((data) =>
     { updateRegions(data);});
    },[regions.length]);
  
  return [regions,updateRegions];
}
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

