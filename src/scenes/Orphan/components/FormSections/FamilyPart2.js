import React, { Component } from "react";
import { Form, Radio, RadioGroup,Text } from "react-form";
import ParentRelationshipForm from "./ParentRelationshipForm";
import SiblingRelationshipForm from "./SiblingRelationshipForm";
import OtherRelationshipForm from "./OtherRelationshipForm";
import {
  reportedByOrphanFather,
  reportedByOrphanMother,
  findMultipleRelationshipIndexes
} from "../../utils.js";
import FormContainer from "./FormContainer";
class FamilyPart2 extends Component {
  constructor(props) {
    super(props);
    this.getArrayIndexes = this.getArrayIndexes.bind(this);
  }

  getArrayIndexes(data){
    let fatherIndex = data.findIndex(reportedByOrphanFather);
    let motherIndex = data.findIndex(reportedByOrphanMother);
    let siblingIndexes = findMultipleRelationshipIndexes(
          data,
          "orphan",
          ["sibling"],
          []
        );
    let otherIndexes = findMultipleRelationshipIndexes(
          data,
          "orphan",
          [],
          ["mother", "father", "sibling"]
        );
        return {fatherIndex:fatherIndex, motherIndex:motherIndex, siblingIndexes:siblingIndexes,otherIndexes:otherIndexes};
  }
  render() {
    let indexes = {fatherIndex:-1,motherIndex:-1,siblingIndexes:[],otherIndexes:[]}
    if(this.props.child !== undefined && this.props.child.relationships !== undefined){
      indexes = this.getArrayIndexes(this.props.child.relationships);
    }
      
    return (
      <FormContainer id={this.props.child.id}>
        <Form values={this.props.child} onSubmit={this.props.onSave}>
          {({ submitForm, setValue, getValue, addValue, values,getTouched }) => {
            return (
              <form className={this.props.formClass} onSubmit={submitForm}>
                <ParentRelationshipForm
                  title="14. Mother"
                  index={indexes.motherIndex}
                  getValue={getValue}
                />
                <div className="ui divider" />
                <div className="two wide fields">
                <RadioGroup field={["relationships",indexes.motherIndex,'desire_to_reside']}>
                  <div className="inline fields">
                    <label>
                   Would Like To Live With Mother
                    </label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                <div className="field">
                <label>Why/why not</label>
                <Text field={["relationships",indexes.motherIndex,"desire_to_reside_reason"]}/>
                </div>
                </div>
                <div className="ui divider" />
                <ParentRelationshipForm
                  title="15. Father"
                  index={indexes.fatherIndex}
                  getValue={getValue}
                />
                <div className="ui divider" />
                <div className="two wide fields">
                <RadioGroup field={["relationships",indexes.fatherIndex,'desire_to_reside']}>
                  <div className="inline fields">
                    <label>
                   Would Like To Live With Father
                    </label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                <div className="field">
                <label>Why/why not</label>
                <Text field={["relationships",indexes.fatherIndex,"desire_to_reside_reason"]}/>
                </div>
                </div>
                <div className="ui divider" />
                <h3>Siblings</h3>
                <SiblingRelationshipForm indexes={indexes.siblingIndexes} />
                <button type="button"
                  onClick={(e) => {
                    addValue("relationships", {
                      reported_by: "orphan",
                      orphan_id: this.props.child.id,
                      date_of_birth:null,
                      relationship_type:"sibling"
                    });
                    
                    this.props.updateChildWithRelatedData("relationships", getValue('relationships'));
                  }}
                >
                  Add Sibling
                </button>
                      <div className="ui divider" />
                <h3>Other Relatives</h3>
                <OtherRelationshipForm indexes={indexes.otherIndexes} />
                <button type="button"
                  onClick={() => {

                    addValue("relationships", {
                      reported_by: "orphan",
                      orphan_id: this.props.child.id,
                      date_of_birth:null
                    });
                     this.props.updateChildWithRelatedData("relationships", getValue('relationships'));
                  }}
                >
                  Add Relative
                </button>
                <button type="submit">Save</button>
              </form>
            );
          }}
        </Form>
      </FormContainer>
    );
  }
}

export default FamilyPart2;
