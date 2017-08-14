import React from "react";
import { Form, Text, Select } from "react-form";

export default class OrphanageStaff extends React.Component {
	render() {
		return (
			<Form values={this.props.data}>
			{({addValue})=>{
			return(<div><table className="ui table celled">
				<thead>
					<tr>
						<th>Name</th>
						<th>Contact Information</th>
						<th>Length of time with orphanage</th>
						<th>Trained/Untrained</th>
					</tr>
				</thead>
				<tbody>
					{this.props.data.staff && this.props.data.staff.map((element,index) => {
						return (
							<tr key={index}>
								<td><Text field={["staff",index,"name"]}/></td>
								<td><Text field={["staff",index,"contact_information"]}/></td>
								<td><Text field={["staff",index,"length_of_time"]}/></td>
								<td><Select  field={["staff",index,"trained_or_untrained"]} options={[{"label":"Trained","value":"Trained"},{"label":"Untrained","value":"Untrained"}]} /></td>
							</tr>
						);
					})}

				</tbody>
				</table>
				<button type="button" onClick={() => {
										addValue("staff",{});
									}}>Add Staff Member</button></div>
			)}}
			</Form>
				

		);
	}
}
