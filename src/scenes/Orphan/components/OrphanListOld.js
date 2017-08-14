import React, { Component } from "react";
import { getOrphanList,getOrphanData,getLocalStorage,updateLocalStorage } from "../api";
import ArrowIcon from "./ArrowIcon";
import { Button } from "semantic-ui-react";
import {} from "../api";

class OrphanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      readOnly: true,
      prevPage: null,
      nextPage: null,
      showFilters: false,
      sortBy: "asc",
      currentSort: "",
      filters: {
        id: "",
        last_name: "",
        first_name: "",
        date_of_birth: "",
        gender: "",
        name: "",
        resettlement: "",
        created_at: ""
      },
      rows: [],
      localOrphanIdList:[]
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.getFilteredRows = this.getFilteredRows.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.filterRow = this.filterRow.bind(this);
    this.getRow = this.getRow.bind(this);
    this.sortRows = this.sortRows.bind(this);
    this.saveToLocalStorage= this.saveToLocalStorage.bind(this);
  }
  componentDidMount() {
    getOrphanList().then(data => {
      let modifiedData = data["records"].map(row => {
        row.special_needs = this.isSpecialNeeds(row) ? "Yes" : "No";
        return row;
      });
      this.setState({
        rows: modifiedData,
        readOnly: data.readonly,
        loading: false,
        localOrphanIdList: getLocalStorage('orphan-id-list')
      });
    });
  }
  saveToLocalStorage(row){
      let localOrphanList = getLocalStorage('orphans') || [];
      let localOrphanIdList = getLocalStorage('orphan-id-list') || [];
      localOrphanList.push(row);
      localOrphanIdList.push(row.id);
      updateLocalStorage('orphans',localOrphanList);
      getOrphanData(row.id).then((data)=>{
        updateLocalStorage(row.id,data);
        this.setState({localOrphanIdList : localOrphanIdList});
      });
      
  }
  updateFilter(event) {
    let eventName = event.target.name;
    let eventValue = event.target.value;
    this.setState((prevState, props) => {
      prevState.filters[eventName] = eventValue;
      return { filters: prevState.filters };
    });
  }
  sortRows(event) {
    let sortFilter = event.target.id;
    let sortBy = this.state.currentSort === sortFilter
      ? this.state.sortBy
      : "asc";

    // temporary array holds objects with position and sort-value
    var mapped = this.state.rows.map(function(el, i) {
      let element = el[sortFilter];
      if (element) {
        if (typeof element === "string") {
          element = element.toLowerCase();
        }
      } else {
        element = "";
      }
      return { index: i, element: element };
    });

    // sorting the mapped array containing the reduced values
    mapped.sort((a, b) => {
      if (sortBy === "asc") {
        if (a.element < b.element) {
          return -1;
        }

        if (a.element > b.element) {
          return 1;
        }

        return 0;
      } else {
        if (a.element < b.element) {
          return 1;
        }

        if (a.element > b.element) {
          return -1;
        }

        return 0;
      }
    });

    // container for the resulting order
    var result = mapped.map(el => {
      return this.state.rows[el.index];
    });
    sortBy = "";

    if (event.target.id === this.state.currentSort) {
      sortBy = this.state.sortBy === "asc" ? "desc" : "asc";
    } else {
      sortBy = "desc";
    }

    this.setState({
      rows: result,
      currentSort: event.target.id,
      sortBy: sortBy
    });
  }
  getFilteredRows() {
    return this.state.rows.filter(this.filterRow).map(this.getRow);
  }
  filterRow(row) {
    for (let filter in this.state.filters) {
      if (this.state.filters.hasOwnProperty(filter)) {
        let filterValue = this.state.filters[filter].toLowerCase();
        if (filterValue !== "") {
          switch (filter) {
            case "id":
              if (row[filter].toString().indexOf(filterValue) === -1) {
                return false;
              }
              break;
            case "gender":
              if (row[filter] !== filterValue) {
                return false;
              }
              break;
            case "resettlement":
              if (
                row[filter] !== null &&
                row[filter].indexOf("yes") > -1 &&
                filterValue === "yes"
              ) {
                break;
              } else if (
                filterValue === "no" &&
                (row[filter] === null || row[filter].indexOf("yes") === -1)
              ) {
                break;
              } else {
                return false;
              }
            default:
              if (
                row[filter] === null ||
                row[filter].toLowerCase().indexOf(filterValue) === -1
              ) {
                return false;
              }
              break;
          }
        }
      }
    }
    return true;
  }
  getRow(row) {
    let resettlement = "No";
    if (row.resettlement && row.resettlement.indexOf("yes") > -1) {
      resettlement = "Yes";
    }
    if (this.state.readOnly) {
      return (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.last_name}</td>
          <td>{row.first_name}</td>
          <td>{row.date_of_birth}</td>
          <td>{row.gender}</td>
          <td>{row.orphanage_name}</td>
          <td>{resettlement}</td>
          <td>{row.special_needs}</td>
          <td>{row.created_at}</td>
          <td>
            <a
                className="ui positive button"
                href={"/reports/orphan/" + row.id}
              >
                View
              </a>
              
              
          </td>
        </tr>
      );
    } else {
      let secondButtonClass = "ui icon secondary button";
      secondButtonClass = this.state.localOrphanIdList.indexOf(row.id) > -1 ? secondButtonClass+" disabled":secondButtonClass;
      return (

        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.last_name}</td>
          <td>{row.first_name}</td>
          <td>{row.date_of_birth}</td>
          <td>{row.gender}</td>
          <td>{row.orphanage_name}</td>
          <td>{resettlement}</td>
          <td>{row.special_needs}</td>
          <td>{row.created_at}</td>
          <td>
            <div className="ui buttons">
            <a
                className="ui positive button"
                href={"/orphan/" + row.id + "/part1/basic-information"}
              >
                Edit
              </a>
              
              <div className="or" />
              <button className={secondButtonClass} onClick={()=>{this.saveToLocalStorage(row)}}><i className="download icon"></i></button>
            </div>
          </td>
        </tr>
      );
    }
  }
  toggleFilter() {
    this.setState((prevState, props) => {
      return { showFilters: !prevState.showFilters };
    });
  }
  isSpecialNeeds(row) {
    return (
      row.physical_disability === "yes" ||
      row.learning_disability === "yes" ||
      row.mental_disability === "yes" ||
      row.drug_alcohol_abuse === "yes"
    );
  }
  render() {
    let rows = this.getFilteredRows();
    let showFilterStyle = this.state.showFilters ? "table-row" : "none";
    if (this.state.loading) {
      return <div className="ui active centered loader" />;
    } else {
      return (
        <table
          className="ui celled table"
          style={{ width: "90%", margin: "auto", textAlign: "left" }}
        >
          <thead>
            <tr style={{ textAlign: "right" }}>
              <th colSpan="10">
                <Button color="red" onClick={this.toggleFilter}>
                  Filter
                </Button>
              </th>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <th
                id="id"
                style={{ width: "5%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                ID
                {this.state.currentSort === "id"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="last_name"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Last Name
                {this.state.currentSort === "last_name"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="first_name"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                First Name
                {this.state.currentSort === "first_name"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="date_of_birth"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Date of Birth
                {this.state.currentSort === "date_of_birth"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="gender"
                style={{ width: "5%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Gender
                {this.state.currentSort === "gender"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="name"
                style={{ width: "20%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Orphanage
                {this.state.currentSort === "orphanage_name"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="resettlement"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Resettled?
                {this.state.currentSort === "resettlement"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="special_needs"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Special Needs?
                {this.state.currentSort === "special_needs"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th
                id="created_at"
                style={{ width: "15%", cursor: "pointer" }}
                onClick={this.sortRows}
              >
                Created At
                {this.state.currentSort === "created_at"
                  ? <ArrowIcon direction={this.state.sortBy} />
                  : ""}
              </th>
              <th />
            </tr>
            <tr style={{ display: showFilterStyle }}>
              <td>
                <input
                  type="text"
                  name="id"
                  style={{ width: "110%" }}
                  value={this.state.filters.id}
                  onChange={this.updateFilter}
                />
              </td>
              <td style={{ width: "10%" }}>
                <input
                  type="text"
                  name="last_name"
                  value={this.state.filters.last_name}
                  onChange={this.updateFilter}
                />
              </td>
              <td style={{ width: "10%" }}>
                <input
                  type="text"
                  name="first_name"
                  value={this.state.filters.first_name}
                  onChange={this.updateFilter}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="date_of_birth"
                  value={this.state.filters.date_of_birth}
                  onChange={this.updateFilter}
                />
              </td>
              <td>
                <select
                  style={{ margin: 0 }}
                  name="gender"
                  onChange={this.updateFilter}
                >
                  <option value="">All</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={this.state.filters.name}
                  onChange={this.updateFilter}
                />
              </td>
              <td>
                <select
                  style={{ margin: 0 }}
                  name="resettlement"
                  onChange={this.updateFilter}
                >
                  <option value="">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
              <td>
                <select
                  style={{ margin: 0 }}
                  name="special_needs"
                  onChange={this.updateFilter}
                >
                  <option value="">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
              <td />
              <td />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
}

export default OrphanList;
