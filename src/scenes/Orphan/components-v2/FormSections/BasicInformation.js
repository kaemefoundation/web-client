import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Formik, Field } from "formik";

import { useOrphanages, useRegions, OrphanContext } from "../../hooks.js";
import {
  getOrphanages,
  clearOrphanageList
} from "../../api.js";
import { putOrphanageData } from "../../../Orphanage/api.js";
import { getCurrentOrphanageIndex } from "../../utils.js";
import ORIcon from "../ORIcon.js";
import UnknownCheckbox from "../UnknownCheckbox.js";
import DatePicker from "../DatePicker.js";
import MultiCheckbox from "../MultiCheckbox.js";
import RadioButton from "../RadioButton.js";

export default function BasicInformation(props) {
  let [orphanages, setOrphanages] = useOrphanages();
  let [regions, setRegions] = useRegions();
  let [orphanageModalOpen, orphanageModalToggle] = useState(false);
  let [newOrphanageName, setOrphanageName] = useState("");
  let [orphanageFormSaving, setOrphanageNameForm] = useState("");
  let [currentOrphanageIndex, setOrphanageIndex] = useState(0);
  const context = useContext(OrphanContext);
  useEffect(() => {
    if (props.child && props.child.residences) {
      setOrphanageIndex(getCurrentOrphanageIndex(props.child.residences));
    }
  });
  function saveOrphanage(name) {
    setOrphanageNameForm(" loading ");
    putOrphanageData({ name: name })
      .then(() => {
        clearOrphanageList();
        getOrphanages().then(data => {
          setOrphanages(data);
          orphanageModalToggle(false);
        });
      })
      .catch(() => {
        console.log("error happened");
      });
  }
  return (
    <div>
      <Formik
        initialValues={context.child}
        onSubmit={context.onSave}
        render={({ handleSubmit }) => (
          <form className={props.formClass} onSubmit={handleSubmit}>
            <div className="field">
              <label>1. Name</label>
              <div className="three fields">
                <div className="field">
                  <Field name="first_name" type="text" />
                  <span>
                    <small>First Name</small>
                  </span>
                </div>
                <div className="field">
                  <Field name="middle_name" type="text" />
                  <span>
                    <small>Middle Name</small>
                  </span>
                </div>
                <div className="field">
                  <Field name="last_name" type="text" />
                  <span>
                    <small>Last Name</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="ui divider" />
            <div className="four fields">
              <div className="field">
                <label>2. Gender</label>
                <div className="inline fields" style={{ marginTop: "1em" }}>
                  <div className="field">
                    <Field
                      component={RadioButton}
                      name="gender"
                      id="male"
                      label="Male"
                    />
                  </div>
                  <div className="field">
                    <Field
                      component={RadioButton}
                      name="gender"
                      id="female"
                      label="Female"
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label>3. Date of Birth</label>
                <Field name="date_of_birth" component={DatePicker} />
              </div>
              <div className="field">
                <label>4a. Hometown</label>
                <Field name="hometown" type="text" component="input" />
              </div>
              <div className="field">
                <label>4b. Hometown Region</label>
                <Field name="region_id" component="select">
                  <option value="">Select</option>
                  {regions.map(element => {
                    return (
                      <option key={element.value} value={element.value}>
                        {element.label}
                      </option>
                    );
                  })}
                </Field>
              </div>
            </div>

            <div className="ui divider" />
            <div className="two fields">
              <div className="field">
                <label>5. Date of Entry Into Orphanage</label>
                <Field
                  name={"residences[" + currentOrphanageIndex + "]entry_date"}
                  component={DatePicker}
                />
              </div>
              <div className="field">
                <label>6. Name of Orphanage</label>
                <Field
                  name={"residences[" + currentOrphanageIndex + "]orphanage_id"}
                  component="select"
                >
                  {orphanages.map(element => {
                    return (
                      <option key={element.value} value={element.value}>
                        {element.label}
                      </option>
                    );
                  })}
                </Field>
                <button
                  type="button"
                  onClick={() => {
                    orphanageModalToggle(true);
                  }}
                >
                  Add Orphanage
                </button>
              </div>
            </div>

            <div className="ui divider" />
            <div className="field">
              <label>7. Why was the child admitted to the orphanage?</label>
            </div>
            <div className="three fields">
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Double Orphan"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Double Orphan
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Mother Dead"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Mother Dead
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Poverty"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Poverty
                </label>
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Father Dead"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Father Dead
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Parental Mental Health Issues"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Parental Mental Health Issues
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Parental Health Issues"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Parental Health Issues
                </label>
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Hope"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Hope For a better life
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Educational Opportunity"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Educational Opportunity
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Other"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Other
                </label>
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Mother is mentally ill"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Mother is mentally ill
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Father is mentally ill"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Father is mentally ill
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Parental Drug Abuse"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Parental Drug Abuse
                </label>
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Abandonment"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Abandonment
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Insufficient Care"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Insufficient Care
                </label>
              </div>
              <div className="field">
                <label>
                  <Field
                    component={MultiCheckbox}
                    value="Child is Disabled"
                    name={
                      "residences[" +
                      currentOrphanageIndex +
                      "].admission_reason_checkbox"
                    }
                  />
                  Child is Disabled
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                <Field
                  component={MultiCheckbox}
                  value="Unknown"
                  name={
                    "residences[" +
                    currentOrphanageIndex +
                    "].admission_reason_checkbox"
                  }
                />
                Unknown
              </label>
            </div>
            <div className="ui divider" />

            <div className="three fields">
              <div className="seven wide field">
                <label>8. Who was the child referred by?</label>
                <Field component="input" type="text" name="referred_by" />
              </div>
              <div className="two wide field">
                <ORIcon />
              </div>
              <div className="seven wide field">
                <UnknownCheckbox fieldToUpdate="referred_by" />
              </div>
            </div>

            <div className="ui divider" />

            <div className="three fields">
              <div className="seven wide field">
                <label>8a. Relationship</label>
                <Field
                  component="input"
                  type="text"
                  name="referred_by_relationship"
                />
              </div>
              <div className="two wide field">
                <ORIcon />
              </div>
              <div className="seven wide field">
                <UnknownCheckbox fieldToUpdate="referred_by_relationship" />
              </div>
            </div>
            <div className="three fields">
              <div className="seven wide field">
                <label>8b. Contact Information</label>
                <Field
                  component="input"
                  type="text"
                  name="referred_by_contact"
                />
              </div>
              <div className="two wide field">
                <ORIcon />
              </div>
              <div className="seven wide field">
                <UnknownCheckbox fieldToUpdate="referred_by_contact" />
              </div>
            </div>

            <div className="ui divider" />
            <button type="submit">Submit</button>
          </form>
        )}
      />
      <Modal
        isOpen={orphanageModalOpen}
        onRequestClose={() => {
          orphanageModalToggle(false);
        }}
        contentLabel="Orphanage Form Modal"
        style={{
          content: { right: 240, left: 240, bottom: "none" },
          overlay: { zIndex: 400 }
        }}
      >
        <form
          className={"ui attached form" + orphanageFormSaving}
          onSubmit={event => {
            event.preventDefault();
            saveOrphanage(newOrphanageName);
          }}
        >
          <div className="field">
            <label htmlFor="orphanage_name">Orphanage Name:</label>
            <input
              type="text"
              name="orphanage_name"
              value={newOrphanageName}
              onChange={e => setOrphanageName(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}
