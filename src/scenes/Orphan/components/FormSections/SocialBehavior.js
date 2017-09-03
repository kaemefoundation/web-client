import React from "react";
import { Form, Radio, RadioGroup,Textarea } from "react-form";
import UnknownCheckbox from "../UnknownCheckbox";

class SocialBehavior extends React.Component {
	render() {
		return (
			
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<div className="field">
									<label>
										41. How does the child relate to his/her peers? (e.g., do they have many friends?)
									</label>
								</div>
								<RadioGroup field="relate_to_peers">
									<div className="inline fields">

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Very Social" />
												<label>Very Social</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Social" />
												<label>Social</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Average" />
												<label>Average</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Timid" />
												<label>Timid</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Isolated" />
												<label>Isolated</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Aggressive" />
												<label>Aggressive</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Unknown" />
												<label>Unknown</label>
											</div>
										</div>
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<div className="field">
									<label>
										42. Does the child have trouble with authority/with adult oversight?
									</label>
								</div>
								<RadioGroup field="trouble_with_authority">
									<div className="inline fields">

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Very Much" />
												<label>Very Much</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Some" />
												<label>Some</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="None" />
												<label>None</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Unknown" />
												<label>Unknown</label>
											</div>
										</div>
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<div className="three fields">
									<div className="seven wide field">
										<label>
											43. What are a few of this child’s particular talents or skills?
										</label>
										<Textarea field="talents_and_skills" />
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="talents_and_skills" />
									</div>
								</div>
								<div className="ui divider" />
								<div className="three fields">
									<div className="seven wide field">
										<label>
											44. What activities or topics is the child most interested in?
										</label>
										<Textarea field="interests" />
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="interests" />
									</div>
								</div>
								<div className="ui divider" />
								<div className="field">
									<label>
										45. What is the child’s religious preference?
									</label>
								</div>
								<RadioGroup field="religious_preference">
									<div className="six wide fields">

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Christianity" />
												<label>Christianity</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Muslim" />
												<label>Muslim</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Seventh Day Adventist" />
												<label>Seventh Day Adventist</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Methodist" />
												<label>Methodist</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Jewish" />
												<label>Jewish</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Traditional" />
												<label>Traditional</label>
											</div>
										</div></div><div className="six wide  fields">

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Catholic" />
												<label>Catholic</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Lutheran" />
												<label>Lutheran</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Mormon" />
												<label>Mormon</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Presbyterian" />
												<label>Presbyterian</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Baptist" />
												<label>Baptist</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Apostolic" />
												<label>Apostolic</label>
											</div>
										</div></div><div className="six wide  fields">

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Baptist" />
												<label>Baptist</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Pentacostal" />
												<label>Pentacostal</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Christian Scientist" />
												<label>Christian Scientist</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Assemblies of God" />
												<label>Assemblies of God</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Lighthouse Chapel" />
												<label>Lighthouse Chapel</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Anglican" />
												<label>Anglican</label>
											</div>
										</div></div><div className="six wide  fields">
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Jehovah Witness" />
												<label>Jehovah Witness</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="No Religion" />
												<label>No Religion</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Unknown" />
												<label>Unknown</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Other" />
												<label>Other</label>
											</div>
										</div>
									</div>
								</RadioGroup>
								<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
		);
	}
}

export default SocialBehavior;
