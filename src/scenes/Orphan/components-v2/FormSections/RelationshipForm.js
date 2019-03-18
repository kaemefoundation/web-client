import React, { useState, useEffect } from "react";

import { Formik, Field } from "formik";
import DatePicker from "../DatePicker.js";
function Fields(props) {
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
					<Field
						name={"relationships[" + props.index + "].vital_status"}
						component="input"
						type="text"
					/>
				</td>
			)}
		</tr>
	);
}
export default function Relationship(props) {
	let indexesIsArray = Array.isArray(props.indexes);
	return (
		<div>
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
							return <Fields index={index} key={index} />;
						})
					) : (
						<Fields index={props.indexes} />
					)}
				</tbody>
			</table>
		</div>
	);
}
