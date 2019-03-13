import BasicInformation from "./components-v2/FormSections/BasicInformation";
import Family from "./components-v2/FormSections/Family";
import Medical from "./components-v2/FormSections/Medical";
import PostProfile from "./components-v2/FormSections/PostProfile";
import Followups from "./components-v2/FormSections/Followups";



const nav = [
  {
    path: "basic-information",
    component: BasicInformation,
    navName: "Basic Information"
  },
  {
    path: "family",
    component: Family,
    navName: "Family"
  },
  {
    path: "medical",
    component: Medical,
    navName: "Medical"
  },
  {
  	path:"post-profile",
  	component:PostProfile,
  	navName:"Post Profiling Information"
  },
  {
  	path:"followups",
  	component:Followups,
  	navName:"Follow Ups"
  }

  ];

  export default nav;
