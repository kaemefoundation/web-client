import React from 'react'
import { Form, Text, Radio, RadioGroup} from "react-form";
import MultiCheckboxArray from "../MultiCheckboxArray";
import FormContainer from './FormContainer';

class Emotional extends React.Component{
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form  className={this.props.formClass} onSubmit={submitForm}>
								<RadioGroup field="psychiatric_care">
									<div className="inline fields">
										<label>
										46. Has the child ever received intensive in or out-patient care for psychiatric issues?
									</label>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="yes" />
												<label>Yes</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no" />
												<label>No</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="unknown" />
												<label>Unknown</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="field">
									<label>If yes, please describe</label>
									<Text field="psychiatric_care_explanation"/>
								</div>
								<div className="ui divider" />
								<MultiCheckboxArray
									label="47. Does the child have a history of:"
									values={[
										"Physical Abuse",
										"Sexual Abuse",
										"Emotional Abuse",
										"Domestic Violence",
										"Unknown",
										"None of these"
										
									]}
									field="abuse_history"
								/>
								<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
			</FormContainer>
		);
	}
	
}

export default Emotional;