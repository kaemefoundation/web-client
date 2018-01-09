import React from "react";
import { Form, Textarea, Text, NestedForm, Select } from "react-form";
import Modal from "react-modal";
import { getOrphanageStaff } from "../../api.js";
import { getOrphanageData, putOrphanageData } from "../../../Orphanage/api.js";
import { getCurrentOrphanageIndex } from "../../utils.js";
class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			staff: [],
			orphanage_id: "",
			staffModalOpen: false,
			newCaregiverFormLoading: false
		};
		this.saveStaff = this.saveStaff.bind(this);
		this.formSaved = this.formSaved.bind(this);
	}
	saveStaff(data) {
		this.setState({ newCaregiverFormLoading: true }, () => {
			if (data.existing_staff_id) {
				let existingStaff = {
					orphan_id: this.props.child.id,
					orphanage_staff_id: data.existing_staff_id
				};
				this.form.addValue("interviewed_staff", existingStaff);
			}
			if (Object.keys(data.new_caregiver).length > 0) {
				data.new_caregiver["orphanage_id"] = this.state.orphanage_id;
				getOrphanageData(this.state.orphanage_id).then(orphanage => {
					if (orphanage.staff) {
						orphanage.staff.push(data.new_caregiver);
						putOrphanageData(orphanage)
							.then(newData => {
								let orphanageStaffId =
									newData.staff[newData.staff.length - 1].id;
								this.form.addValue("interviewed_staff", {
									orphan_id: this.props.child.id,
									orphanage_staff_id: orphanageStaffId
								});
								this.form.submitForm();
							})
							.catch(() => {
								this.setState({ staffModalOpen: false });
							});
					}
				});
			} else {
				this.form.submitForm();
			}
		});
	}
	formSaved(values) {
		if (this.state.staffModalOpen) {
			this.setState({ staffModalOpen: false, newCaregiverFormLoading:false });
		}
	}

	refreshStaff() {
		let currentOrphanageIndex = getCurrentOrphanageIndex(
			this.props.child.residences
		);
		getOrphanageStaff(
			this.props.child.residences[currentOrphanageIndex]["orphanage_id"]
		).then(data => {
			let filteredStaff = data.filter(element => {
				let staffExists = this.props.child.interviewed_staff.find(
					interviewedElement => {
						return (
							interviewedElement.orphanage_staff_id ===
							element.value
						);
					}
				);
				return !staffExists;
			});
			this.setState({
				staff: filteredStaff,
				orphanage_id: this.props.child.residences[
					currentOrphanageIndex
				]["orphanage_id"]
			});
		});
	}
	componentDidMount() {
		this.refreshStaff();
	}
	render() {
		let caregiverClass = 'ui attached form';
		if(this.state.newCaregiverFormLoading){
			caregiverClass += ' loading';
		}
		return (
			<div>
				<Form
					ref={form => {
						this.form = form;
					}}
					values={this.props.child}
					onSubmit={this.props.onSave}
					postSubmit={this.formSaved}
				>
					{({ submitForm }) => {
						return (
							<form
								className={this.props.formClass}
								onSubmit={submitForm}
							>
								<div className="field">
									<label>
										48. Please list all managers/caregivers
										interviewed for this form, and their
										contact info/phone numbers:
									</label>
									<table className="ui table celled">
										<thead>
											<tr>
												<th>Name</th>
												<th>Contact Information</th>
												<th>
													Length of time with
													orphanage
												</th>
												<th>Trained/Untrained</th>
											</tr>
										</thead>
										<tbody>
											{this.props.child
												.interviewed_staff_data &&
												this.props.child.interviewed_staff_data.map(
													(element, index) => {
														return (
															<tr key={index}>
																<td>
																	{
																		element[
																			"name"
																		]
																	}
																</td>
																<td>
																	{
																		element[
																			"contact_information"
																		]
																	}
																</td>
																<td>
																	{
																		element[
																			"length_of_time"
																		]
																	}
																</td>
																<td>
																	{
																		element[
																			"trained_or_untrained"
																		]
																	}
																</td>
															</tr>
														);
													}
												)}
										</tbody>
									</table>

									<button
										type="button"
										onClick={() => {
											this.setState({
												staffModalOpen: true
											});
										}}
									>
										Add Staff Member
									</button>
								</div>

								<div className="ui divider" />
								<div className="field">
									<label>
										49. What was the general condition of
										the child’s file? How much of the
										information requested on this form did
										the file contain? Was there anything of
										particular interest?
									</label>
									<Textarea field="condition_of_files" />
								</div>
								<div className="ui divider" />
								<div className="field">
									<label>
										50. Note any additional information not
										captured elsewhere on this form.
									</label>
									<Textarea field="additional_information" />
								</div>
								<button type="submit">Save</button>
							</form>
						);
					}}
				</Form>
				<Modal
					onAfterOpen={() => this.myEl && this.myEl.focus()}
					isOpen={this.state.staffModalOpen}
					onRequestClose={this.closeModal}
					contentLabel="Orphanage Staff Form Modal"
					style={{
						content: {
							right: 240,
							left: 240,
							bottom: "none"
						},
						overlay: { zIndex: 400 }
					}}
				>
					<Form onSubmit={this.saveStaff}>
						{({ submitForm }) => {

							return (
								<form
									className={caregiverClass}
									onSubmit={submitForm}
								>
									<div className="field">
										<h5>
											Select Existing Manager/Caregiver:
										</h5>
										<Select
											field="existing_staff_id"
											options={this.state.staff}
										/>
									</div>
									<h5>Add New Manager/Caregiver:</h5>
									<NestedForm field="new_caregiver">
										<Form>
											<div className="ui grid">
												<div className="field eight wide column">
													<label>Name:</label>
													<Text field={"name"} />
												</div>
												<div className="field eight wide column">
													<label>
														Contact Information:
													</label>
													<Text
														field={
															"contact_information"
														}
													/>
												</div>

												<div className="field eight wide column">
													<label>
														Trained or Untrained:
													</label>
													<Select
														field="trained_or_untrained"
														options={[
															{
																label:
																	"Select One",
																value: ""
															},
															{
																label:
																	"Trained",
																value: "trained"
															},
															{
																label:
																	"Untrained",
																value:
																	"untrained"
															}
														]}
													/>
												</div>
												<div className="field eight wide column">
													<label>
														Length of Time in
														Orphanage:
													</label>
													<Text
														field={"length_of_time"}
													/>
												</div>
											</div>
										</Form>
									</NestedForm>
									<button type="submit">Save</button>
								</form>
							);
						}}
					</Form>
				</Modal>
			</div>
		);
	}
}

export default Notes;
