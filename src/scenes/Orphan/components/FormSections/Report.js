import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pdf: {} };
		this.downloadPDF = this.downloadPDF.bind(this);
		this.addHeader = this.addHeader.bind(this);
		this.clearNulls = this.clearNulls.bind(this);
		this.clearNull = this.clearNull.bind(this);
	}
	addHeader(text, pdf, y) {
		pdf.setDrawColor(50, 70, 115);
		pdf.setFillColor(50, 70, 115);
		pdf.setFontSize(12);
		pdf.setTextColor(255, 255, 255);
		pdf.rect(0, y, 1000, 25, "FD");
		pdf.text(text, 15, y + 17);
	}
	createTable(pdf,title, headers, rows,showHeader = true,extraConfig={}) {
		
		let yPosition = pdf.autoTable.previous.finalY
			? pdf.autoTable.previous.finalY
			: 20;
		let config = {
			startY: yPosition + 45,
			styles: { overflow: "linebreak" }
		};
		for(let key in extraConfig){
			config[key] = extraConfig[key];
		}
		if(!showHeader){
			config["showHeader"] = "never";
		}
		if(title !== ''){
			this.addHeader(title, pdf, yPosition + 15);
		}	
		pdf.autoTable(headers, rows, config);
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
	clearNull(data){
		if(data === null){
			return '';
		}else{
			return data;
		}
	}
	clearNulls(arrayOfData){
		arrayOfData.forEach(element=>{
			element[1] = this.clearNull(element[1]);
			return element;
		});
		return arrayOfData;
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
		pdf.rect(0, 0, 1000, 30, "FD");
		pdf.setTextColor(255, 255, 255);
		pdf.text(reportTitle, 10, 20);
		pdf.setFontType("normal");
		pdf.setFontSize(12);
		jsPDF.API.autoTable.previous = false;
		let columns = ["name", "data"];
		let basicInformationRows = this.clearNulls([
			[
				"Full Name: ",
				this.clearNull(child.first_name) +
					" " +
				this.clearNull(child.middle_name) +
					" " +
				this.clearNull(child.last_name)
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
		]);
		this.createTable(pdf,"BASIC INFORMATION",columns,basicInformationRows,false);
		
		let identification = this.clearNulls([
			[
				"Does the child have an ID card, NHI, passport or other identification on file?",
				child.official_id
			],
			["Birth Certificate?", child.birth_certificate]
		]);
		this.createTable(pdf,"IDENTIFICATION",columns,identification,false);
		
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
				this.clearNull(element.name),
				this.clearNull(element.relationship_type),
				this.clearNull(element.vital_status),
				this.clearNull(element.occupation),
				this.clearNull(element.address),
				this.clearNull(element.reported_by)
			];
		});
		this.createTable(pdf,"FAMILY",familyColumns,familyRows,true);
	
		
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
				this.clearNull(element.residence_name),
				this.clearNull(element.type),
				this.clearNull(element.entry_date),
				this.clearNull(element.exit_date),
				this.clearNull(element.exit_reason),
				this.clearNull(element.resettlement_attempt)
			];
		});
		jsPDF.API.autoTable.previous = false;
		pdf.addPage();
		this.createTable(pdf,"RESIDENCES",residenceColumns,residenceRows,true);
	
		let academic = this.clearNulls([
			["School Name: ", child.school_name],
			["School Grade: ", child.school_grade],
			["School Performance: ", child.school_performance]
		]);
		this.createTable(pdf,"ACADEMIC",columns,academic,false);
	
		let medical = this.clearNulls([
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
		]);
		this.createTable(pdf,"MEDICAL",columns,medical,false);
	
		let socialBehavior = this.clearNulls([
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
		]);
		this.createTable(pdf,"SOCIAL BEHAVIOR",columns,socialBehavior,false);
	
		let emotionalBehaviour = this.clearNulls([
			[
				"Intensive in or out-patient care for psychiatric issues?",
				child.psychiatric_care
			],
			["Abuse History", child.abuse_history]
		]);
		this.createTable(pdf,"EMOTIONAL",columns,emotionalBehaviour,false);
		
		let notes = this.clearNulls([
			["General condition of the child’s file", child.condition_of_files],
			["Additional Notes", child.additional_information]
		]);
		this.createTable(pdf,"NOTES/SOCIAL WORKER OBSERVATIONS",columns,notes,false);
	
		jsPDF.API.autoTable.previous = false;
		pdf.addPage();
		let careplan = this.clearNulls([
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
			["Follow Up Notes:", child.followup_notes]
		]);
		this.createTable(pdf,"CARE PLAN",columns,careplan,false,{columnStyles: {
    0: {columnWidth: 100}
    // etc
}});
	
		jsPDF.API.autoTable.previous = false;
		pdf.addPage();
		this.addHeader("FOLLOW UPS", pdf, 5);
		
		for(let i=0;i<child.follow_ups.length;i++){
			let element = child.follow_ups[i];
			let followUpColumns = [
				"Follow Up Date: " + element.date_of_contact,
				""
			];
			let rows = this.clearNulls([
				["Child's Location:", element.child_location],
				["Child's Guardian:", element.child_guardian],
				["Child's Relationship (to guardian):", element.child_relationship_to_guardian],
				["Guardian Contact Info:", element.guardian_contact_info],
				["Guardian Occupation:", element.guardian_occupation],
				["Contact Method:", element.contact_method],
				["Person Contacted:", element.person_contacted],
				["Person Contacted Description:", element.person_contacted_description],
				["Notes:", element.notes]

			]);
			this.createTable(pdf,'',followUpColumns,rows,true,{pageBreak:'avoid',columnStyles: {
    0: {columnWidth: 150}
    // etc
}});

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
