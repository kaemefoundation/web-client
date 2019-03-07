export function dropdownListSort(a,b){
	return a.label.localeCompare(b.label);
}

export function updateLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function onlineOffline(callbackForOnline,callbackForOffline){
	if(window.navigator.onLine){
		console.log("online");
		return callbackForOnline();
	}else{
		console.log("offline");
		return callbackForOffline();
	}
}
export function getCurrentOrphanageIndex(data){
	let index = data.findIndex((element)=>{
		return element.is_current_residence === 1;
	});
	return index;
}

export function getPriorResidenceIndex(data,reportedBy){
	let index = data.findIndex((element)=>{
		return element.reported_by === reportedBy && element.is_current_residence !== 1;
	});
	return index;
}
export function getOtherResidences(data,priorResidenceIndex,reportedBy){
	
	let indexes = [];
	
	data.map((element,index)=>{
		if(element.is_current_residence !== 1 && index !== priorResidenceIndex && element.reported_by === reportedBy){
			indexes.push(index);
		}
		return element;
	});
	return indexes;
}
export function reportedByOrphanFather(element) {
	return findRelationshipIndex("father", "orphan", element);
}
export function reportedByOrphanMother(element) {
	return findRelationshipIndex("mother", "orphan", element);
}
export function reportedByOrphanageFather(element) {
	return findRelationshipIndex("father", "orphanage", element);
}
export function reportedByOrphanageMother(element) {
	return findRelationshipIndex("mother", "orphanage", element);
}
export function findMultipleRelationshipIndexes(
	data,
	reportedBy,
	includeTypes,
	excludeTypes
) {
	let indexes = [];

	data.map((element, index) => {
		if (element.reported_by === reportedBy) {
			if (includeTypes.length > 0) {
				if (
					includeTypes.includes(element.relationship_type) &&
					!excludeTypes.includes(element.relationship_type)
				) {
					indexes.push(index);
				}
			} else if (!excludeTypes.includes(element.relationship_type)) {
				indexes.push(index);
			}
		}
		return element;
	});
	return indexes;
}
export function findRelationshipIndex(type, reportedBy, element) {
	return (
		element.reported_by === reportedBy && element.relationship_type === type
	);
}
export const  units = {'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16
}
