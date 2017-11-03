import { get } from "../../utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
// es6 using destructuring
const capitalize = string => {
	let stringArray = string.split(" ");
	let uppercasedArray = stringArray.map(([first, ...rest]) => {
		return first.toUpperCase() + rest.join("").toLowerCase();
	});
	return uppercasedArray.join(" ");
};
const HTTP_ENDPOINT =
	"https://wa7yyefngc.execute-api.eu-central-1.amazonaws.com/development/";

export function getReportData(startDate, endDate) {
	return get(
		HTTP_ENDPOINT +
			"reunification/?start_date=" +
			startDate +
			"&end_date=" +
			endDate
	);
}

export class Report {
	constructor(data, startDate, endDate) {
		this.data = data;
		this.startDate = startDate;
		this.endDate = endDate;
		this.pdf = {};
	}
	setUpPDF() {
		this.pdf = new jsPDF("p", "pt", "letter");

		this.pdf.setDrawColor(124, 36, 36);
		this.pdf.setFillColor(124, 36, 36);
		this.pdf.setFont("helvetica");
		this.pdf.setFontType("bold");
		this.pdf.rect(0, 10, 1000, 30, "FD");
		this.pdf.setTextColor(255, 255, 255);
		this.pdf.text("KAEME ORPHAN REPORT", 10, 30);

		this.pdf.setFontSize(12);
		this.pdf.setTextColor(14, 96, 96);
		let startDate = moment(this.startDate).format("MMM Do, YYYY");
		let endDate = moment(this.endDate).format("MMM Do, YYYY");
		this.pdf.text(startDate + " to " + endDate, 10, 60);
		this.pdf.setFontType("normal");
		jsPDF.API.autoTable.previous = false;
	}
	getPDF() {
		return this.pdf.output("datauristring");
	}
	abuse() {
		let abuse = {
			"Physical Abuse": 0,
			"Mental Abuse": 0,
			"Sexual Abuse": 0
		};
		this.data.orphans.forEach(element => {
			let { abuse_physical, abuse_mental, abuse_sexual } = element;
			if (
				abuse_physical !== "no" &&
				abuse_physical !== null &&
				abuse_physical !== "No" &&
				abuse_physical !== "Unknown" &&
				abuse_physical !== "unknown"
			) {
				abuse["Physical Abuse"]++;
			}
			if (
				abuse_mental !== "no" &&
				abuse_mental !== null &&
				abuse_mental !== "No" &&
				abuse_mental !== "Unknown" &&
				abuse_mental !== "unknown"
			) {
				abuse["Mental Abuse"]++;
			}
			if (
				abuse_sexual !== "no" &&
				abuse_sexual !== null &&
				abuse_sexual !== "No" &&
				abuse_sexual !== "Unknown" &&
				abuse_sexual !== "unknown"
			) {
				abuse["Sexual Abuse"]++;
			}
		});
		this.createTable(
			"Abuse",
			["Type", ""],
			this.createArrayFromObject(abuse)
		);
	}

	ages() {
		let ages = {};
		this.data.orphans.forEach(element => {
			let { date_of_birth, date_of_birth_estimate } = element;
			let age = this.dateDifferenceInYears(
				date_of_birth,
				date_of_birth_estimate
			);
			if (!ages[age]) {
				ages[age] = 1;
			} else {
				ages[age]++;
			}
		});
		let result = Object.keys(ages).map(key => {
			return [key, ages[key]];
		});
		this.createTable("Ages", ["Ages (in years)", "# of Orphans"], result);
	}

	gender() {
		let gender = { female: 0, male: 0 };
		this.data.orphans.forEach(element => {
			gender[element.gender]++;
		});
		this.createTable(
			"Gender",
			["Gender", "# of Orphans"],
			this.createArrayFromObject(gender)
		);
	}

