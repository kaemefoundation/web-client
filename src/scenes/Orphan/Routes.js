import BasicInformation from "./components/FormSections/BasicInformation";
import IdentificationInformation from "./components/FormSections/IdentificationInformation";
import FamilyPart1 from "./components/FormSections/FamilyPart1";
import Residence from "./components/FormSections/Residence";
import AcademicHistory from "./components/FormSections/AcademicHistory";
import MedicalInformation from "./components/FormSections/MedicalInformation";
import SocialBehavior from "./components/FormSections/SocialBehavior";
import Emotional from "./components/FormSections/Emotional";
import Notes from "./components/FormSections/Notes";
import SocialBehaviorPart2 from "./components/FormSections/SocialBehaviorPart2";
import FamilyPart2 from "./components/FormSections/FamilyPart2";
import ResidencePart2 from "./components/FormSections/ResidencePart2";
import Notes2 from "./components/FormSections/Notes2";
import ChildDesignation from "./components/FormSections/ChildDesignation";
import ChildCareConference from "./components/FormSections/ChildCareConference";
import Followups from "./components/FormSections/Followups";


export const navPart1 = [
  {
    path: "basic-information",
    component: BasicInformation,
    navName: "Basic Information"
  },
  {
    path: "identification-information",
    component: IdentificationInformation,
    navName: "Identification Information"
  },
  { path: "family", component: FamilyPart1, navName: "Family" },
  { path: "residence", component: Residence, navName: "Residence History" },
  { path: "academic", component: AcademicHistory, navName: "Academic History" },
  {
    path: "medical-info",
    component: MedicalInformation,
    navName: "Medical Information"
  },
  {
    path: "social-behavior",
    component: SocialBehavior,
    navName: "Social/Behavioral Development"
  },
  { path: "emotional", component: Emotional, navName: "Emotional Functioning" },
  {
    path: "notes",
    component: Notes,
    navName: "Notes/Social Worker Observations"
  }
];
export const navPart2 = [
  {
    path: "social-behavior",
    component: SocialBehaviorPart2,
    navName: "Social/Behavioral Development"
  },
  { path: "family", component: FamilyPart2, navName: "Family" },
  {
    path: "residence",
    component: ResidencePart2,
    navName: "Residence (current & prior)"
  },
  {
    path: "notes",
    component: Notes2,
    navName: "Notes/Social Worker Observations"
  }
];
export const navPart3 = [
  {
    path: "child-designation",
    component: ChildDesignation,
    navName: "Child Designation"
  },
  {
    path: "child-care-conference",
    component: ChildCareConference,
    navName: "Child Care Conference"
  }
];
export const navPart4 = [
  { path: "followups", component: Followups, navName: "Follow Ups" }
];