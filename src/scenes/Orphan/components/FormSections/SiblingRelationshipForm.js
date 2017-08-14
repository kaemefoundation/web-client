import React from "react";

import { Text, Select } from "react-form";
import DatePicker from "../DatePicker";

function SiblingRelationshipForm({indexes}) {
	if (indexes !== undefined && indexes.length > 0) {
		return (
			<div>
			<table className="ui celled table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Birthday</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Occupation</th>
					</tr>
				</thead>
				<tbody>
				
					{indexes.map(index => {
						return(<tr key={index}>
							<td>
								<Text
									field={["relationships", index, "name"]}
								/>
							</td>
							<td>
								<Select
									field={["relationships", index, "gender"]}
									options={[
										{
											label: "Female",
											value: "female"
										},
										{
											label: "Male",
											value: "male"
										}
									]}
								/>
							</td>
							<td>
								<DatePicker
									field={[
										"relationships",
										index,
										"date_of_birth"
									]}
								/>
							</td>
							<td>
								<Text
									field={["relationships", index, "address"]}
								/>
							</td>
							<td>
								<Text
									field={["relationships", index, "phone_number"]}
								/>
							</td>
							<td>
								<Text
									field={[
										"relationships",
										index,
										"occupation"
									]}
								/>
							</td>
						</tr>);
					})}
				</tbody>
			</table>

                  </div>
		);
	} else {
		return <div />;
	}
}

export default SiblingRelationshipForm;
