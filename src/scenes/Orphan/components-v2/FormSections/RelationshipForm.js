import React, { useState, useEffect,useContext } from "react";

import { Formik, Field,getIn } from "formik";
import DatePicker from "../DatePicker.js";
import { OrphanContext } from "../../hooks.js";
import RadioButton from "../RadioButton.js";

function Fields(props) {
	const context = useContext(OrphanContext);
	let aliveChecked = getIn("relationships[" + props.index + "].vital_status");
	let deceasedChecked = getIn("relationships[" + props.index + "].vital_status")
	console.log(props);
	return (
		<tr>
			<td>
				<Field
					name={"relationships[" + props.index + "].name"}
					component="input"
					type="text"
				/>
			</td>

			<td>
				<Field
					name={"relationships[" + props.index + "].date_of_birth"}
					component={DatePicker}
				/>
			</td>
			<td>
				<Field
					name={"relationships[" + props.index + "].occupation"}
					component="input"
					type="text"
				/>
			</td>
			{props.type !== "mother" && props.type !== "father" ? (
				""
			) : (
				<td>
					 <div className="inline fields">
                        <div className="field">
                            <Field component={RadioButton}  name={"relationships[" + props.index + "].vital_status"} id="alive" label="Alive"/>
                     
                        </div>
                        <div className="field">
                            <Field component={RadioButton}  name={"relationships[" + props.index + "].vital_status"}  id="deceased" label="Deceased" />
                         
                        </div>
                        <div className="field">
                            <Field component={RadioButton}  name={"relationships[" + props.index + "].vital_status"}  id="unknown" label="Unknown"/>
                      
                          
                        </div>
                      </div>
				</td>
			)}
		</tr>
	);
}
export default function Relationship(props) {
	let indexesIsArray = Array.isArray(props.indexes);
	return (
			<table className="ui celled table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Date of Birth</th>
						<th>Occupation</th>
						{props.type !== "mother" && props.type !== "father" ? (
							""
						) : (
							<th>Vital Status</th>
						)}
					</tr>
				</thead>
				<tbody>
					{indexesIsArray ? (
						props.indexes.map(index => {
							return <Fields index={index} key={index} type={props.type}/>;
						})
					) : (
						<Fields index={props.indexes} type={props.type} />
					)}
				</tbody>
			</table>
		
	);
}
