import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
	getOrphanList,
	getRemoteOrphanData,
	getOrphanages,
	addToOrphanIdList,
	clearOrphanList
} from "../api";
import { getLocalStorage, updateLocalStorage } from "../utils";

class OrphanList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			loading: true,
			localOrphanIdList: [],
			orphanages: [],
			downloadOrphanButtonClass: "disabled"
		};
		this.isSpecialNeeds = this.isSpecialNeeds.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		this.onListFiltered = this.onListFiltered.bind(this);
		this.downloadOrphans = this.downloadOrphans.bind(this);
		this.downloadOrphan = this.downloadOrphan.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.updateList = this.updateList.bind(this);
		this.filterCaseInsensitive = this.filterCaseInsensitive.bind(this);
	}
	filterCaseInsensitive(filter, row) {
		const id = filter.pivotId || filter.id;
		return row[id] !== null
			? String(row[id].toLowerCase()).startsWith(
					filter.value.toLowerCase()
				)
			: false;
	}
	updateList() {
		clearOrphanList();
		this.refreshList();
	}
	refreshList() {
		this.setState({ loading: true, orphanages: [] }, () => {
			getOrphanList().then(data => {
				let modifiedData = data["records"].map(row => {
					row.special_needs = this.isSpecialNeeds(row) ? "Yes" : "No";
					if (row.resettlement !== null) {
						if (row.resettlement.indexOf("yes") > -1) {
							row.resettlement = "Yes";
						} else {
							row.resettlement = "No";
						}
					}
					return row;
				});
				this.setState({
					rows: modifiedData,
					loading: false
				});
			});
		});
	}
	componentDidMount() {
		this.refreshList();
		getOrphanages().then(data => {
			this.setState({ orphanages: data });
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
	saveToLocalStorage(row, callback) {
		addToOrphanIdList(row.uuid);
		return getRemoteOrphanData(row.uuid).then(data => {
			updateLocalStorage(row.uuid, data);
			return Promise.resolve();
		});
	}
	downloadOrphan(row) {
		this.setState({ loading: true }, () => {
			this.saveToLocalStorage(row).then(() => {
				this.setState({ loading: false });
			});
		});
	}

	downloadOrphans() {
		let orphanList = this.orphanList.getResolvedState().sortedData;

		this.setState({ loading: true, downloadOrphanButtonClass: "" }, () => {
			orphanList.map(row => {
				this.saveToLocalStorage(row);
				return row;
			});
			this.setState({ loading: false });
		});
	}
	onListFiltered(column, value) {
		if (column.length > 0) {
			this.setState({ downloadOrphanButtonClass: "" });
		} else {
			this.setState({ downloadOrphanButtonClass: "disabled" });
		}
	}
	render() {
		const columns = [
			{
				Header: "Last Name",
				accessor: "last_name"
			},
			{
				Header: "First Name",
				accessor: "first_name" // String-based value accessors!
			},

			{
				accessor: "date_of_birth", // Required because our accessor is not a string
				Header: "Date of Birth"
			},
			{
				Header: "Gender",
				accessor: "gender",
				Filter: ({ filter, onChange }) => {
					return (
						<select
							onChange={event => onChange(event.target.value)}
							style={{ width: "100%" }}
							value={filter ? filter.value : ""}
						>
							<option value="">All</option>
							<option value="female">Female</option>
							<option value="male">Male</option>
						</select>
					);
				}
			},
			{
				Header: "Orphanage",
				accessor: "orphanage_name",
				Filter: ({ filter, onChange }) => {
					return (
						<select
							onChange={event => onChange(event.target.value)}
							style={{ width: "100%" }}
							value={filter ? filter.value : ""}
						>
							<option value="">All</option>
							{this.state.orphanages.map((element, index) => {
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
			},
			{
				Header: "Resettled?",
				accessor: "resettlement",
				Filter: ({ filter, onChange }) => {
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
			},
			{
				Header: "Special Needs?",
				accessor: "special_needs",
				Filter: ({ filter, onChange }) => {
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
			},
			{
				Header: "Created at",
				accessor: "created_at",
				filterable: false
			},
			{
				filterable: false,
				accessor: "uuid",
				Header: "",
				Cell: props => {
					let orphanIdList = getLocalStorage("orphan-id-list");
					let downloadButtonClass = "secondary";
					let editButtonClass = "positive";

					if (orphanIdList) {
						if (orphanIdList.indexOf(props.value) > -1) {
							downloadButtonClass = "disabled";
						} else {
							if (!window.navigator.onLine) {
								editButtonClass = "disabled";
							}
						}
					}
					return (
						<div className="ui buttons">
							<a
								className={"ui " + editButtonClass + " button"}
								href={
									"/orphan/" +
									props.row.uuid +
									"/basic-information"
								}
							>
								Edit
							</a>

							<div className="or" />
							<button
								className={
									"ui icon " + downloadButtonClass + " button"
								}
								onClick={() => {
									this.downloadOrphan(props.original);
								}}
							>
								<i className="download icon" />
							</button>
						</div>
					);
				}
			}
		];

		return (
			<div style={{ width: "100%" }}>
				<button
					style={{ marginBottom: 10 }}
					className="ui right floated red button"
					type="button"
					onClick={this.props.addChild}
				>
					Add New Child
				</button>
				<button
					style={{ marginBottom: 10 }}
					className={
						"ui right floated red button " +
						this.state.downloadOrphanButtonClass
					}
					type="button"
					onClick={this.downloadOrphans}
				>
					Download Filtered Children
				</button>
				<button
					style={{ marginBottom: 10 }}
					className="ui animated fade right floated red button"
					type="button"
					onClick={this.updateList}
				>
					<div
						className="hidden content"
						style={{ fontSize: ".8rem", top: "30%" }}
					>
						Refresh List
					</div>
					<div className="visible content">
						<i className="refresh icon" />
					</div>
				</button>
				<br />
				<ReactTable
					filterable={true}
					data={this.state.rows}
					columns={columns}
					style={{ width: "100%" }}
					loading={this.state.loading}
					defaultPageSize={10}
					defaultFilterMethod={this.filterCaseInsensitive}
					onFilteredChange={this.onListFiltered}
					ref={list => {
						this.orphanList = list;
					}}
					getTrProps={(state, rowInfo, column) => {
						if (rowInfo) {
							let localStorageData = getLocalStorage(
								rowInfo.original.uuid
							);

							if (
								localStorageData &&
								localStorageData.update !== null &&
								localStorageData.update === "optimistic"
							) {
								return {
									style: {
										background: "#E47272",
										color: "white"
									}
								};
							}
						}
						return {};
					}}
				/>
			</div>
		);
	}
}

export default OrphanList;
