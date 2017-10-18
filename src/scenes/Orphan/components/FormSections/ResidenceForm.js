import React from "react";

import { Text, Select, Radio, RadioGroup,Textarea } from "react-form";
import DatePicker from "../DatePicker";
import UnknownCheckbox from "../UnknownCheckbox";

function ResidenceForm({index,orphanages,removeResettlement}) {
	
		return (<div>
			<RadioGroup
									field={[
										"residences",
										index,
										"type"
									]}
								>
									<div className="field">
										<label>
											Residence Type
										</label>
									</div>
									<div className="inline fields">
										

										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Family" />
												<label>Children's Family</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Orphanage" />
												<label>Other Orphanage</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Extended Kin" />
												<label>Extended Kin</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Family Friend" />
												<label>Family Friend</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value="Homeless" />
												<label>
													Homeless/Street Child
												</label>
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
										<label>Entry Date</label>
										<DatePicker
											field={[
												"residences",
												index,
												"entry_date"
											]}
										/>
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox
											fieldToUpdate={[
												"residences",
												index,
												"entry_date"
											]}
										/>
									</div>
								</div>
								<div className="three fields">
									<div className="seven wide field">
										<label>Exit Date</label>
										<DatePicker
											field={[
												"residences",
												index,
												"exit_date"
											]}
										/>
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox
											fieldToUpdate={[
												"residences",
												index,
												"exit_date"
											]}
										/>
									</div>
								</div>
								<div className="three fields">
									<div className="seven wide field">
										<label>Exit Reason</label>
										<Textarea
											field={[
												"residences",
												index,
												"exit_reason"
											]}
										/>
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<UnknownCheckbox
											fieldToUpdate={[
												"residences",
												index,
												"exit_reason"
											]}
										/>
									</div>
								</div>
								<div className="ui divider" />

								{!removeResettlement && <RadioGroup
									field={[
										"residences",
										index,
										"resettlement_attempt"
									]}
								>
									<div className="inline fields">
										<label>
											Was this a resettlement attempt?
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
								</RadioGroup>}
								<div className="ui divider" />
								<h4>For "Other Orphanage," "Family Friends," and "Extended Kin," please list:</h4>
								<div className="three fields">
									<div className="seven wide field">
										<label>Name</label>
										<Text
											field={[
												"residences",
												index,
												"residence_name"
											]}
										/>
									</div>
									<div className="two wide field">
										<a className="ui red circular massive or label">
											OR
										</a>
									</div>
									<div className="seven wide field">
										<label>Orphanage</label>
										<Select
											field={[
												"residences",
												index,
												"orphanage_id"
											]}
											options={orphanages}
										/>
									</div>
								</div>
								<div className="two fields">
								<div className="field">
										<label>Relation</label>
										<Text
											field={[
												"residences",
												index,
												"relation"
											]}
										/>
									</div>
									<div className="field">
										<label>Contact Information/Address</label>
										<Text
											field={[
												"residences",
												index,
												"contact_information"
											]}
										/>
									</div>
								</div></div>
		);
	}


export default ResidenceForm;
