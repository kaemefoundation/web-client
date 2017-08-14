import React from 'react'
import { Form, Textarea, Radio, RadioGroup } from "react-form";
import FormContainer from "./FormContainer";

class Notes2 extends React.Component{
	render(){
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass}  onSubmit={submitForm}>
								<div className="ui divider"/>
								<div className="field">
									<label>76. Describe the child’s general demeanor
									</label>
									<Textarea field="child_demeanor"/>
								</div>
								<div className="ui divider"/>
								<div className="field">
									<label>77. Note any additional information not captures elsewhere on the form, or overflow from earlier sections:
									</label>
									<Textarea field="additional_information_part2"/>
								</div>
								<div className="ui divider"/>
								<RadioGroup field="qualify_for_leap">
									<div className="inline fields">
										<label>78. Does the child qualify for LEAP?</label>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value={1} />
												<label>Yes</label>
											</div>
										</div>
										<div className="field">
											<div className="ui radio checkbox">
												<Radio value={0} />
												<label>No</label>
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

export default Notes2;