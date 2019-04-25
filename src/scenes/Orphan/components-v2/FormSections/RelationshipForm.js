import React from "react";

import { Field, getIn } from "formik";
import DatePicker from "../DatePicker.js";
import RadioButton from "../RadioButton.js";

function Fields(props) {
	let className = ["mother","father"].indexOf(props.type) > -1 ? "four" : "three";
	let aliveChecked = getIn("relationships[" + props.index + "].vital_status");
	let deceasedChecked = getIn(
		"relationships[" + props.index + "].vital_status"
	);
	
	return (
		<div className={className+" fields"}>
			<div className="field">
				<label>Name</label>
				<Field
					name={"relationships[" + props.index + "].name"}
					component="input"
					type="text"
				/>
			</div>

			<div className="field">
				<label>Date of Birth</label>
				<Field
					name={"relationships[" + props.index + "].date_of_birth"}
					component={DatePicker}
				/>
			</div>
			<div className="field">
				<label>Occupation</label>
				<Field
					name={"relationships[" + props.index + "].occupation"}
					component="input"
					type="text"
				/>
			</div>
			{props.type !== "mother" && props.type !== "father" ? (
				""
			) : (
				<div className="field">
					<label>Vital Status</label>
					<div className="inline fields">
						<div className="field">
							<Field
								component={RadioButton}
								name={
									"relationships[" +
									props.index +
									"].vital_status"
								}
								id="alive"
								label="Alive"
							/>
						</div>
						<div className="field">
							<Field
								component={RadioButton}
								name={
									"relationships[" +
									props.index +
									"].vital_status"
								}
								id="deceased"
								label="Deceased"
							/>
						</div>
						<div className="field">
							<Field
								component={RadioButton}
								name={
									"relationships[" +
									props.index +
									"].vital_status"
								}
								id="unknown"
								label="Unknown"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default function Relationship(props) {
	let indexesIsArray = Array.isArray(props.indexes);
	return indexesIsArray ? (
		props.indexes.map(index => {
			return <div><Fields index={index} key={index} type={props.type} /><div className="ui divider"/></div>;
		})
	) : (
		<Fields index={props.indexes} type={props.type} />
	);
}
