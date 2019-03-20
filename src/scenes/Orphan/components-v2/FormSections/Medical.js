import React, { useState, useEffect, useContext } from "react";

import { Formik, Field } from "formik";
import { OrphanContext } from "../../hooks.js";
import RadioButton from "../RadioButton.js";

export default function Medical(props) {
	const context = useContext(OrphanContext);
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
							<div className="two fields">
								<div className="field">
									<label>
										12. Does the child have any physical
										disabilities?
									</label>
									<div className="inline fields">
										<div className="field">
											<Field
												component={RadioButton}
												name="physical_disability_radio"
												id="no"
												label="No"
											/>
										</div>

										<div className="field">
											<Field
												component={RadioButton}
												name="physical_disability_radio"
												id="yes"
												label="Yes"
											/>
										</div>
									</div>
									<div
										className="field"
										style={{ marginTop: 7 }}
									>
										<label>If yes, please describe:</label>
										<Field
											component="input"
											type="text"
											name="physical_disability_description"
										/>
									</div>
								</div>
								<div className="field">
									<label>
										13. Does the child have any mental
										disabilities?
									</label>
									<div className="inline fields">
										<div className="field">
											<Field
												component={RadioButton}
												name="mental_disability_radio"
												id="no"
												label="No"
											/>
										</div>

										<div className="field">
											<Field
												component={RadioButton}
												name="mental_disability_radio"
												id="yes"
												label="Yes"
											/>
										</div>
									</div>
									<div
										className="field"
										style={{ marginTop: 7 }}
									>
										<label>If yes, please describe:</label>
										<Field
											component="input"
											type="text"
											name="mental_disability_description"
										/>
									</div>
								</div>
							</div>
							<div className="ui divider" />
							<div className="two fields">
								<div className="field">
									<label>
										14. Does the child have a history of
										physical, sexual or emotional abuse?
									</label>
									<div className="inline fields">
										<div className="field">
											<Field
												component={RadioButton}
												name="abuse_history_radio"
												id="no"
												label="No"
											/>
										</div>

										<div className="field">
											<Field
												component={RadioButton}
												name="abuse_history_radio"
												id="yes"
												label="Yes"
											/>
										</div>
									</div>
									<div
										className="field"
										style={{ marginTop: 7 }}
									>
										<label>If yes, please describe:</label>
										<Field
											component="input"
											type="text"
											name="abuse_history_description"
										/>
									</div>
								</div>

								<div className="field">
									<label>
										15. Any health issues to be aware of?
									</label>
									<div className="inline fields">
										<div className="field">
											<Field
												component={RadioButton}
												name="health_issues_radio"
												id="no"
												label="No"
											/>
										</div>

										<div className="field">
											<Field
												component={RadioButton}
												name="health_issues_radio"
												id="yes"
												label="Yes"
											/>
										</div>
									</div>
									<div
										className="field"
										style={{ marginTop: 7 }}
									>
										<label>If yes, please describe:</label>
										<Field
											component="input"
											type="text"
											name="health_issues_description"
										/>
									</div>
								</div>
							</div>
							 <button type="submit">
          Submit
        </button>
						</form>
					);
				}}
			/>
		</div>
	);
}
