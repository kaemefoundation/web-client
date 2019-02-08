import React from "react";
import { Form, Radio, RadioGroup,Textarea, Text } from "react-form";
import UnknownCheckbox from "../UnknownCheckbox";
import ORIcon from "../ORIcon";
import MultiCheckboxArray from "../MultiCheckboxArray";
import FormContainer from "./FormContainer";
class SocialBehaviorPart2 extends React.Component {
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<div className="ui orange message">If the child cannot speak, mark the appropriate box and skip to Part III.</div>
								<RadioGroup field="child_speaks">
									<div className="inline fields">
										<label>Child cannot speak because the child is:</label>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="a baby" />
												<label>a baby</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="too young" />
												<label>too young</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="disabled" />
												<label>disabled</label>
											</div>
										</div>
										
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<div className="three fields">
									<div className="seven wide field">
										<label>
											51. Can you tell me a few things you think you are very good at?
										</label>
										<Textarea field="things_good_at" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="things_good_at" customText="No answer"/>
									</div>
								</div>
								<div className="ui divider"/>
								<RadioGroup field="enjoy_school">
									<div className="inline fields">
										<label>52. Do you enjoy school?</label>
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
												<Radio value="no school" />
												<label>Doesn't go to school</label>
											</div>
										</div>
	
										
									</div>
								</RadioGroup>
								<div className="ui divider" />
								<div className="three fields">
									<div className="seven wide field">
										<label>
											53. In school, what are your favorite subjects or things to do?
										</label>
										<Textarea field="favorite_subject_activities" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="favorite_subject_activities" customText="No answer"/>
									</div>
								</div>
								<div className="ui divider" />
								<div className="three fields">
									<div className="seven wide field">
										<label>
											54. What do you want to be when you grow up?
										</label>
										<Textarea field="future_occupation" />
									</div>
									<div className="two wide field">
										<ORIcon/>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox fieldToUpdate="future_occupation"  customText="No answer" />
									</div>
								</div>
								<div className="ui divider" />
								<div className="field">
									<label>
										55. Do you have a preferred religion?
									</label>
								</div>
								<RadioGroup field="religious_preference_child">
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
								<div className="ui divider" />
								<MultiCheckboxArray
									label="56. What languages do you speak?"
									values={[
										"English",
										"Twi",
										"Ewe",
										"Dagaare",
										"Dagbani",
										"Dangme",
										"Ga",
										"Gonja","Kasem","Mfantse","Nzema","Other"
										
									]}
									field="abuse_history"
								/>
								<div className="field" style={{marginTop:20}}>
								<label>If other, please specify:</label>
								<Text field="spoken_languages_other_description"/>
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

export default SocialBehaviorPart2;
