import React, {  useContext } from "react";

import { Formik, Field } from "formik";
import { OrphanContext } from "../../hooks";
import RadioButton from "../RadioButton";
import DatePicker from "../DatePicker";

export default function Followups(props) {
	const context = useContext(OrphanContext);
	let followups = context.child.follow_ups !== undefined
			? context.child.follow_ups
			: [];
	let child_id = context.child.id;
	return (
		<div>
			{" "}
			<Formik
				initialValues={context.child}
				onSubmit={context.onSave}
				render={({ handleSubmit, values, setFieldValue }) => {
					return (
						<form
							className={props.formClass}
							onSubmit={handleSubmit}
						>
											{followups.map((element, index) => {
								return (
									<div key={index} className="ui raised segment">
										<h3 className="ui blue ribbon label">
											FOLLOW UP:&nbsp;&nbsp;
											{element.date_of_contact}
										</h3>
										<div
											className="three wide fields"
											style={{ marginTop: 10 }}
										>
											<div className="field">
												<label>Child's location</label>
												<Field
													component="input"
													type="text"
													name={
														"follow_ups." +
														index +
														".child_location"
													}
												/>
											</div>
											<div className="field">
												<label>Child's guardian</label>
												<Field
													component="input"
													type="text"
													name={
														"follow_ups." +
														index +
														".child_guardian"
													}
												/>
											</div>
											<div className="field">
												<label>
													Child's relationship to
													guardian
												</label>
												<Field
													component="input"
													type="text"
													name={
														"follow_ups." +
														index +
														".child_relationship_to_guardian"
													}
												/>
											</div>
										</div>
										<div className="ui divider" />
										<div className="two wide fields">
											<div className="field">
												<label>
													Guardian contact information
												</label>
												<Field
													component="input"
													type="text"
													name={
														"follow_ups." +
														index +
														".guardian_contact_info"
													}
												/>
											</div>
											<div className="field">
												<label>
													Guardian occupation
												</label>
												<Field
													name={
														"follow_ups." +
														index +
														".guardian_occupation"
													}
												/>
											</div>
										</div>
										<div className="ui divider" />
										<div className="two wide fields">
											<div className="field">
												<label>Date of Contact</label>
												<Field
														name={
															"follow_ups."+
															index+
															".date_of_contact"
														}
														component={DatePicker}
													/>
											</div>
											<div className="field">
												<label>
													Method of Contact:
												</label>

												<div className="inline fields">
													<div className="field">
														<Field
															component={
																RadioButton
															}
															name={
																"follow_ups." +
																index +
																".contact_method"
															}
															id="Visit"
															label="Visit"
														/>
													</div>
													<div className="field">
														<Field
															component={
																RadioButton
															}
															name={
																"follow_ups." +
																index +
																".contact_method"
															}
															id="Phone"
															label="Phone"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="ui divider" />
										<div className="two wide fields">
											<div className="field">
												<label>
													Person of Contact:
												</label>

								
													<div className="inline fields">
														<div className="field">
															<Field
																component={
																	RadioButton
																}
																name={
																	"follow_ups." +
																	index +
																	".person_contacted"
																}
																id="Child"
																label="Child"
															/>
														</div>
														<div className="field">
															<Field
																component={
																	RadioButton
																}
																name={
																	"follow_ups." +
																	index +
																	".person_contacted"
																}
																id="Parent"
																label="Parent"
															/>
														</div>
														<div className="field">
															<Field
																component={
																	RadioButton
																}
																name={
																	"follow_ups." +
																	index +
																	".person_contacted"
																}
																id="Mentor"
																label="Mentor"
															/>
														</div>
														<div className="field">
															<Field
																component={
																	RadioButton
																}
																name={
																	"follow_ups." +
																	index +
																	".person_contacted"
																}
																id="Other"
																label="Other"
															/>
														</div>
													</div>
												
											</div>
											<div className="field">
												<label>
													Person contacted
													description:
												</label>
												<Field
													name={"follow_ups." +
																	index +
																	".person_contacted_description"
													}
													type="text"
													component="input"
												/>
											</div>
										</div>
										<div className="ui divider" />
										<div className="field">
											<label>Notes</label>
											<Field 
												name={"follow_ups." +
																	index +
																	".notes"
												}
												component="textarea"
											/>
										</div>
									</div>
								);
							})}
<button
								type="button"
								onClick={() => {
									followups.push({
										orphan_id: child_id,date_of_contact:null
									});
									props.updateChildWithRelatedData(
										"follow_ups",
										followups
									);
								}}
							>
								Add Follow Up
							</button>
							<button type="submit">Save</button>
							 
						</form>
					);
				}}
			/>
		</div>
	);
}
