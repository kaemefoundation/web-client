import React, { Component } from "react";
import {
  getOrphanageData,
  getRegions,
  putOrphanageData,
  deleteOrphanage
} from "./api";
import { Formik, Field,FieldArray } from "formik";

import DatePicker from "../Orphan/components-v2/DatePicker";
import OrphanageStaff from "./OrphanageStaff";
import RadioButton from "../Orphan/components-v2/RadioButton.js";

import "./Orphanage.css";

class OrphanageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { orphanage: {}, loading: false, error: false, regions: [] };
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ loading: true }, () => {
        getOrphanageData(this.props.match.params.id)
          .then(data => {
            console.log(data);
            this.setState({ orphanage: data, loading: false });
          })
          .catch(() => {
            this.setState({ error: true, loading: false });
          });
      });
    }
    getRegions().then(data => {
      this.setState({ regions: data });
    });
  }
  onDelete() {
    this.setState({ loading: true }, () => {
      deleteOrphanage(this.props.match.params.id).then(data => {
        if (data["deleted"]) {
          this.props.history.push("/orphanage");
        } else {
          this.setState({ error: true, loading: false });
        }
      });
    });
  }
  onSave(updatedOrphanage) {
    console.log(updatedOrphanage);
    this.setState({ loading: true }, () => {
      putOrphanageData(updatedOrphanage).then(data => {
        this.setState({ orphanage: data, loading: false });
      });
    });
  }

  render() {
    let formClass = "ui form";
    formClass = this.state.loading ? "ui form loading" : formClass;

    return (
      <div className="ui grid">
        <div className="ui ten wide centered column">
          <Formik
            initialValues={this.state.orphanage}
            enableReinitialize={true}
            onSubmit={this.onSave}
            render={({ handleSubmit, values, setFieldValue, submitForm }) => {
              return (
                <form className={formClass} onSubmit={handleSubmit}>
                  <div className="equal width fields">
                    <div className="field">
                      <label>Name of Orphanage</label>
                      <Field name="name" type="text" component="input" />
                    </div>

                    <div className="field">
                      <label>Region</label>
                      <Field name="region_id" component="select">
                        <option value="">Select</option>;
                        {this.state.regions.map(element => {
                          return (
                            <option key={element.value} value={element.value}>
                              {element.label}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <div className="field">
                      <label>Date Established</label>
                      <Field name="date_established" component={DatePicker} />
                    </div>
                  </div>
                  <div className="ui divider" />
                  <div className="equal width fields">
                    <div className="field">
                      <label>What organization runs the orphanage?</label>
                            <div
                        className="inline fields"
                        style={{ marginTop: "1em" }}
                      >
                        <div className="field">
                          <Field
                            component={RadioButton}
                            name="type"
                            id="Religious"
                            label="Religious"
                          />
                        </div>
                        <div className="field">
                          <Field
                            component={RadioButton}
                            name="type"
                            id="Private"
                            label="Private"
                          />
                        </div>
                        <div className="field">
                          <Field
                            component={RadioButton}
                            name="type"
                            id="Government"
                            label="Government"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="field">
                      <label>Licensed by DSW?</label>
                      <div
                        className="inline fields"
                        style={{ marginTop: "1em" }}
                      >
                        <div className="field">
                          <Field
                            component={RadioButton}
                            name="licensed_by_dsw"
                            id="Yes"
                            label="Yes"
                          />
                        </div>
                        <div className="field">
                          <Field
                            component={RadioButton}
                            name="licensed_by_dsw"
                            id="No"
                            label="No"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
              
                <FieldArray
                  name="staff"
                  render={(arrayHelpers) => {
                    return (
                      <>
                        <table className="ui table celled">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>
                                Contact
                                Information
                              </th>
                              <th>
                                Length of time
                                with orphanage
                              </th>
                              <th>
                                Trained/Untrained
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.staff &&
                              values.staff.map(
                                (
                                  element,
                                  index
                                ) => {
                                  return (
                                    <tr
                                      key={
                                        index
                                      }
                                    >
                                      <td>
                                        <Field
                                          name={
                                            "staff."+
                                            index+
                                            ".name"
                                          }
                                          component="input"
                                          type="text"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={
                                            "staff."+
                                            index+
                                            ".contact_information"
                                          }
                                          component="input"
                                          type="text"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={
                                            "staff."+
                                            index+
                                            ".length_of_time"
                                          }
                                          component="input"
                                          type="text"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={
                                            "staff."+
                                            index+
                                            ".trained_or_untrained"
                                          }
                                          component="select"
                                        >
                                          {[
                                            {
                                              label:
                                                "Trained",
                                              value:
                                                "Trained"
                                            },
                                            {
                                              label:
                                                "Untrained",
                                              value:
                                                "Untrained"
                                            }
                                          ].map(
                                            element => {
                                              return (
                                                <option
                                                  key={
                                                    element.value
                                                  }
                                                  value={
                                                    element.value
                                                  }
                                                >
                                                  {
                                                    element.label
                                                  }
                                                </option>
                                              );
                                            }
                                          )}
                                        </Field>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                        <button
                          type="button"
                          onClick={() => {arrayHelpers.push({});console.log(values);}}
                        >
                          Add Staff Member
                        </button>
                      </>
                    );
                  }}
                />
              
            </div>
                  <button className="ui left left floated button" type="submit">
                    Save
                  </button>
                  <button
                    onClick={this.onDelete}
                    className="ui black basic left floated button delete"
                    type="button"
                  >
                    Delete
                  </button>
                </form>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default OrphanageForm;
