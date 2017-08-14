import React from "react";
import { Form, Textarea } from "react-form";
import FormContainer from "./FormContainer"
class Notes extends React.Component {
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm }) => {
						return (
							<form className={this.props.formClass}  onSubmit={submitForm}>
								<div className="field">
									<label>
										48. Please list all managers/caregivers interviewed for this form, and their contact info/phone numbers:
									</label>
								</div>
								
								<div className="ui divider"/>
								<div className="field">
									<label>49. What was the general condition of the child’s file? How much of the information requested on this form did the file contain? Was there anything of particular interest?
									</label>
									<Textarea field="condition_of_files"/>
								</div>
								<div className="ui divider"/>
								<div className="field">
									<label>50. Note any additional information not captured elsewhere on this form.
									</label>
									<Textarea field="additional_information"/>
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

export default Notes;
