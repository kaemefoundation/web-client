import React from "react";
import { Text,Radio, RadioGroup } from "react-form";
import DatePicker from "../DatePicker";
export default function Vaccine(props) {
	return (
		<tr>
			<td><h3 className="ui center aligned header">{props.label}</h3></td>
			<td><RadioGroup field={["vaccines", props.index, "vaccine_received"]}>
                  <div className="inline fields">

                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="unknown" /><label>Unknown</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup></td>
			<td>
				<Text
					field={["vaccines", props.index, "vaccine_received_age"]}
				/>
			</td>
			<td><DatePicker field={["vaccines", props.index, "vaccine_date"]}/></td>
			
		</tr>
	);
}
