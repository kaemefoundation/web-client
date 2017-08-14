import React from "react";
import { Form, Textarea, Radio, RadioGroup, Text } from "react-form";
import DatePicker from "../DatePicker";
import FormContainer from "./FormContainer";
class ChildCareConference extends React.Component {
	
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<div className="two fields">
									<div className="field">
										<label>
											Date of the Child Care Conference
										</label>
										<DatePicker field="ccc_date" />
									</div>
									<div className="field">
									<label>Attendees:</label>
										<Text field="ccc_attendees" />
									</div>
								</div>
								<div className="ui divider" />
								<div className="three fields">

									<div className="field">
										<label>
											DSW Caseworker Name
										</label>
										<Text field="ccc_dsw_caseworker_name" />
									</div>
									<div className="field">
									<label>
											DSW Caseworker Email
										</label>
										<Text field="ccc_dsw_caseworker_email" />
									</div>
									<div className="field">
									<label>DSW Caseworker Phone</label>
										<Text field="ccc_dsw_caseworker_phone" />
									</div>
								</div>
								<div className="ui divider" />
								<div className="three fields">

									<div className="field">
										<label>
											Kaeme Caseworker Name
										</label>
										<Text field="ccc_kaeme_caseworker_name" />
									</div>
									<div className="field">
									<label>
											Kaeme Caseworker Email
										</label>
										<Text field="ccc_kaeme_caseworker_email" />
									</div>
									<div className="field">
									<label>Kaeme Caseworker Phone</label>
										<Text field="ccc_kaeme_caseworker_phone" />
									</div>
								</div>
								
									<h3>Care Plan</h3>
									<RadioGroup field="ccc_care_plan">
										<div className="grouped fields">
											
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Attempt Resettlement" />
													<label>
														Attempt Resettlement
													</label>
												</div>
											</div>

											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Foster Care" />
													<label>Foster Care</label>
												</div>
											</div>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Adoptable, with consent of family" />
													<label>
														Adoptable, with consent of family
													</label>
												</div>
											</div>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Adoptable, without consent of family" />
													<label>
														Adoptable, without consent of family
													</label>
												</div>
											</div>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Child will temporarily remain in institution." />
													<label>
														Child will temporarily remain in institution.
													</label>
												</div>
											</div>
										</div>
									</RadioGroup>
									<div className="ui divider"/>
									<div className="field">
									<label>Contact info for resettlement or foster care:</label>
										<Text field="ccc_care_plan_with_whom" />
									</div>
									<h3>Care plan implementation timeline:</h3>
									<RadioGroup field="ccc_care_plan_implemented_when">
										<div className="grouped fields">
											
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Care plan implemented immediately" />
													<label>
														Care plan implemented immediately
													</label>
												</div>
											</div>

											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Care plan implemented in the future" />
													<label>Care plan implemented in the future</label>
												</div>
											</div>
											
										</div>
									</RadioGroup>
									<h3>Care plan notes:</h3>
									<Textarea field="ccc_notes"/>
									<div className="ui divider"/>
									<div className="field">
									<label>Next Follow up Date:</label>
										<DatePicker field="followup_date" />
									</div>
									<div className="ui divider"/>
									<div className="field">
									<label>Follow Up Notes:</label>
										<Textarea field="followup_notes" />
									</div>
									<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
			</FormContainer>
		);
	}
}

export default ChildCareConference;
