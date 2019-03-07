import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Formik, Field } from "formik";

import { useRegionsAndOrphanages,OrphanContext } from "../../hooks.js";
import {
  getYears,
  clearOrphanageList,
  reflect,
  getData
} from "../../api.js";
import { putOrphanageData } from "../../../Orphanage/api.js";
import { getCurrentOrphanageIndex } from "../../utils.js";
import ORIcon from "../ORIcon.js";
import UnknownCheckbox from "../UnknownCheckbox.js";
import DatePicker from "../DatePicker.js";
import MultiCheckbox from "../MultiCheckbox.js";

export default function BasicInformation(props) {
  let [regions, orphanages] = useRegionsAndOrphanages();
  let [orphanageModalOpen, orphanageModalToggle] = useState(false);
  let [currentOrphanageIndex, updateOrphanageIndex] = useState(0);
  const context = useContext(OrphanContext);
  useEffect(() => {
    if (props.child && props.child.residences) {
      updateOrphanageIndex(getCurrentOrphanageIndex(props.child.residences));
    }
  });

  return (
    <div>
      <Formik
        initialValues={context.child}
        onSubmit={context.onSave}
        render={({ handleSubmit }) => (
          <form className={props.formClass} onSubmit={handleSubmit}>
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
            <div className="ui divider" />
             <div className="inline fields">
                  <label>2. Gender</label>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <Field component="input"  type="radio" name="gender" value="male" checked={context.child.gender === "male"} />
                      <label>Male</label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <Field component="input" type="radio" name="gender" value="female" checked={context.child.gender === "female"}/>
                      <label>Female</label>
                    </div>
                  </div>
              </div>
              <div className="ui divider" />

               <div className="two fields">
                  <div className="field">
                    <label>3. Date of Birth</label>
                     <Field name="date_of_birth" component={DatePicker}/>
                  </div>
                  <div className="field">
                    <label>3a. Date of Birth (estimate)</label>
                    <Field name="date_of_birth_estimate" component="select">
                      {getYears().map(element=>{
                        return <option key={element.value} value={element.value}>{element.label}</option>
                      })}
                    </Field>
                  </div>
                </div>

                <div className="ui divider" />
                <div className="field">
                  <label>7. Orphanage Information</label>
                  <Field
                    name={"residences["+currentOrphanageIndex+"]orphanage_id"}
                    component="select"
                  >
                  {orphanages.map(element=>{
                    return <option key={element.value} value={element.value}>{element.label}</option>
                  })}
                  </Field>
                  <button
                    type="button"
                    
                  >
                    Add Orphanage
                  </button>
                </div>
                <div className="ui divider" />
                <div className="two fields">
                  <div className="field">
                    <label>8. Date of Entry Into Orphanage</label>
                   <Field name={"residences["+currentOrphanageIndex+"]entry_date"} component={DatePicker}/>
                  </div>
                  <div className="field">
                    <label>8a. Estimated Date of Entry into Orphanage</label>
                    <Field className="search dropdown" name={"residences["+currentOrphanageIndex+"]entry_date_estimate"}
                      component="select">
                      {getYears().map(element=>{
                        return <option key={element.value} value={element.value}>{element.label}</option>
                      })}
                    </Field>
                  </div>
                </div>
                <div className="ui divider" />

                <div className="three fields">
                  <div className="seven wide field">
                    <label>9. Who was the child referred by?</label>
                    <Field component="input" type="text" name="referred_by" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                    <UnknownCheckbox fieldToUpdate="referred_by"/>
                  </div>
                </div>

                <div className="ui divider" />

                <div className="three fields">
                  <div className="seven wide field">
                    <label>9a. Relationship</label>
                    <Field component="input" type="text" name="referred_by_relationship" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                  <UnknownCheckbox fieldToUpdate="referred_by_relationship"/>
                  </div>
                </div>
                <div className="three fields">
                  <div className="seven wide field">
                    <label>9b. Contact Information</label>
                    <Field component="input" type="text" name="referred_by_contact" />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="seven wide field">
                  <UnknownCheckbox fieldToUpdate="referred_by_contact"/>
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
                      <Field component={MultiCheckbox}
                        value="Double Orphan"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Double Orphan
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Mother Dead"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Mother Dead
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Poverty"
                        name={
                          "residences["+
                          currentOrphanageIndex+
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
                      <Field component={MultiCheckbox}
                        value="Father Dead"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Father Dead
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Parental Mental Health Issues"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Parental Mental Health Issues
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Parental Health Issues"
                        name={
                          "residences["+
                          currentOrphanageIndex+
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
                      <Field component={MultiCheckbox}
                        value="Hope"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Hope For a better life
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Educational Opportunity"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Educational Opportunity
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Other"
                        name={
                          "residences["+
                          currentOrphanageIndex+
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
                      <Field component={MultiCheckbox}
                        value="Mother is mentally ill"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Mother is mentally ill
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Father is mentally ill"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Father is mentally ill
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Parental Drug Abuse"
                        name={
                          "residences["+
                          currentOrphanageIndex+
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
                      <Field component={MultiCheckbox}
                        value="Abandonment"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Abandonment
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Insufficient Care"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Insufficient Care
                    </label>
                  </div>
                  <div className="field">
                    <label>
                      <Field component={MultiCheckbox}
                        value="Child is Disabled"
                        name={
                          "residences["+
                          currentOrphanageIndex+
                          "].admission_reason_checkbox"
                        }
                      />
                      Child is Disabled
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label>
                    <Field component={MultiCheckbox}
                      value="Unknown"
                      name={
                        "residences["+
                        currentOrphanageIndex+
                        "].admission_reason_checkbox"
                      }
                    />
                    Unknown
                  </label>
                </div>
                <div className="ui divider" />
             <button type="submit">
          Submit
        </button>
          </form>
        )}
      />
    </div>
  );
}
