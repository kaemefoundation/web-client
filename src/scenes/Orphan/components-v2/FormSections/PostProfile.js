import React, { useState, useEffect, useContext } from "react";
import { Formik, Field } from "formik";
import { useOrphanages, useRegions, OrphanContext } from "../../hooks.js";
import DatePicker from "../DatePicker.js";
import RadioButton from "../RadioButton.js";


export default function PostProfile(props) {
	const context = useContext(OrphanContext);

	return (
		<div>
			<Formik
				initialValues={context.child}
				onSubmit={context.onSave}
				render={({ handleSubmit }) => (
					<form className={props.formClass} onSubmit={handleSubmit}>
						<div className="two fields">
							<div className="field">
								<label>16. Date of Child Care Conference</label>
								<Field name="ccc_date" component={DatePicker} />
							</div>
							<div className="field">
								<label>17. Date of Resettlement</label>
								<Field
									name="orphanage_exit_date"
									component={DatePicker}
								/>
							</div>
						</div>
						<div className="ui divider" />
						<div className="field">
							<label>18. Current Guardian Information</label>
							<div className="three fields">
								<div className="field">
									<Field
										name="ccc_care_plan_with_whom_relationship"
										type="text"
									/>
									<span>
										<small>Relationship</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_care_plan_with_whom"
										type="text"
									/>
									<span>
										<small>Contact Information</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_care_plan_with_whom_job"
										type="text"
									/>
									<span>
										<small>Job Title</small>
									</span>
								</div>
							</div>
						</div>
						<div className="ui divider" />

						<div className="field">
							<label>19. DSW Social Worker Information</label>
							<div className="three fields">
								<div className="field">
									<Field
										name="ccc_dsw_caseworker_name"
										type="text"
									/>
									<span>
										<small>Name</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_dsw_caseworker_email"
										type="text"
									/>
									<span>
										<small>Email</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_dsw_caseworker_phone"
										type="text"
									/>
									<span>
										<small>Phone</small>
									</span>
								</div>
							</div>
						</div>
						<div className="ui divider" />

						<div className="field">
							<label>20. Community Mentor</label>
							<div className="three fields">
								<div className="field">
									<Field
										name="ccc_community_mentor_name"
										type="text"
									/>
									<span>
										<small>Name</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_community_mentor_email"
										type="text"
									/>
									<span>
										<small>Email</small>
									</span>
								</div>
								<div className="field">
									<Field
										name="ccc_community_mentor_phone"
										type="text"
									/>
									<span>
										<small>Phone</small>
									</span>
								</div>
							</div>
						</div>
						<div className="ui divider" />

						<div className="field">
							<label style={{ marginBottom: 20 }}>
								21. Assistance Provided by Kaeme Foundation
							</label>
							<div className="field">
								<label>Tuition Assistance</label>
								<div className="two fields">
									<div className="field">
										<Field
											name="ccc_tuition_amount"
											type="text"
										/>
										<span>
											<small>Amount</small>
										</span>
									</div>
									<div className="field">
										<Field
											name="ccc_tuition_duration"
											type="text"
										/>
										<span>
											<small>Duration</small>
										</span>
									</div>
								</div>
							</div>
							<div className="field">
								<label>Nutrition Assistance</label>
								<div className="two fields">
									<div className="field">
										<Field
											name="ccc_nutrition_amount"
											type="text"
										/>
										<span>
											<small>Amount</small>
										</span>
									</div>
									<div className="field">
										<Field
											name="ccc_community_mentor_phone"
											type="text"
										/>
										<span>
											<small>Duration</small>
										</span>
									</div>
								</div>
							</div>
							<div className="field">
								<label>Reunification Package</label>
								<div
									className="inline fields"
									style={{ marginTop: "1em" }}
								>
									<div className="field">
										<Field
											component={RadioButton}
											name="ccc_reunification_package"
											id="Yes"
											label="Yes"
										/>
									</div>
									<div className="field">
										<Field
											component={RadioButton}
											name="ccc_reunification_package"
											id="No"
											label="No"
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			/>
		</div>
	);
}
