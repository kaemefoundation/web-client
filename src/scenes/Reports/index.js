import React, { Component } from "react";
import {
	getReportData,
	OrphanReport,
	VitalReport,
	ExtendedTimeReport
} from "./api";
import DatePicker from "react-datepicker";
class Reports extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start_date: "",
			end_date: "",
			report_type: "",
			age: -1,
			years_in_orphanage: "",
			error: false
		};
		this.generatePDF = this.generatePDF.bind(this);
		this.getYears = this.getYears.bind(this);
		this.setDropdown = this.setDropdown.bind(this);
	}
	generatePDF() {
		getReportData(
			this.state.start_date.format("YYYY-MM-DD"),
			this.state.end_date.format("YYYY-MM-DD")
		)
			.then(data => {
				let report = {};
				switch (this.state.report_type) {
					case "general":
						report = new OrphanReport(
							data,
							this.state.start_date,
							this.state.end_date
						);
						break;
					case "vital":
						report = new VitalReport(
							data,
							this.state.start_date,
							this.state.end_date,
							false
						);
						break;
					case "living_parents":
						report = new VitalReport(
							data,
							this.state.start_date,
							this.state.end_date,
							this.state.age
						);
						break;
					case "extended_time":
						report = new ExtendedTimeReport(
							data,
							this.state.start_date,
							this.state.end_date,
							this.state.years_in_orphanage
						);
						break;
					default:
						break;
				}
				report.createPDF();
				this.iframe.src = report.getPDF();
				this.setState({ error: false });
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}
	getYears() {
		let years = [];
		for (let i = 1; i <= 18; i++) {
			years.push(<option value={i}>{i}</option>);
		}
		return years;
	}
	setDate(date, field) {
		this.setState((state, props) => {
			state[field] = date;
			return state;
		});
	}
	setDropdown(event) {
		let id = event.target.id;
		let value = event.target.value;
		this.setState((state, props) => {
			state[id] = value;
			return state;
		});
	}
	render() {
		let buttonClass =
			this.state.start_date !== "" &&
			this.state.end_date !== "" &&
			this.state.report_type !== ""
				? ""
				: "disabled";
		return (
			<div style={{ height: "100%" }}>
				<h1 className="ui center aligned  header">Reports</h1>
				<div className="ui equal width form column">
					<div className="fields">
						<div className="field">
							<label>Start Date:</label>
							<DatePicker
								dateFormat="YYYY-MM-DD"
								showMonthDropdown
								showYearDropdown
								selected={this.state.start_date}
								onChange={date => {
									this.setDate(date, "start_date");
								}}
							/>
						</div>
						<div className="field">
							<label>End Date:</label>
							<DatePicker
								dateFormat="YYYY-MM-DD"
								showMonthDropdown
								showYearDropdown
								selected={this.state.end_date}
								onChange={date => {
									this.setDate(date, "end_date");
								}}
							/>
						</div>
						<div className="field">
							<label>Report Type:</label>
							<select
								id="report_type"
								className="ui search dropdown"
								onChange={this.setDropdown}
								value={this.state.report_type}
							>
								<option value="">Select Report</option>
								<option value="general">
									General Orphan Report
								</option>
								<option value="vital">Vital Report</option>
								<option value="living_parents">
									Children with Living Parents
								</option>
								<option value="extended_time">
									Children in an orphanage for extended time
								</option>
							</select>
						</div>
						{this.state.report_type === "living_parents" && (
							<div className="field">
								<label>Age:</label>
								<select
									id="age"
									className="ui search dropdown"
									onChange={this.setDropdown}
									value={this.state.age}
								>
									<option value="">Select Age</option>
									{this.getYears()}
								</select>{" "}
								<div
									style={{ marginTop: 3 }}
									className="ui blue image label"
								>
									years and younger
								</div>
							</div>
						)}
						{this.state.report_type === "extended_time" && (
							<div className="field">
								<label>Years in Orphanage:</label>
								<select
									id="years_in_orphanage"
									className="ui search dropdown"
									onChange={this.setDropdown}
									value={this.state.years_in_orphanage}
								>
									<option value="">Select Years</option>
									{this.getYears()}
								</select>{" "}
								<div
									style={{ marginTop: 3 }}
									className="ui blue image label"
								>
									years or more
								</div>
							</div>
						)}
					</div>
					<div className="fields">
						<div className="field">
							<button
								type="button"
								className={
									"ui right floated red button " + buttonClass
								}
								onClick={this.generatePDF}
							>
								Generate
							</button>
						</div>
					</div>
				</div>
				{this.state.error && (
					<div className="ui negative message floating">
						<h3 className="ui center aligned header ">
							An error occured retrieving data for the report
						</h3>
					</div>
				)}
				<iframe
					title="PDF Report"
					ref={input => {
						this.iframe = input;
					}}
					width="100%"
					height="100%"
					src=""
				/>
			</div>
		);
	}
}

export default Reports;
