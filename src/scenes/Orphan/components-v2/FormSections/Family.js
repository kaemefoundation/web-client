import React, { useContext } from "react";


import {
  reportedByOrphanageFather,
  reportedByOrphanageMother,
  findMultipleRelationshipIndexes
} from "../../utils.js";
import { Formik } from "formik";
import { OrphanContext } from "../../hooks.js";
import RelationshipForm from "./RelationshipForm.js";


function getRelationshipIndexes(data){
    let fatherIndex = data.findIndex(reportedByOrphanageFather);
    let motherIndex = data.findIndex(reportedByOrphanageMother);
    let siblingIndexes = findMultipleRelationshipIndexes(
          data,
          "orphanage",
          ["sibling"],
          []
        );
    let otherIndexes = findMultipleRelationshipIndexes(
          data,
          "orphanage",
          [],
          ["mother", "father", "sibling"]
        );
        return {fatherIndex:fatherIndex, motherIndex:motherIndex, siblingIndexes:siblingIndexes,otherIndexes:otherIndexes};
  }

export default function Family(props) {
	const context = useContext(OrphanContext);
	let indexes = getRelationshipIndexes(context.child.relationships); 
	return (
		<div>
      <Formik
        initialValues={context.child}
        onSubmit={context.onSave}
        render={({ handleSubmit,values,setFieldValue }) => {
         return(<form className={props.formClass} onSubmit={handleSubmit}>
        
		<div className="ui segment">
			<h3 className="ui big top attached label">9. Mother</h3>
			<RelationshipForm type="mother" indexes={indexes.motherIndex}/>
		</div>
		<div className="ui segment">
			<h3 className="ui big top attached label">10. Father</h3>
			<RelationshipForm type="father" indexes={indexes.fatherIndex}/>
		</div>
		<div className="ui segment">
			<h3 className="ui big top attached label">11. Siblings</h3>
			<RelationshipForm type="sibling" indexes={indexes.siblingIndexes}/>
			<button type="button"
                  onClick={(e) => {
                  	let relationships = values['relationships'];
                  	relationships.push({
                      reported_by: "orphanage",
                      orphan_id: context.child.id,
                      date_of_birth:null,
                      relationship_type:"sibling"
                    });
                    props.updateChildWithRelatedData("relationships",relationships);
                  }}
                >
                  Add Sibling
                </button>
		</div>
		 <button type="submit">
          Submit
        </button>
		</form>);}}
		/>
		</div>
	);
}