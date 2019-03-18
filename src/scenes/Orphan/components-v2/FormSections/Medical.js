import React, { useState, useEffect, useContext } from "react";

import { Formik, Field } from "formik";
import { OrphanContext } from "../../hooks.js";

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
						<div className="three fields">
								<div className="field">
								<label>
									12. Does the child have any physical disabilities?
								</label>
								<div className="inline fields">
									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="physical_disability_radio"
												value="no"
												checked={
													context.child
														.physical_disability_radio ===
													"no"
												}
											/>
											<label>No</label>
										</div>
									</div>

									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="physical_disability_radio"
												value="yes"
												checked={
													context.child
														.physical_disability_radio ===
													"yes"
												}
											/>
											<label>Yes</label>
										</div>
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
									13. Does the child have any mental disabilities?
								</label>
								<div className="inline fields">
									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="mental_disability_radio"
												value="no"
												checked={
													context.child
														.mental_disability_radio ===
													"no"
												}
											/>
											<label>No</label>
										</div>
									</div>

									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="physical_disability_radio"
												value="yes"
												checked={
													context.child
														.mental_disability_radio ===
													"yes"
												}
											/>
											<label>Yes</label>
										</div>
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
							<div className="field">
								<label>
									14. Does the child have a history of
									physical, sexual or emotional abuse?
								</label>
								<div className="inline fields">
									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="abuse_history_radio"
												value="no"
												checked={
													context.child
														.abuse_history_radio ===
													"no"
												}
											/>
											<label>No</label>
										</div>
									</div>

									<div className="field">
										<div className="ui radio checkbox">
											<Field
												component="input"
												type="radio"
												name="abuse_history_radio"
												value="yes"
												checked={
													context.child
														.abuse_history_radio ===
													"yes"
												}
											/>
											<label>Yes</label>
										</div>
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
							</div>
						</form>
					);
				}}
			/>
		</div>
	);
}
