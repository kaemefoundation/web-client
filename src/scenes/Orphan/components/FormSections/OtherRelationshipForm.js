import React from "react";

import { Text } from "react-form";
import DatePicker from "../DatePicker";

function OtherRelationshipForm({indexes}) {
	
	if (indexes !== undefined && indexes.length > 0) {
		return (
			<table className="ui celled table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Relationship</th>
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
								<Text
									field={["relationships", index, "relationship_type"]}
									
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
		);
	} else {
		return <div />;
	}
}

export default OtherRelationshipForm;