	living_parents() {
		let parent_status = {
			"Mother Alive": 0,
			"Father Alive": 0,
			"Both Parents Alive": 0
		};
		let orphan_dict = {};
		this.data.relationships.forEach(element => {
			if (!orphan_dict[element.orphan_id]) {
				orphan_dict[element.orphan_id] = {};
			}
			orphan_dict[element.orphan_id][element.relationship_type] =
				element.vital_status;
		});
		for (let orphan in orphan_dict) {
			if (
				orphan_dict[orphan].mother === "alive" &&
				orphan_dict[orphan].father === "alive"
			) {
				parent_status["Both Parents Alive"]++;
			} else {
				if (orphan_dict[orphan].mother === "alive") {
					parent_status["Mother Alive"]++;
				}
				if (orphan_dict[orphan].father === "alive") {
					parent_status["Father Alive"]++;
				}
			}
		}
		this.createTable(
			"Orphans with Living Parents",
			["Vital Status", ""],
			this.createArrayFromObject(parent_status)
		);
	}
	orphanages() {
		let orphanages = {};
		this.data.residences.forEach(element => {
			let { orphanage_name, region_name } = element;
			if (orphanages[orphanage_name]) {
				orphanages[orphanage_name]["orphan_count"]++;
			} else {
				orphanages[orphanage_name] = {
					region: region_name,
					orphan_count: 1
				};
			}
		});
		let results = Object.keys(orphanages).map(key => {
			return [key, orphanages[key].region, orphanages[key].orphan_count];
		});
		this.createTable(
			"Orphanages",
			["Orphanages", "Region", "# of Orphans"],
			results
		);
	}
	residenceInfo() {
		let length_of_stay = {};
		let admission_reasons = {
			"Checkbox not selected, but detailed reason available": 0,
			Unknown: 0
		};
		//let resettlement_count = 0;
		this.data.residences.forEach(element => {
			let { admission_reason, admission_reason_checkbox } = element;
			let years = this.dateDifferenceInYears(
				element.entry_date,
				element.entry_date_estimate
			);

			if (!length_of_stay[years]) {
				length_of_stay[years] = 0;
			}
			length_of_stay[years]++;

			if (admission_reason_checkbox) {
				if (!admission_reasons[admission_reason_checkbox]) {
					admission_reasons[admission_reason_checkbox] = 0;
				}
				admission_reasons[admission_reason_checkbox]++;
			} else if (admission_reason !== "") {
				admission_reasons[
					"Checkbox not selected, but detailed reason available"
				]++;
			} else {
				admission_reasons["Unknown"]++;
			}
		});
		this.createTable(
			"Length of Stay",
			["Years", "# of Orphans"],
			this.createArrayFromObject(length_of_stay)
		);
		this.createTable(
			"Admission Reason",
			["Reason for Admission", "# of Orphans"],
			this.createArrayFromObject(admission_reasons)
		);
	}
	specialNeeds() {
		let special_needs = {
			"Physical Disability": 0,
			"Mental Disability": 0,
			"Learning Disability": 0
		};
		this.data.orphans.forEach(element => {
			let {
				physical_disability,
				learning_disability,
				mental_disability
			} = element;
			if (
				physical_disability !== "no" &&
				physical_disability !== null &&
				physical_disability !== "No" &&
				physical_disability !== "Unknown" &&
				physical_disability !== "unknown"
			) {
				special_needs["Physical Disability"]++;
			}
			if (
				learning_disability !== "no" &&
				learning_disability !== null &&
				learning_disability !== "No" &&
				learning_disability !== "Unknown" &&
				learning_disability !== "unknown"
			) {
				special_needs["Learning Disability"]++;
			}
			if (
				mental_disability !== "no" &&
				mental_disability !== null &&
				mental_disability !== "No" &&
				mental_disability !== "Unknown" &&
				mental_disability !== "unknown"
			) {
				special_needs["Mental Disability"]++;
			}
		});

		this.createTable(
			"Special Needs",
			["Type", ""],
			this.createArrayFromObject(special_needs)
		);
	}
	dateDifferenceInYears(actualDate, estimatedDate) {
		if (
			actualDate &&
			actualDate !== "" &&
			actualDate !== "0000-00-00 00:00:00" &&
			actualDate !== "0000-00-00"
		) {
			return moment().get("year") - moment(actualDate).get("year");
		} else if (estimatedDate && estimatedDate !== "") {
			return moment().get("year") - estimatedDate;
		} else {
			return "Unknown";
		}
	}
	createArrayFromObject(object) {
		return Object.keys(object).map(key => {
			return [key, object[key]];
		});
	}
	addHeader(text, y) {
		this.pdf.setDrawColor(52, 100, 100);
		this.pdf.setFillColor(52, 100, 100);
		this.pdf.setFontSize(12);
		this.pdf.setTextColor(255, 255, 255);
		this.pdf.rect(0, y, 1000, 25, "FD");
		this.pdf.text(text, 15, y + 17);
	}
	createTable(title, headers, rows) {
		let yPosition = this.pdf.autoTable.previous.finalY
			? this.pdf.autoTable.previous.finalY
			: 60;
		this.addHeader(title, yPosition + 15);
		this.pdf.autoTable(headers, rows, {
			startY: yPosition + 45,
			styles: { overflow: "linebreak" }
		});
	}
}

