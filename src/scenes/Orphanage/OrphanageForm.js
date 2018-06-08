import React, { Component } from "react";
import {
  getOrphanageData,
  getRegions,
  putOrphanageData,
  deleteOrphanage
} from "./api";
import { Form, Text, Select, Radio, RadioGroup } from "react-form";
import DatePicker from "../Orphan/components/DatePicker";
import OrphanageStaff from "./OrphanageStaff";
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
  showProfileDatePicker() {}
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
          <Form values={this.state.orphanage} onSubmit={this.onSave}>
            {({ submitForm, getValue, setValue, values }) => {
              console.log(values);
              return (
                <form className={formClass} onSubmit={submitForm}>
                  <div className="two fields">
                    <div className="field">
                      <label>Name of Orphanage</label>
                      <Text field="name" />
                    </div>

                    <div className="field">
                      <label>Region</label>
                      <Select field="region_id" options={this.state.regions} />
                    </div>
                  </div>
                  <div className="ui divider" />
                  <div className="equal width fields">
                    <div className="field">
                      <label>What organization runs the orphanage?</label>

                      <RadioGroup field="type">
                        <div className="inline fields">
                          <div className="field">
                            <div className="ui radio checkbox">
                              <Radio value="Private" />
                              <label>Private</label>
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui radio checkbox">
                              <Radio value="Religious" />
                              <label>Religious</label>
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui radio checkbox">
                              <Radio value="Government" />
                              <label>Government</label>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="field">
                      <label>Date Established</label>
                      <DatePicker field="date_established" />
                    </div>
                    <div className="field">
                      <label>Licensed by DSW?</label>

                      <RadioGroup field="licensed_by_dsw">
                        <div className="inline fields">
                          <div className="field">
                            <div className="ui radio checkbox">
                              <Radio value="Yes" />
                              <label>Yes</label>
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui radio checkbox">
                              <Radio value="No" />
                              <label>No</label>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {values.dates_profiled &&
                    values.dates_profiled.length > 0 && (
                      <div>
                        <p>
                          <strong>Dates Profiled:</strong>
                        </p>
                        <div className="ui segments">
                          {values.dates_profiled.split(",").map(element => {
                            return <div className="ui segment">{element}</div>;
                          })}
                        </div>
                      </div>
                    )}
                    <div className="fields" style={{marginTop:15}}>
                  <div className="field">
                    <label>Add a date this orphanage was profiled:</label>
                    <DatePicker field="new_profile_date" />
                  </div>
                  <button
                    style={{margin:"1rem .5rem 0 .5rem"}}
                    className="ui button"
                    onClick={() => {
                      let current_dates_profiled = getValue("dates_profiled");
                      if (current_dates_profiled !== null) {
                        current_dates_profiled +=
                          "," + getValue("new_profile_date");
                      } else {
                        current_dates_profiled = getValue("new_profile_date");
                      }

                      setValue("dates_profiled", current_dates_profiled);
                      submitForm();
                    }}
                    type="button"
                  >
                    Add a profile date
                  </button>
                  </div>
                  <OrphanageStaff field="staff" data={this.state.orphanage} />
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
          </Form>
        </div>
      </div>
    );
  }
}

export default OrphanageForm;
