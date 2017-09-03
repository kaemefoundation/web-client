import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Kaeme components/functions
import Navigation from "./components/Navigation";
import OrphanList from "./components/OrphanList";
import FormContainer from "./components/FormSections/FormContainer";
import { navPart1, navPart2, navPart3, navPart4 } from "./Routes";
import {
  getOrphanData,
  putOrphanData,
  createOrphan,
  newOrphanObject,
  addToOrphanIdList,
  getOrphanList,
  getRegions,
  getOrphanages
} from "./api.js";
import { getLocalStorage, updateLocalStorage } from "./utils";
class Orphan extends Component {
  constructor(props) {
    super(props);
    this.state = { child: {}, orphanList: [], error: false, loading: false };
    this.saveChild = this.saveChild.bind(this);
    this.updateChildWithRelatedData = this.updateChildWithRelatedData.bind(
      this
    );
    this.addChild = this.addChild.bind(this);
    this.setChildState = this.setChildState.bind(this);
    this.retrieveRemoteDataAndSetChild = this.retrieveRemoteDataAndSetChild.bind(
      this
    );
    this.retrieveLocalStorageAndSetChild = this.retrieveLocalStorageAndSetChild.bind(
      this
    );
    this.onClickLoadData = this.onClickLoadData.bind(this);
  }

  saveChild(updatedChild) {
    let newChild = Object.assign({}, updatedChild, {
      id: this.state.child.id
    });
    this.setState({ loading: true }, () => {
      putOrphanData(newChild)
        .then(data => {
          console.log(data.update);
          this.setChildState(data);
        })
        .catch(() => {
          this.setState({ error: true });
        });
    });
  }
  onClickLoadData(e) {
    let buttonId = e.target.id;
    this.setState({ loading: true }, () => {
      if (buttonId === "local") {
        this.retrieveLocalStorageAndSetChild(this.state.child.id);
      } else {
        let orphan = getLocalStorage(this.state.child.id);
        orphan.update = 'remote';
        updateLocalStorage(orphan.id,orphan);
        this.retrieveRemoteDataAndSetChild(this.state.child.id);
      }
    });
  }
  retrieveRemoteDataAndSetChild(id) {
    getOrphanData(id)
      .then(data => {
        
        this.setChildState(data);
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }

  retrieveLocalStorageAndSetChild(id) {
    let orphan = getLocalStorage(id);
    // if this is a newly created that was created offline,
    // remove id to get actual id from database
    if (orphan.created) {
      orphan.id = null;
      createOrphan(orphan).then(data => {
        this.setState({ child: data, loading: false }, () => {
          addToOrphanIdList(data);
        });
      });
    } else {
      this.saveChild(orphan);
    }
  }
  setChildState(data) {
    this.setState({ child: data, loading: false });
  }

  addChild() {
    localStorage.removeItem("orphans");
    createOrphan(newOrphanObject()).then(data => {
      this.setState({ child: data }, () => {
        addToOrphanIdList(data);
        window.location.href =
          "/orphan/" + data.id + "/part1/basic-information";
      });
    });
  }
  updateChildWithRelatedData(relatedTableName, data) {
    let relatedData = {};
    relatedData[relatedTableName] = data;
    this.setState({ child: Object.assign({}, this.state.child, relatedData) });
  }
  componentDidMount() {
    let childId = this.props.match.params.id;
    if (childId) {
      this.retrieveRemoteDataAndSetChild(childId);
    }
    /* cache data to localStorage needed 
      for edit screens (functions will store results from API requests)*/
    getRegions();
    getOrphanages();
  }
  render() {
    let formClass = "ui attached form";
    formClass = this.state.loading ? "ui form loading" : formClass;
    return (
      <div className="ui grid">
        {this.props.match.params.id
          ? <Navigation id={this.props.match.params.id} />
          : ""}

        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <OrphanList
                addChild={this.addChild}
                orphans={this.state.orphanList}
              />
            )}
          />
          <Route
            path="/orphan"
            exact
            render={props => (
              <OrphanList
                addChild={this.addChild}
                orphans={this.state.orphanList}
              />
            )}
          />

          {navPart1.map((route, index) => (
            <Route
              key={"part1" + index}
              path={"/orphan/:id/part1/" + route.path}
              render={props => (
                <FormContainer
                  id={this.state.child.id}
                  onClickLoadData={this.onClickLoadData}
                >
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                    onClickLoadData={this.onClickLoadData}
                  />
                </FormContainer>
              )}
            />
          ))}
          {navPart2.map((route, index) => (
            <Route
              key={"part2" + index}
              path={"/orphan/:id/part2/" + route.path}
              render={props => (
                <FormContainer
                  id={this.state.child.id}
                  onClickLoadData={this.onClickLoadData}
                >
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                </FormContainer>
              )}
            />
          ))}
          {navPart3.map((route, index) => (
            <Route
              key={"part3" + index}
              path={"/orphan/:id/part3/" + route.path}
              render={props => (
                <FormContainer
                  id={this.state.child.id}
                  onClickLoadData={this.onClickLoadData}
                >
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                    onClickLoadData={this.onClickLoadData}
                  />
                </FormContainer>
              )}
            />
          ))}
          {navPart4.map((route, index) => (
            <Route
              key={"part4" + index}
              path={"/orphan/:id/part4/" + route.path}
              render={props => (
                <FormContainer
                  id={this.state.child.id}
                  onClickLoadData={this.onClickLoadData}
                >
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                </FormContainer>
              )}
            />
          ))}

        </Switch>
      </div>
    );
  }
}

export default Orphan;
