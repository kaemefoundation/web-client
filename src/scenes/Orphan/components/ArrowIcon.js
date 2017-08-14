import React from 'react'

function ArrowIcon(props){

	if(props.direction === 'asc'){
		return (<i className="caret down icon"></i>)
	}else if(props.direction === 'desc'){
		return (<i className="caret up icon"></i>)
	}else{
		return null;
	}
	
}

export default ArrowIcon