import React from "react";

import { Form, Textarea, Text, Radio, RadioGroup } from "react-form";
import DatePicker from "../DatePicker";
import FormContainer from "./FormContainer";
class Followups extends React.Component {
	render() {
		console.log(this.props.child.follow_ups);
		let followups = this.props.child.follow_ups !== undefined
			? this.props.child.follow_ups
			: [];
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, addValue, getValue }) => {
						return (
							<form
								className={this.props.formClass}
								onSubmit={submitForm}
							>
								{followups.map((element, index) => {
									return (
										<div className="ui raised segment">
										<h3 className="ui blue ribbon label">FOLLOW UP:&nbsp;&nbsp;{element.date_of_contact}</h3>
											<div className="three wide fields" style={{marginTop:10}}>
												<div className="field">
													<label>
														Child's location
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"child_location"
														]}
													/>
												</div>
												<div className="field">
													<label>
														Child's guardian
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"child_guardian"
														]}
													/>
												</div>
												<div className="field">
													<label>
														Child's relationship to guardian
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"child_relationship_to_guardian"
														]}
													/>
												</div>
											</div>
											<div className="ui divider"/>
											<div className="two wide fields">
												<div className="field">
													<label>
														Guardian contact information
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"guardian_contact_info"
														]}
													/>
												</div>
												<div className="field">
													<label>
														Guardian occupation
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"guardian_occupation"
														]}
													/>
												</div>

											</div>
											<div className="ui divider"/>
											<div className="two wide fields">
												<div className="field">
													<label>
														Date of Contact
													</label>
													<DatePicker
														field={[
															"follow_ups",
															index,
															"date_of_contact"
														]}
													/>
												</div>
												<div className="field">
												  <label>
															Method of Contact:
														</label>
												<RadioGroup
													field={[
														"follow_ups",
														index,
														"contact_method"
													]}
												>
													<div className="inline fields">
														
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Visit" />
																<label>
																	Visit
																</label>
															</div>
														</div>
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Phone" />
																<label>
																	Phone
																</label>
															</div>
														</div>
													</div>
												</RadioGroup>
												</div>
											</div>
											<div className="ui divider"/>
											<div className="two wide fields">
												<div className="field">
													<label>
															Person of Contact:
														</label>
												
												<RadioGroup
													field={[
														"follow_ups",
														index,
														"person_contacted"
													]}
												>
													<div className="inline fields">
														
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Child" />
																<label>
																	Child
																</label>
															</div>
														</div>
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Parent" />
																<label>
																	Parent
																</label>
															</div>
														</div>
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Mentor" />
																<label>
																	Mentor
																</label>
															</div>
														</div>
														<div className="field">
															<div className="ui radio checkbox">
																<Radio value="Other" />
																<label>
																	Other
																</label>
															</div>
														</div>
													</div>
												</RadioGroup>
												</div>
												<div className="field">
													<label>
														Person contacted description:
													</label>
													<Text
														field={[
															"follow_ups",
															index,
															"person_contacted_description"
														]}
													/>
												</div>

											</div>
											<div className="ui divider"/>
											<div className="field">
											<label>Notes</label>
											<Textarea field={[
															"follow_ups",
															index,
															"notes"
														]}/>
											</div>
										</div>
									);
								})}
								<button
									type="button"
									onClick={() => {
										addValue("follow_ups", {
											orphan_id: this.props.child.id
										});
										console.log(getValue("follow_ups"));
										this.props.updateChildWithRelatedData(
											"follow_ups",
											getValue("follow_ups")
										);
									}}
								>
									Add Follow Up
								</button>
								<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
			</FormContainer>
		);
	}
}

export default Followups;
