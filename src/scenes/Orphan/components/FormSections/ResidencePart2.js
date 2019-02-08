import React, { Component } from "react";
import { getPriorResidenceIndex, getOtherResidences } from "../../utils";
import { Form, Radio, RadioGroup,Textarea,Text } from "react-form";
import UnknownCheckbox from "../UnknownCheckbox";
import ORIcon from "../ORIcon";
import { getOrphanages } from "../../api.js";
import ResidenceForm from "./ResidenceForm";
import FormContainer from "./FormContainer";
class ResidencePart2 extends Component {
	constructor(props) {
		super(props);
		this.state = { orphanages: [] };
	}
	componentDidMount() {
		getOrphanages().then(data => {
			this.setState({ orphanages: data });
		});
	}
	render() {
		let priorResidenceIndex = -1;
		let otherResidences = [];
		if (this.props.child.residences) {
			priorResidenceIndex = getPriorResidenceIndex(
				this.props.child.residences,
				"orphan"
			);
			otherResidences = getOtherResidences(
				this.props.child.residences,
				priorResidenceIndex,
				"orphan"
			);
		}

		
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<div className="ui divider" />
								<h3>Residence History</h3>
								<h4>
									65.Where Was The Last Place You Lived Before [orphanage]?
							</h4>
								<ResidenceForm
									index={priorResidenceIndex}
									orphanages={this.state.orphanages}
								/>
								<div className="ui divider" />
								<h4>
									66.Have You Ever Left This Orphanage To Go Live With A Family?
								</h4>

								{otherResidences.map((index, i) => {
									return (
										<div className="ui raised segment">
											<ResidenceForm
												key={index}
												index={index}
												orphanages={
													this.state.orphanages
												}
											/>
										</div>
									);
								})}
								

								<div className="ui divider" />
								<RadioGroup field="adult_cane_before_orphanage">
									<div className="inline fields">
										<label>
											67. Before you came here to the orphanage, did any adult ever hit or caned you?
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
												<label> No</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="field">
								<label>If yes, please describe</label>
								<Text field="adult_cane_before_orphanage_description"/>
								</div>
								<h4>Child's Understanding of Current Residence</h4>
								
								<div className="three fields">
									<div className="seven wide field">
										<label>
											<label>68. What do you like about living at [name of orphanage]?</label>
								
										</label>
										<Textarea field="orphanage_good_things" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="orphanage_good_things"  customText="No answer" />
									</div>
								</div>
								<div className="ui divider" />
									<div className="three fields">
									<div className="seven wide field">
										<label>
											<label>69. What do you not like about living at [name of orphanage]?</label>
								
										</label>
										<Textarea field="orphanage_bad_things" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="orphanage_bad_things"  customText="No answer" />
									</div>
								</div>
								<div className="ui divider" />
								<RadioGroup field="attend_school">
									<div className="inline fields">
										<label>
											70. Do you go to school every week (when it’s not vacation)?
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
												<label> No</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no school" />
												<label>I don't attend school</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no answer" />
												<label>Child gives no answer</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<RadioGroup field="enough_homework_time">
									<div className="inline fields">
										<label>
											71. Do you get enough time to do your homework?
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
												<label> No</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no school" />
												<label>I don't attend school</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no answer" />
												<label>Child gives no answer</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="ui divider" />
									<div className="three fields">
									<div className="seven wide field">
										<label>
											<label>72. When you are not at school, what are a few things you do at [orphanage name]?</label>
								
										</label>
										<Textarea field="orphanage_activities" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="orphanage_activities"  customText="No answer" />
									</div>
								</div>
								<div className="ui divider" />
									<div className="three fields">
									<div className="seven wide field">
										<label>
											<label>73. Since you’ve been living here, has any adult ever made you feel bad?</label>
								
										</label>
										<Textarea field="orphanage_adult_feel_bad" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="orphanage_adult_feel_bad"  customText="No answer" />
									</div>
								</div>
								<div className="ui divider" />
								<RadioGroup field="orphanage_adult_cane">
									<div className="inline fields">
										<label>
											74. At the orphanage, has any adult ever hit or caned you?
										</label>

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="yes_misbehaved" />
												<label>Yes, when I misbehaved</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="yes_not_deserve" />
												<label>Yes, and I did not deserve it</label>
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
												<Radio value="no answer" />
												<label>Child gives no answer</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<RadioGroup field="orphanage_other_children_abuse">
									<div className="inline fields">
										<label>
											75. Have any of the other kids bullied or hit you? (Provide details, if possible):

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
												<label> No</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no answer" />
												<label>Child gives no answer</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
			</FormContainer>
		);
	}
}

export default ResidencePart2;
