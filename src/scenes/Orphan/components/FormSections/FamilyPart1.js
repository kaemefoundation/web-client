import React, { Component } from "react";
import { Form, Radio, RadioGroup,Text } from "react-form";
import ParentRelationshipForm from "./ParentRelationshipForm";
import SiblingRelationshipForm from "./SiblingRelationshipForm";
import OtherRelationshipForm from "./OtherRelationshipForm";
import {
  reportedByOrphanageFather,
  reportedByOrphanageMother,
  findMultipleRelationshipIndexes
} from "../../utils.js";

class FamilyPart1 extends Component {
  constructor(props) {
    super(props);
    this.getArrayIndexes = this.getArrayIndexes.bind(this);
  }

  getArrayIndexes(data){
    let fatherIndex = data.findIndex(reportedByOrphanageFather);
    let motherIndex = data.findIndex(reportedByOrphanageMother);
    console.log(motherIndex);
    console.log(fatherIndex);
    let siblingIndexes = findMultipleRelationshipIndexes(
          data,
          "orphanage",
          ["sibling"],
          []
        );
    let otherIndexes = findMultipleRelationshipIndexes(
          data,
          "orphanage",
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
      console.log(this.props.child.id);
    

    return (
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
                <ParentRelationshipForm
                  title="15. Father"
                  index={indexes.fatherIndex}
                  getValue={getValue}
                />
                <div className="ui divider" />
                <RadioGroup field="parents_living_together">
                  <div className="grouped fields">
                    <label htmlFor="parents_living_together">
                    If alive, are both parents living together?
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
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="one_both_parents_dead" /><label>One/both parents are deceased</label>
                      </div>
                    </div>
                     <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="unknown" /><label>Unknown</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                <div className="ui divider" />
                <h3>Siblings</h3>
                <SiblingRelationshipForm indexes={indexes.siblingIndexes} />
                <button type="button"
                  onClick={(e) => {
                    addValue("relationships", {
                      reported_by: "orphanage",
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
      <RadioGroup field="sibling_split">
                  <div className="inline fields">
                    <label>Is there a sibling split?</label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="yes" /><label>Yes</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no" /><label>No, all the siblings live together in this orphanage</label>
                      </div>
                    </div>
                     <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="no_siblings" /><label>No, there are no siblings</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="unknown" /><label>Unknown</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                <div className="field">
                    <label>If yes, why?</label>
                    <Text field="sibling_split_reason" />
                  </div>
                <div className="ui divider" />
                <h3>Other Relatives</h3>
                <OtherRelationshipForm indexes={indexes.otherIndexes} />
                <button type="button"
                  onClick={(e) => {
                    addValue("relationships", {
                      reported_by: "orphanage",
                      orphan_id: this.props.child.id,
                      date_of_birth:null,
                      relationship_type:""
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
    );
  }
}

export default FamilyPart1;
