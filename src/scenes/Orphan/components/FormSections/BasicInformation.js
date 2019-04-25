import React, { Component } from "react";
import Modal from "react-modal";
import {
  getYears,
  getRegions,
  getOrphanages,
  clearOrphanageList
} from "../../api.js";
import { putOrphanageData } from "../../../Orphanage/api.js";
import { getCurrentOrphanageIndex } from "../../utils.js";
import { Form, Text, Select, Radio, RadioGroup, Checkbox } from "react-form";
import UnknownCheckbox from "../UnknownCheckbox";
import ORIcon from "../ORIcon";
import MultiCheckbox from "../MultiCheckbox";

class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [], orphanages: [], orphanageModalOpen: false };
    this.saveOrphanage = this.saveOrphanage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    Promise.all([getRegions(), getOrphanages()]).then(values => {
      this.setState({ regions: values[0], orphanages: values[1] });
    });
  }
  saveOrphanage(event) {
    event.preventDefault();
    putOrphanageData({ name: this.orphanage_name.value })
      .then(() => {
        clearOrphanageList();
        getOrphanages().then(data =>
          this.setState({ orphanages: data, orphanageModalOpen: false })
        );
      })
      .catch(() => {
        console.log("error happened");
      });
  }
  openModal() {
    this.setState({ orphanageModalOpen: true });
  }
  closeModal() {
    this.setState({ orphanageModalOpen: false });
  }
  render() {
    let currentOrphanageIndex = 0;
    if (this.props.child && this.props.child.residences) {
      currentOrphanageIndex = getCurrentOrphanageIndex(
        this.props.child.residences
      );
    }
    return (
      <div>
        <Form
          loading={true}
          values={this.props.child}
          onSubmit={this.props.onSave}
        >
          {({ submitForm, setValue, getValue, addValue, values }) => {
            return (
              <form className={this.props.formClass} onSubmit={submitForm}>
                <label>1. Name</label>
                <div className="three fields">
                  <div className="field">
                    <Text field="first_name" />
                    <span>
                      <small>First Name</small>
                    </span>
                  </div>
                  <div className="field">
                    <Text field="middle_name" />
                    <span>
                      <small>Middle Name</small>
                    </span>
                  </div>
                  <div className="field">
                    <Text field="last_name" />
                    <span>
                      <small>Last Name</small>
                    </span>
                  </div>
                </div>
                <div className="ui divider" />
                <RadioGroup field="gender">
                  <div className="inline fields">
                    <label>2. Gender</label>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="male" />
                        <label>Male</label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="female" />
                        <label>Female</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="ui divider" />

                <div className="two fields">
                  <div className="field">
                    <label>3. Hometown</label>
                    <Text field="hometown" />
                  </div>
                  <div className="field">
                    <label>4. Hometown Region</label>
                    <Select field="region_id" options={this.state.regions} />
                  </div>
                </div>

                <div className="ui divider" />

                <div className="two fields">
                  <div className="field">
                    <label>5. Date of Birth</label>
                  </div>
                  <div className="field">
                    <label>5a. Date of Birth (estimate)</label>
                    <Select
                      className="search dropdown"
                      field="date_of_birth_estimate"
                      options={getYears()}
                    />
                  </div>
                </div>

                <div className="ui divider" />

                <div className="three fields">
                  <div className="seven wide field">
                    <label>6. Last Assessed by DSW</label>
                    
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                    <label>
                      <Checkbox field="never_assessed_by_dsw" />
                      Never been assessed
                    </label>
                  </div>
                </div>

                <div className="ui divider" />

                <div className="field">
                  <label>7. Orphanage Information</label>
                  <Select
                    field={[
                      "residences",
                      currentOrphanageIndex,
                      "orphanage_id"
                    ]}
                    options={this.state.orphanages}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({ orphanageModalOpen: true });
                    }}
                  >
                    Add Orphanage
                  </button>
                </div>
                <div className="ui divider" />
                <div className="two fields">
                  <div className="field">
                    <label>8. Date of Entry Into Orphanage</label>
                   
                  </div>
                  <div className="field">
                    <label>8a. Estimated Date of Entry into Orphanage</label>
                    <Select
                      className="search dropdown"
                      field={[
                        "residences",
                        currentOrphanageIndex,
                        "entry_date_estimate"
                      ]}
                      options={getYears()}
                    />
                  </div>
                </div>
                <div className="ui divider" />

                <div className="three fields">
                  <div className="seven wide field">
                    <label>9. Who was the child referred by?</label>
                    <Text field="referred_by" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                    <UnknownCheckbox fieldToUpdate="referred_by" />
                  </div>
                </div>

                <div className="ui divider" />

                <div className="three fields">
                  <div className="seven wide field">
                    <label>9a. Relationship</label>
                    <Text field="referred_by_relationship" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                    <UnknownCheckbox fieldToUpdate="referred_by_relationship" />
                  </div>
                </div>
                <div className="three fields">
                  <div className="seven wide field">
                    <label>9b. Contact Information</label>
                    <Text field="referred_by_contact" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                    <UnknownCheckbox fieldToUpdate="referred_by_contact" />
                  </div>
                </div>

                <div className="ui divider" />
                <div className="field">
                  <label>
                    10. Why was the child admitted to the orphanage?
                  </label>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Double Orphan"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Double Orphan
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Mother Dead"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Mother Dead
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Poverty"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Poverty
                    </label>
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Father Dead"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Father Dead
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Parental Mental Health Issues"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Parental Mental Health Issues
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Parental Health Issues"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Parental Health Issues
                    </label>
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Hope"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Hope For a better life
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Educational Opportunity"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Educational Opportunity
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Other"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Other
                    </label>
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Mother is mentally ill"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Mother is mentally ill
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Father is mentally ill"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Father is mentally ill
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Parental Drug Abuse"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Parental Drug Abuse
                    </label>
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Abandonment"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Abandonment
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Insufficient Care"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Insufficient Care
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <MultiCheckbox
                        value="Child is Disabled"
                        field={[
                          "residences",
                          currentOrphanageIndex,
                          "admission_reason_checkbox"
                        ]}
                      />
                      Child is Disabled
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label>
                    <MultiCheckbox
                      value="Unknown"
                      field={[
                        "residences",
                        currentOrphanageIndex,
                        "admission_reason_checkbox"
                      ]}
                    />
                    Unknown
                  </label>
                </div>
                <div className="ui divider" />
                <div className="field">
                  <label>10a. Is there any further information?</label>
                  <Text
                    field={[
                      "residences",
                      currentOrphanageIndex,
                      "admission_reason"
                    ]}
                  />
                </div>
                <div className="ui divider" />
                <RadioGroup field="official_documentation">
                  <div className="grouped fields">
                    <label htmlFor="official_documentation">
                      11. Is there any official documentation (police order,
                      letter from DSW, court order or other outside
                      documentation) regarding child’s placement in orphanage?
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
                    <div className="field">
                      <div className="ui radio checkbox">
                        <Radio value="unknown" />
                        <label>Unknown</label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="field">
                  <label htmlFor="official_documentation_description">
                    11a. If yes: Describe the documentation, including date:
                  </label>
                  <Text field="official_documentation_description" />
                </div>
                <button type="submit">Save</button>
              </form>
            );
          }}
        </Form>
        <Modal
          onAfterOpen={() => this.myEl && this.myEl.focus()}
          isOpen={this.state.orphanageModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Orphanage Form Modal"
          style={{
            content: { right: 240, left: 240, bottom: "none" },
            overlay: { zIndex: 400 }
          }}
        >
          <form className="ui attached form" onSubmit={this.saveOrphanage}>
            <div className="field">
              <label htmlFor="orphanage_name">Orphanage Name:</label>
              <input
                ref={name => {
                  this.orphanage_name = name;
                }}
                type="text"
                name="orphanage_name"
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default BasicInformation;