export class OrphanReport extends Report {
	constructor(data, startDate, endDate) {
		super(data, startDate, endDate);
		this.setUpPDF();
	}
	createPDF() {
		this.orphanages();
		this.ages();
		this.gender();
		this.residenceInfo();
		this.living_parents();
		this.abuse();
	}
}
export class VitalReport extends Report {
	constructor(data, startDate, endDate, age) {
		super(data, startDate, endDate);
		this.setUpPDF();
		this.age = age;
	}
	createPDF() {
		let orphan_dict = {};
		this.data.relationships.forEach(element => {
			if (element.vital_status === "alive") {
				orphan_dict[element.orphan_id] = {};
			}
		});

		this.data.orphans.forEach(element => {
			if (orphan_dict[element.id]) {
				let {
					id,
					first_name,
					last_name,
					date_of_birth,
					date_of_birth_estimate,
					physical_disability,
					mental_disability,
					learning_disability
				} = element;
				let sub_orphan = {
					physical_disability,
					mental_disability,
					learning_disability
				};
				sub_orphan["name"] = first_name + " " + last_name;
				sub_orphan["age"] = this.dateDifferenceInYears(
					date_of_birth,
					date_of_birth_estimate
				);
				if (!this.age) {
					orphan_dict[id] = sub_orphan;
				} else {
					if (sub_orphan["age"] > this.age) {
						delete orphan_dict[id];
					} else {
						orphan_dict[id] = sub_orphan;
					}
				}
			}
		});
		this.data.residences.forEach(element => {
			let yearsInOrphanage = this.dateDifferenceInYears(
				element.entry_date,
				element.entry_date_estimate
			);
			let { orphan_id, admission_reason_checkbox } = element;
			if (orphan_dict[orphan_id]) {
				orphan_dict[orphan_id]["years_in_orphanage"] = yearsInOrphanage;
				orphan_dict[orphan_id][
					"admission_reason"
				] = admission_reason_checkbox;
			}
		});
		let orphansArray = [];
		for (let key in orphan_dict) {
			let orphan = orphan_dict[key];
			orphansArray.push([
				orphan["name"],
				orphan["age"],
				orphan["years_in_orphanage"],
				orphan["admission_reason"],
				orphan["physical_disability"],
				orphan["learning_disability"],
				orphan["mental_disability"]
			]);
		}
		orphansArray.sort((a, b) => {
			if (a[1] === "Unknown" && b[1] !== "Unknown") {
				return 1;
			}
			if (b[1] === "Unknown" && b[1] !== "Unknown") {
				return 1;
			}
			return a[1] - b[1];
		});
		this.createTable(
			"Orphans with Living Parents",
			[
				"Name",
				"Age (in years)",
				"Length of Stay (in years)",
				"Admission Reason",
				"Physical Disability",
				"Learning Disability",
				"Mental Disability"
			],
			orphansArray
		);
	}
}
export class ExtendedTimeReport extends Report {
	constructor(data, startDate, endDate, yearsInOrphanage) {
		super(data, startDate, endDate);
		this.setUpPDF();
		this.yearsInOrphanage = yearsInOrphanage;
	}
	createPDF() {
		let orphan_dict = {};

		this.data.orphans.forEach(element => {
			let {
				id,
				first_name,
				last_name,
				date_of_birth,
				date_of_birth_estimate,
				physical_disability,
				mental_disability,
				learning_disability
			} = element;
			let sub_orphan = {
				physical_disability,
				mental_disability,
				learning_disability
			};
			sub_orphan["name"] = first_name + " " + last_name;
			sub_orphan["age"] = this.dateDifferenceInYears(
				date_of_birth,
				date_of_birth_estimate
			);
			if (!this.age) {
				orphan_dict[id] = sub_orphan;
			} else {
				if (sub_orphan["age"] > this.age) {
					delete orphan_dict[id];
				} else {
					orphan_dict[id] = sub_orphan;
				}
			}
		});
		this.data.residences.forEach(element => {
			let yearsInOrphanage = this.dateDifferenceInYears(
				element.entry_date,
				element.entry_date_estimate
			);
			let { orphan_id, admission_reason_checkbox } = element;
			if (
				orphan_dict[orphan_id] &&
				yearsInOrphanage >= this.yearsInOrphanage
			) {
				orphan_dict[orphan_id]["years_in_orphanage"] = yearsInOrphanage;
				orphan_dict[orphan_id][
					"admission_reason"
				] = admission_reason_checkbox;
			} else {
				delete orphan_dict[orphan_id];
			}
		});
		let orphansArray = [];
		for (let key in orphan_dict) {
			let orphan = orphan_dict[key];
			orphansArray.push([
				orphan["name"],
				orphan["age"],
				orphan["years_in_orphanage"],
				orphan["admission_reason"],
				orphan["physical_disability"],
				orphan["learning_disability"],
				orphan["mental_disability"]
			]);
		}
		orphansArray.sort((a, b) => {
			if (a[2] === "Unknown" && b[2] !== "Unknown") {
				return 1;
			}
			if (b[2] === "Unknown" && b[2] !== "Unknown") {
				return 1;
			}
			return a[2] - b[2];
		});
		this.createTable(
			"Orphans Living in an Orphanage for more than " +
				this.yearsInOrphanage +
				" years",
			[
				"Name",
				"Age (in years)",
				"Length of Stay (in years)",
				"Admission Reason",
				"Physical Disability",
				"Learning Disability",
				"Mental Disability"
			],
			orphansArray
		);
	}
}
