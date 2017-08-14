import React, { Component } from "react";
import { Form, Text, Radio, RadioGroup} from "react-form";
import FormContainer from './FormContainer';

class AcademicHistory extends Component {
	render() {
		return (
			<FormContainer id={this.props.child.id}>
				<Form values={this.props.child} onSubmit={this.props.onSave}>
					{({ submitForm, setValue, getValue, addValue, values }) => {
						return (
							<form className={this.props.formClass} onSubmit={submitForm}>
								
								<div className="two fields">
									
									<div className="field">
									<label>26. School Name</label>
										<Text field="school_name" />
									</div>
									<div className="field">
									<label>27. Grade </label>
										<Text field="school_grade" />
										
									</div>
					
								</div>
								<div className="field">
									<label>28. School Performance</label>
								</div>
								<RadioGroup field="school_performance">
                  <div className="inline fields">
                    
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="Excellent" /><label>Excellent</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="Good" /><label>Good</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="Average" /><label>Average</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="Acceptable" /><label>Acceptable</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="Poor" /><label>Poor</label>
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

export default AcademicHistory;
