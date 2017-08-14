import React from "react";
import { Form, Radio, RadioGroup } from "react-form";
import DatePicker from "../DatePicker";
import FormContainer from "./FormContainer";
class ChildDesignation extends React.Component {
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<div className="ui attached message">
									<div className="header">
										<h3>If the child has been resettled</h3>
									</div>

								</div>
								<div className="ui attached raised segment">
									<RadioGroup field="resettlement">
										<div className="inline fields">
											<label>
												82. The child has been resettled through:
											</label>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Reunification" />
													<label>Reunification</label>
												</div>
											</div>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Domestic Adoption" />
													<label>
														Domestic Adoption
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
													<Radio value="International Adoption" />
													<label>
														International Adoption
													</label>
												</div>
											</div>
										</div>
									</RadioGroup>
									<div className="ui divider" />
									<div className="field">
                    <label>a. Date of Orphanage Exit</label>
                    <DatePicker field="orphanage_exit_date" />
                  </div>

								</div>
								<div className="ui attached message">
									<div className="header">
										<h3>If the child has <em>not</em> been resettled</h3>
									</div>

								</div>
								<div className="ui attached raised segment">
									<RadioGroup field="permancy_plan">
										<div className="grouped fields">
											<label>
												83. Most appropriate permanency plan for child – social worker recommends:
											</label>
											<div className="field">
												<div className="ui radio checkbox">
													<Radio value="Attempt Resettlement" />
													<label>Attempt Resettlement</label>
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

export default ChildDesignation;
