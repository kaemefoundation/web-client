import React, {Component} from 'react';
import { Form, Radio, RadioGroup } from "react-form";
import FormContainer from './FormContainer';

class IdentificationInformation extends Component {
	render(){
   
		return (<FormContainer id={this.props.child.id}>
        <Form values={this.props.child} onSubmit={this.props.onSave}>
          {({ submitForm, setValue, getValue, addValue, values }) => {
            return (
              <form className={this.props.formClass} onSubmit={submitForm}>
                <RadioGroup field="official_id">
                  <div className="grouped fields">
                    <label htmlFor="official_id">
                     12. Does the child have an ID card, NHI, passport or other identification on file?
                    </label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes, on file</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No, no copy on file</label>
                      </div>
                    </div>
                    
                  </div>
                </RadioGroup>
                <div className="ui divider" />
                <RadioGroup field="birth_certificate">
                  <div className="grouped fields">
                    <label htmlFor="birth_certificate">
                    13. Does the child have a birth certificate on file?
                    </label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes, on file</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No, no copy on file</label>
                      </div>
                    </div>
                    
                  </div>
                </RadioGroup>
                <button type="submit">Save</button>
                </form>);
	
          }}
        </Form>
      </FormContainer>
    );
}
}

export default IdentificationInformation;