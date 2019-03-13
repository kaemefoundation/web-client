import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Kaeme components/functions
import Navigation from "./components-v2/Navigation";
import OrphanList from "./components/OrphanList";
import FormContainer from "./components/FormSections/FormContainer";
import { navPart1, navPart2, navPart3, navPart4 } from "./Routes";
import nav from "./Routes-v2.js";
import {
  getOrphanData,
  getLocalStorageOrphanData,
  putOrphanData,
  createOrphan,
  newOrphanObject,
  getRegions,
  getOrphanages
} from "./api.js";
import { OrphanContext } from "./hooks";
import { updateLocalStorage } from "./utils";


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
    this.onClickLoadData = this.onClickLoadData.bind(this);
  }

  saveChild(updatedChild) {
    let newChild = Object.assign({}, updatedChild, {
      id: this.state.child.id
    });
    this.setState({ loading: true }, () => {
      putOrphanData(newChild)
        .then(data => {
          this.setChildState(data);
        })
        .catch(() => {
          this.setState({ error: true,loading:false });
        });
    });
  }
  refreshChild() {
    let orphanId = this.props.match.params.id;
    if (orphanId) {
      getOrphanData(orphanId).then(data => {
        if (data) {
          this.setState({ child: data });
        }
      }).catch(()=>{
        this.setState({error:true,loading:false});
      });
    }
  }
  onClickLoadData(e) {
    let buttonId = e.target.id;
    this.setState({ loading: true }, () => {
      let localOrphanData = getLocalStorageOrphanData(this.state.child.uuid);
      if (buttonId === "local") {
        if (localOrphanData.created) {
          createOrphan(localOrphanData).then(data => {
            this.setState({ child: data, loading: false });
          });
        } else {
          this.saveChild(localOrphanData);
        }
      } else {
        localOrphanData.update = "remote";
        updateLocalStorage(localOrphanData.id, localOrphanData);
        getOrphanData(this.state.child.id)
          .then(data => {
            this.setState({ child: data, loading: false });
          })
          .catch(() => {
            this.setState({ error: true, loading: false });
          });
      }
    });
  }
  setChildState(data) {
    this.setState({ child: data, loading: false });
  }

  addChild() {
    createOrphan(newOrphanObject())
      .then(data => {
        this.setState({ child: data }, () => {
          window.location.href =
            "/orphan/" + data.uuid + "/part1/basic-information";
        });
      })
      .catch(error => {
        this.setState({ error: true, loading:false });
      });
  }
  updateChildWithRelatedData(relatedTableName, data) {
    let relatedData = {};
    relatedData[relatedTableName] = data;
    this.setState({ child: Object.assign({}, this.state.child, relatedData) });
  }
  componentDidMount() {
    this.refreshChild();
    /* cache data to localStorage needed 
      for edit screens (functions will store results from API requests)*/
    getRegions();
    getOrphanages();
  }
  render() {
    let formClass = "ui attached form";
    formClass = this.state.loading ? "ui form loading" : formClass;
    let childId = this.state.child.uuid;
    return (
      <div className="ui grid">
       {this.state.error ? (
          <div className="ui negative message" style={{"margin":"20px auto "}}>
            <div className="header">
              An error has occurred, please contact your system administrator
            </div>
          </div>
        ) : (
          ""
        )}
        {this.props.match.params.id ? (
          <Navigation id={this.props.match.params.id} />
        ) : (
          ""
        )}
        <OrphanContext.Provider value={{child:this.state.child,onSave:this.saveChild}}>
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
          {nav.map((route,index)=>(
            <Route
              key={"newform" + index}
              path={"/orphan/:id/" + route.path}
              render={props => (
                <FormContainer
                  id={childId}
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
          {navPart1.map((route, index) => (
            <Route
              key={"part1" + index}
              path={"/orphan/:id/part1/" + route.path}
              render={props => (
                <FormContainer
                  id={childId}
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
                  id={childId}
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
                  id={childId}
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
                  id={childId}
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
        </OrphanContext.Provider>
      </div>
    );
  }
}

export default Orphan;
