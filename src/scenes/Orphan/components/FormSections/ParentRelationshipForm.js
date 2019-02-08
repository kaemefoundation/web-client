import React from 'react'


import { Text, Radio, RadioGroup,Textarea } from "react-form";
import UnknownCheckbox from "../UnknownCheckbox";
import ORIcon from "../ORIcon";


function ParentRelationshipForm({title, index, getValue}){
  let isDeceased = getValue(["relationships", index, "vital_status"]) === 'deceased';
return (    <div className="ui segment"><h3 className="ui big top attached label">{title}</h3>
                <div className="fields">
                  <div className="nine wide field">
                    <label>A. Name</label>
                    <Text field={["relationships", index, "name"]} />
                  </div>
                  <div className="seven wide field">
                    <RadioGroup
                      field={["relationships", index, "vital_status"]}
                    >
                      <div className="grouped fields">
                        <label>
                          Vital Status
                        </label>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="alive" /><label>Alive</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="deceased" /><label>Deceased</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="unknown" /><label>Unknown</label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="ui divider" />
                {isDeceased ? (<div>
                    <RadioGroup
                      field={["relationships", index, "cause_of_death"]}
                    >
                      <div className="grouped fields">
                        <label>
                          B. If deceased, cause of death
                        </label>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="aids" /><label>AIDS</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="malnourished" /><label>Malnourished</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="disease" /><label>Disease</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="chronic_disease" /><label>Chronic Disease</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="malaria" /><label>Malaria</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="tuberculosis" /><label>Tuberculosis</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="accident" /><label>Accident</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <Radio value="unknown" /><label>Unknown</label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>) : 
                (<div><div className="three fields">
                  <div className="nine wide field">
                    <label>C. Occupation</label>
                    <Text
                      field={["relationships", index, "occupation"]}
                    />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="five wide field">
                    <UnknownCheckbox
                      fieldToUpdate={[
                        "relationships",
                        index,
                        "occupation"
                      ]}
                    />
                  </div>
                </div>

                <div className="ui divider" />
                <div className="three fields">
                  <div className="nine wide field">
                    <label>D. Address</label>
                    <Text field={["relationships", index, "address"]} />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="five wide field">
                    <UnknownCheckbox
                      fieldToUpdate={["relationships", index, "address"]}
                    />
                  </div>
                </div>
                 <div className="ui divider" />
                <div className="three fields">
                  <div className="nine wide field">
                    <label>E. Contact Information</label>
                    <Textarea field={["relationships", index, "phone_number"]} />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="five wide field">
                    <UnknownCheckbox
                      fieldToUpdate={["relationships", index, "phone_number"]}
                    />
                  </div>
                </div>
                <div className="ui divider" />
                <div className="three fields">
                  <div className="nine wide field">
                    <label>F. Date of Last Contact</label>
                    <Textarea field={["relationships", index, "date_of_last_visit"]} />
                  </div>
                  <div className="two wide field">
                    <ORIcon/>
                  </div>
                  <div className="five wide field">
                    <UnknownCheckbox
                      fieldToUpdate={["relationships", index, "date_of_last_visit"]}
                    />
                  </div>
                </div></div>)
              }

                </div>)
}

export default ParentRelationshipForm;