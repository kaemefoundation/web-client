import React from "react";
import jsPDF from "jspdf";
import {
	reportedByOrphanageFather,
	reportedByOrphanageMother
} from "../../utils.js";
import "jspdf-autotable";

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pdf: {} };
		this.downloadPDF = this.downloadPDF.bind(this);
		this.addHeader = this.addHeader.bind(this);
	}
	addHeader(text, pdf, y) {
		pdf.setDrawColor(50, 70, 115);
		pdf.setFillColor(50, 70, 115);
		pdf.setFontSize(12);
		pdf.setTextColor(255, 255, 255);
		pdf.rect(0, y, 1000, 25, "FD");
		pdf.text(text, 15, y + 17);
	}
	compareRelationship(a, b) {
		let aRelationship = a.relationship_type.toLowerCase();
		let bRelationship = b.relationship_type.toLowerCase();
		if (aRelationship < bRelationship) {
			return -1;
		} else if (aRelationship > bRelationship) {
			return 1;
		} else {
			if (a.reported_by < b.reported_by) {
				return -1;
			} else if (a.reported_by > b.reported_by) {
				return 1;
			} else {
				return 0;
			}
		}
	}
	compareResidences(a, b) {
		if (a.reported_by < b.reported_by) {
			return -1;
		} else if (a.reported_by > b.reported_by) {
			return 1;
		} else {
			return 0;
		}
	}
	downloadPDF() {
		let { child } = this.props;
		let reportTitle =
			"REPORT FOR: " +
			this.props.child.first_name +
			" " +
			this.props.child.last_name;

		//let pdf = new jsPDF();
		let pdf = new jsPDF("p", "pt", "letter");

		pdf.setDrawColor(38, 103, 103);
		pdf.setFillColor(38, 103, 103);
		pdf.setFont("helvetica");
		pdf.setFontType("bold");
		pdf.rect(0, 10, 1000, 30, "FD");
		pdf.setTextColor(255, 255, 255);
		pdf.text(reportTitle, 10, 30);
		pdf.setFontType("normal");
		pdf.setFontSize(12);
		this.addHeader("BASIC INFORMATION", pdf, 55);

		let columns = ["name", "data"];
		let basicInformationRows = [
			[
				"Full Name: ",
				child.first_name +
					" " +
					child.middle_name +
					" " +
					child.last_name
			],
			["Date of Birth: ", child.date_of_birth],
			["Date of Birth Estimate: ", child.date_of_birth_estimate],
			["Gender: ", child.gender],
			["Last Assessed by DSW: ", child.last_assessed_by_dsw],
			["Never Assessed by DSW: ", child.never_assessed_by_dsw],
			["Orphanage: ", child.residences[0]["name"]],
			["Date of Entry into Orphanage: ", child.orphanage_entry_date],
			[
				"Estimated Date of Entry into Orphanage:",
				child.orphanage_entry_date_estimate
			],
			["Who was the child referred by?", child.referred_by],
			["Referred by relationship:", child.referred_by_relationship],
			["Admission Reason: ", child.orphanage_admission_reason],
			["Is there further information?", child.orphanage_reason_more],
			["Is there official documentation?", child.official_documentation],
			[
				"Official Documentation Description:",
				child.official_documentation_description
			]
		];
		pdf.autoTable(columns, basicInformationRows, {
			showHeader: "never",
			margin: { top: 85 }
		});
		this.addHeader(
			"IDENTIFICATION INFORMATION",
			pdf,
			pdf.autoTable.previous.finalY + 15
		);
		let identification = [
			[
				"Does the child have an ID card, NHI, passport or other identification on file?",
				child.official_id
			],
			["Birth Certificate?", child.birth_certificate]
		];
		pdf.autoTable(columns, identification, {
			showHeader: "never",
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});
		pdf.addPage();
		this.addHeader("FAMILY", pdf, 5);

		let familyColumns = [
			"Name",
			"Relationship",
			"Vital Status",
			"Occupation",
			"Address",
			"Reported By"
		];
		child.relationships.sort(this.compareRelationship);
		let familyRows = child.relationships.map(element => {
			return [
				element.name,
				element.relationship_type,
				element.vital_status,
				element.occupation,
				element.address,
				element.reported_by
			];
		});
		pdf.autoTable(familyColumns, familyRows, { pageBreak: "avoid" });
		this.addHeader("RESIDENCES", pdf, pdf.autoTable.previous.finalY + 15);
		let residenceColumns = [
			"Name",
			"Residence Type",
			"Entry Date",
			"Exit Date",
			"Exit Reason",
			"Resettlement Attempt?"
		];
		child.residences.sort(this.compareResidences);
		let residenceRows = child.residences.map(element => {
			return [
				element.residence_name,
				element.type,
				element.entry_date,
				element.exit_date,
				element.exit_reason,
				element.resettlement_attempt
			];
		});
		pdf.autoTable(residenceColumns, residenceRows, {
			styles: { overflow: "linebreak", columnWidth: 89 },
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});
		pdf.addPage();
		this.addHeader("ACADEMIC", pdf, 5);
		let academic = [
			["School Name: ", child.school_name],
			["School Grade: ", child.school_grade],
			["School Performance: ", child.school_performance]
		];
		pdf.autoTable(columns, academic, { showHeader: "never" });
		this.addHeader("MEDICAL", pdf, pdf.autoTable.previous.finalY + 15);
		let medical = [
			["Last Known Health Status of Birth Mother: ", child.school_name],
			["Last Known Health Status of Birth Father: ", child.school_grade],
			["Thorough Medical Evaluation? ", child.medical_evaluation],
			["Date of Last Evaluation? ", child.medical_evaluation_last_date],
			["Health Status of Child: ", child.current_health_status],
			["Physical Disability: ", child.physical_disability],
			["Learning Disability: ", child.learning_disability],
			["Mental Disability: ", child.mental_disability],
			["Drug/Alcohol Abuse: ", child.drug_alcohol_abuse],
			["Specific Ailments: ", child.specific_ailments]
		];
		pdf.autoTable(columns, medical, {
			showHeader: "never",
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});
		this.addHeader(
			"SOCIAL BEHAVIOR",
			pdf,
			pdf.autoTable.previous.finalY + 15
		);
		let socialBehavior = [
			[
				"How does the child relate to his/her peers?: ",
				child.relate_to_peers
			],
			[
				"Trouble with authority/with adult oversight?",
				child.trouble_with_authority
			],
			["Talents or skills?", child.talents_and_skills],
			[
				"What activities or topics is the child most interested in?",
				child.interests
			],
			[
				"What is the child’s religious preference?",
				child.religious_preference
			]
		];
		pdf.autoTable(columns, socialBehavior, {
			showHeader: "never",
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});
		this.addHeader("EMOTIONAL", pdf, pdf.autoTable.previous.finalY + 15);
		let emotionalBehaviour = [
			[
				"Intensive in or out-patient care for psychiatric issues?",
				child.psychiatric_care
			],
			["Abuse History", child.abuse_history]
		];
		pdf.autoTable(columns, emotionalBehaviour, {
			showHeader: "never",
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});

		this.addHeader(
			"NOTES/SOCIAL WORKER OBSERVATIONS",
			pdf,
			pdf.autoTable.previous.finalY + 15
		);
		let notes = [
			["General condition of the child’s file", child.condition_of_files],
			["Additional Notes", child.additional_information]
		];
		pdf.autoTable(columns, notes, {
			showHeader: "never",
			styles: { overflow: "linebreak" },
			margin: { top: pdf.autoTable.previous.finalY + 45 }
		});
		pdf.addPage();
		this.addHeader("CARE PLAN", pdf, 5);
		let careplan = [
			["Date of Child Care Conference:", child.ccc_date],
			["Attendees:", child.attendees],
			["DSW Caseworker Name:", child.ccc_dsw_caseworker_name],
			["DSW Caseworker Phone:", child.ccc_dsw_caseworker_email],
			["DSW Caseworker Email:", child.ccc_dsw_caseworker_phone],
			["Kaeme Caseworker Name:", child.ccc_kaeme_caseworker_name],
			["Kaeme Caseworker Phone:", child.ccc_kaeme_caseworker_email],
			["Kaeme Caseworker Email:", child.ccc_kaeme_caseworker_phone],
			["Care Plan:", child.ccc_care_plan],
			[
				"Contact Info for Resettlement/Foster Care:",
				child.ccc_care_plan_with_whom
			],
			[
				"Care Plan Implementation Timeline:",
				child.ccc_care_plan_implemented_when
			],
			["Care Plan Notes:", child.ccc_notes],
			["Next Follow Up Date:", child.followup_date],
			["Follow Up Notes::", child.followup_notes]
		];
		pdf.autoTable(columns, careplan, {
			showHeader: "never",
			styles: { overflow: "linebreak" }
		});
		pdf.addPage();
		this.addHeader("FOLLOW UPS", pdf, 5);
		
		for(let i=0;i<child.follow_ups.length;i++){
			let element = child.follow_ups[i];
			console.log(element);
			let followUpColumns = [
				"Follow Up Date: " + element.date_of_contact,
				""
			];
			let rows = [
				["Child's Location:", element.child_location],
				["Child's Guardian:", element.child_guardian],
				["Child's Relationship (to guardian):", element.child_relationship_to_guardian],
				["Guardian Contact Info:", element.guardian_contact_info],
				["Guardian Occupation:", element.guardian_occupation],
				["Contact Method:", element.contact_method],
				["Person Contacted:", element.person_contacted],
				["Person Contacted Description:", element.person_contacted_description],
				["Notes:", element.notes]

			];
			let margin = i === 0 ? 45 : pdf.autoTable.previous.finalY + 45;
			pdf.autoTable(followUpColumns, rows, {
			styles: { overflow: "linebreak" },
			margin: { top: margin }
			});

		}
	
		let data = pdf.output("datauristring");

		this.iframe.src = data;
	}
	render() {
		return (
			<div style={{ height: "100%" }}>
				<button
					style={{ margin: "auto" }}
					className="ui red button"
					type="button"
					onClick={this.downloadPDF}
				>
					Download Report
				</button>

				<iframe
					title={
						"PDF Report for " +
							this.props.child.first_name +
							" " +
							this.props.child.last_name
					}
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

export default Report;
