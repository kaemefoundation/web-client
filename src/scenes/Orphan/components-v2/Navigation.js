import React, {Component} from 'react';
import nav from '../Routes-v2.js';
import { NavLink } from "react-router-dom";


export default function Navigation(props){
     return (  
      <div className="ui top attached tabular menu">
        {nav.map((route, index) => (
          
          <NavLink
            className="item"
            key={"link"+index}
            to={
              "/orphan/" +
                props.id +
                "/" +
                route.path
            }
          >
            {route.navName}
          </NavLink>
        
        ))}
      </div>

    );
  
}
