import React, { Component } from "react";
import MultiCheckboxArray from "../MultiCheckboxArray";
import { Form, Radio, RadioGroup, Text, Textarea } from "react-form";
import {
	reportedByOrphanageFather,
	reportedByOrphanageMother
} from "../../utils.js";
import DatePicker from "../DatePicker";
import Vaccine from "./Vaccine";
import FormContainer from "./FormContainer";
class MedicalInformation extends Component {
	render() {
		let motherIndex = -1;
		let fatherIndex = -1;
		if (this.props.child.relationships) {
			motherIndex = this.props.child.relationships.findIndex(
				reportedByOrphanageMother
			);
			fatherIndex = this.props.child.relationships.findIndex(
				reportedByOrphanageFather
			);
		}
		let vaccines = [];
		if (this.props.child.vaccines) {
			vaccines = this.props.child.vaccines;
		}
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>

								<MultiCheckboxArray
									label="29a. Please mark the last known health status of the birth mother."
									values={[
										"HIV/AIDS",
										"Lame",
										"Blind/Visually Impaired",
										"Mute",
										"Deaf",
										"Sickle Cell Anemia",
										"Mentally Ill",
										"Depressed",
										"Deceased",
										"Normal",
										"Unknown"
									]}
									field={[
										"relationships",
										motherIndex,
										"health_status"
									]}
								/>
								<div className="ui divider" />
								<MultiCheckboxArray
									label="29b. Please mark the last known health status of the birth father."
									values={[
										"HIV/AIDS",
										"Lame",
										"Blind/Visually Impaired",
										"Mute",
										"Deaf",
										"Sickle Cell Anemia",
										"Mentally Ill",
										"Depressed",
										"Deceased",
										"Normal",
										"Unknown"
									]}
									field={[
										"relationships",
										fatherIndex,
										"health_status"
									]}
								/>
								<div className="ui divider" />
								<div className="fields">
									<div className="eight wide field">
										<RadioGroup field="medical_evaluation">
											<div className="grouped fields">
												<label>
													30. Has there been a documented, complete and thorough medical evaluation of the child?
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
									</div>
									<div className="eight wide field">
										<label>
											30a. If yes: Date of the child’s last evaluation:
										</label>
										<DatePicker field="medical_evaluation_last_date" />
									</div>
								</div>
								<div className="ui divider" />
								<RadioGroup field="current_health_status">
									<div className="inline fields">
										<label>
											31. Summarize the current health status of child.
										</label>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="excellent" />
												<label>Excellent</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="good" />
												<label>Good</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="average" />
												<label>Average</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="acceptable" />
												<label>Acceptable</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="poor" />
												<label>Poor</label>
											</div>
										</div>
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<div className="two fields">
									<div className="field">
										<RadioGroup field="physical_disability">
											<div className="grouped fields">
												<label>
													32. Does the child have a known physical disability?
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

											</div>
										</RadioGroup>
									</div>
									<div className="field">
										<RadioGroup field="learning_disability">
											<div className="grouped fields">
												<label>
													33. Does the child have a known learning disability?
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

											</div>
										</RadioGroup>
									</div>
								</div>
								<div className="ui divider" />
								<div className="two fields">
									<div className="field">
										<RadioGroup field="mental_disability">
											<div className="grouped fields">
												<label>
													34. Does the child have a known mental disability?
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

											</div>
										</RadioGroup>
									</div>
									<div className="field">
										<RadioGroup field="drug_alcohol_abuse">
											<div className="grouped fields">
												<label>
													36. Does the child have a known history of drug/alcohol abuse?
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

											</div>
										</RadioGroup>
									</div>
								</div>
								<div className="ui divider" />
								<MultiCheckboxArray
									label="37. Specifically, does the child suffer from any of the following?"
									values={[
										"HIV/AIDS",
										"Lame",
										"Blind/Visually Impaired",
										"Mute",
										"Deaf",
										"Sickle Cell Anemia",
										"Mentally Ill",
										"Speech Impediment",
										"Hyperactive",
										"Depressed",
										"Mental Health Issues",
										"Steals",
										"Problems Walking",
										"Aggressive",
										"Anxious",
										"Assimilation Issues",
										"Bullies Others",
										"Is Distracted Easily",
										"Rude/Disrespectful",
										"Sleeping Problems",
										"Dyslexia",
										"Temper Issues",
										"Drug Addiction",
										"Alcohol Addiction",
										"None of the Above",
										"Unknown"
									]}
									field="specific_ailments"
								/>
								<br />
								<div className="six wide field">
									<label>Other (please describe):</label>
									<Text field="specific_ailments_other" />
								</div>
								<div className="ui divider" />
								<div className="fields">
									<div className="four wide field">
										<RadioGroup field="hospitalized">
											<div className="grouped fields">
												<label>
													38. Has the child ever been hospitalized?
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
									</div>
									<div className="twelve wide field">
										<label>
											If yes, please describe
										</label>
										<Textarea field="hospitalized_description" />
									</div>
								</div>
								<div className="ui divider" />
								<table className="ui celled padded table">
									<thead>
									<tr>
										<th>Vaccine</th>
										<th>Received Vaccine?</th>
										<th>Age at Vaccination</th>
										<th>Date of Vaccination</th>
										
									</tr>
									</thead>
									<tbody>
									{vaccines.map((element, i) => {
										return (
											<Vaccine key={i}
												index={i}
												label={element.vaccine}
											/>
										);
									})}
									</tbody>
								</table>
								<div className="ui divider" />
								<div className="fields">
									<div className="eight wide field">
										<label>
											40. Has the child been tested for HIV/AIDS?
										</label>
										<RadioGroup field="hiv_aids_tested">

											<div className="inline fields">

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
									</div>
									<div className="eight wide field">
										<label>
											40a. If yes: What were the results?
											{" "}
										</label>
										<RadioGroup field="hiv_aids_tested_results">
											<div className="inline fields">

												<div className="field">
													<div className="ui radio checkbox">
														<Radio value="Negative" />
														<label>Negative</label>
													</div>
												</div>
												<div className="field">
													<div className="ui radio checkbox">
														<Radio value="HIV Positive" />
														<label>
															HIV Positive
														</label>
													</div>
												</div>
												<div className="field">
													<div className="ui radio checkbox">
														<Radio value="AIDS Positive" />
														<label>
															AIDS Positive
														</label>
													</div>
												</div>
											</div>
										</RadioGroup>
									</div>
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

export default MedicalInformation;
