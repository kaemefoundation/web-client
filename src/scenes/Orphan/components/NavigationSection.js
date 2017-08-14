import React from "react";
import { NavLink } from "react-router-dom";

function NavigationSection(props) {
	return (
		<div className="item">
			<div className="header ">{props.title}</div>
				
			<div className="menu">
				{props.routes.map((route, index) => (
					
					<NavLink
						className="item"
						key={"link"+index}
						to={
							"/orphan/" +
								props.orphanId +
								"/"+props.part+"/" +
								route.path
						}
					>
						{route.navName}
					</NavLink>
				
				))}
			</div>
		</div>
	);
}

export default NavigationSection;
