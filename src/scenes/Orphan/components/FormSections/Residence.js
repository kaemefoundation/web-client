import React, { Component } from "react";
import { getPriorResidenceIndex, getOtherResidences } from "../../utils";
import { Form, Radio, RadioGroup } from "react-form";
import { getOrphanages } from "../../api.js";
import ResidenceForm from "./ResidenceForm";

class Residence extends Component {
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
				"orphanage"
			);
			otherResidences = getOtherResidences(
				this.props.child.residences,
				priorResidenceIndex,
				"orphanage"
			);
		}
		
		return (
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								<RadioGroup field="termination_of_parental_rights">
									<div className="grouped fields">
										<label>
											20. If alive, has there been a legally documented termination of parental rights and responsibility?
										</label>

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="yes" />
												<label>
													Yes, copies/photos attached.
												</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="no" />
												<label>
													No, no documentation or recorded  indication of parental rights termination
												</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="N/A" />
												<label>Not Applicable</label>
											</div>
										</div>
									</div>
								</RadioGroup>

								<div className="ui divider" />

								<RadioGroup field="available_permanent_relocation">
									<div className="inline fields">
										<label>
											21. Is the child available for permanent relocation?
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
												<Radio value="unknown" />
												<label>Unknown</label>
											</div>
										</div>
									</div>
								</RadioGroup>

								<div className="ui divider" />
								<h3>Residence History</h3>
								<h4>
									22. Where did the child reside directly before coming to this orphanage?
								</h4>
								<ResidenceForm
									index={priorResidenceIndex}
									orphanages={this.state.orphanages}
									removeResettlement={true}
								/>
								<div className="ui divider" />
								<h4>
									23. Where else has the child resided, besides the answer to #22?
								</h4>

								{otherResidences.map((index, i) => {
									return (
										<div className="ui raised segment">
											<h4 className="ui red ribbon label">Residence #{i+1}</h4>
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
								<button
									type="button"
									onClick={() => {
										addValue("residences", {
											reported_by: "orphanage",
											orphan_id: this.props.child.id
										});
										this.props.updateChildWithRelatedData("residences", getValue('residences'));
									}}
								>
									Add Residence
								</button>

								<div className="ui divider" />
								<RadioGroup field="child_refugee">
									<div className="inline fields">
										<label>
											24. Is the child a refugee?
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
												<Radio value="unknown" />
												<label>Unknown</label>
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

export default Residence;
