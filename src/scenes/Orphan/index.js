//3rd party library components
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Kaeme components/functions
import Navigation from "./components/Navigation";
import OrphanList from "./components/OrphanList";
import { navPart1, navPart2, navPart3, navPart4 } from "./Routes";
import { getOrphanData, putOrphanData,newOrphan,updateLocalStorage,addToOrphanIdList } from "./api.js";

class Orphan extends Component {
  constructor(props) {
    super(props);
    this.state = { child: {}, error: false,loading:false };
    this.saveChild = this.saveChild.bind(this);
    this.updateChildWithRelatedData = this.updateChildWithRelatedData.bind(this);
    this.addChild = this.addChild.bind(this);
  }
  
  saveChild(updatedChild) {
    
    let newChild = Object.assign({}, updatedChild, {
      id: this.state.child.id
    });
    this.setState({loading:true},()=>{
      putOrphanData(newChild)
      .then((data)=>{
        this.setState({child:data,loading:false});
      })
      .catch(() => {
        this.setState({ error: true });
      });
    });
    
  }
  addChild(){
    localStorage.removeItem("orphans");
    putOrphanData(newOrphan()).then((data)=>{
      this.setState({child:data},()=>{
        addToOrphanIdList(data);
        window.location.href='/orphan/'+data.id+'/part1/basic-information';
      })
    });
  }
  updateChildWithRelatedData(relatedTableName,data){
    let relatedData = {};
    relatedData[relatedTableName] = data;
    this.setState({child: Object.assign({},this.state.child,relatedData)});
    
  }
  componentDidMount() {
    let childId = this.props.match.params.id;
    if (childId) {
      this.setState({loading:true},()=>{
        getOrphanData(childId)
        .then(data => {
          this.setState({ child: data,loading:false });
        })
        .catch(() => {
          this.setState({ error: true,loading:false });
        });
      });
      
    }
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
          <Route path="/" exact render={props=>(<OrphanList addChild={this.addChild} />)} />
          <Route path="/orphan" exact render={props=>(<OrphanList addChild={this.addChild} />)} />
         
          {navPart1.map((route, index) => (
              <Route
                key={"part1" + index}
                path={"/orphan/:id/part1/" + route.path}
                render={props => (
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                )}
              />
            ))}
          {navPart2.map((route, index) => (
              <Route
                key={"part2" + index}
                path={"/orphan/:id/part2/" + route.path}
                render={props => (
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                )}
              />
            ))}
          {navPart3.map((route, index) => (
              <Route
                key={"part3"+index}
                path={"/orphan/:id/part3/" + route.path}
                render={props => (
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                )}
              />
            ))}
          {navPart4.map((route, index) => (
              <Route
                key={"part4" + index}
                path={"/orphan/:id/part4/" + route.path}
                render={props => (
                  <route.component
                    child={this.state.child}
                    onSave={this.saveChild}
                    updateChildWithRelatedData={this.updateChildWithRelatedData}
                    formClass={formClass}
                  />
                )}
              />
            ))}
          
        </Switch>
      </div>
    );
  }
}

export default Orphan;
