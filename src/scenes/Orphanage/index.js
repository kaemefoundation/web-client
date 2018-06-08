import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
	getOrphanageList,
	getRegions,
	createOrphanage,
	newOrphanageObject
} from "./api";
//import query from 'query-string';

class OrphanageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orphanages: [],
			regions: [],
			loading: true,
			filtered: []
		};
		this.regionFilter = this.regionFilter.bind(this);
		this.typeFilter = this.typeFilter.bind(this);
		this.licensedFilter = this.licensedFilter.bind(this);
		this.addOrphanage = this.addOrphanage.bind(this);
	}
	componentDidMount() {
		this.refreshOrphanageList();
		getRegions().then(data => {
			this.setState({ regions: data });
		});
	}
	refreshOrphanageList() {
		getOrphanageList().then(data => {
			this.setState({ orphanages: data, loading: false });
		});
	}
	addOrphanage() {
		this.setState({ loading: true }, () => {
			createOrphanage(newOrphanageObject()).then(data => {
				window.location = "/orphanage/"+data.id;
				
			});
		});
	}
	regionFilter({ filter, onChange }) {
		return (
			<select
				onChange={event => onChange(event.target.value)}
				style={{ width: "100%" }}
				value={filter ? filter.value : ""}
			>
				<option value="">All</option>
				{this.state.regions.map((element, index) => {
					return (
						<option
							key={element.label + index}
							value={element.label}
						>
							{element.label}
						</option>
					);
				})}
			</select>
		);
	}
	typeFilter({ filter, onChange }) {
		return (
			<select
				onChange={event => onChange(event.target.value)}
				style={{ width: "100%" }}
				value={filter ? filter.value : ""}
			>
				<option value="">All</option>
				<option value="Private">Private</option>
				<option value="Government">Government</option>
				<option value="Religious">Religious</option>
			</select>
		);
	}
	licensedFilter({ filter, onChange }) {
		return (
			<select
				onChange={event => onChange(event.target.value)}
				style={{ width: "100%" }}
				value={filter ? filter.value : ""}
			>
				<option value="">All</option>
				<option value="Yes">Yes</option>
				<option value="No">No</option>
			</select>
		);
	}

	render() {
		const columns = [
			{
				Header: "ID",
				accessor: "id" // String-based value accessors!
			},
			{
				Header: "Name",
				accessor: "name" // String-based value accessors!
			},
			{
				Header: "Date Established",
				accessor: "date_established"
			},
			{
				Header: "Region",
				accessor: "region_name",
				Filter: this.regionFilter
			},
			{
				accessor: "type", // Required because our accessor is not a string
				Header: "Type",
				Filter: this.typeFilter
			},
			{
				Header: "Licensed by DSW",
				accessor: "licensed_by_dsw",
				Filter: this.licensedFilter
			},
			{
				accessor: "id",
				Header: "",
				Cell: props => (
					<a
						className="ui positive button"
						href={"/orphanage/" + props.value}
					>
						Edit
					</a>
				),
				filterable: false,
				sortable: false,
				maxWidth: 100
			}
		];

		return (
			<div style={{ width: "100%" }}>
				<button
					style={{ marginBottom: 10 }}
					className="ui red button"
					id="new-orphange"
					type="button"
					onClick={this.addOrphanage}
				>
					Add New Orphanage
				</button>
				<ReactTable
					filterable={true}
					data={this.state.orphanages}
					columns={columns}
					loading={this.state.loading}
				/>
			</div>
		);
	}
}

export default OrphanageList;
