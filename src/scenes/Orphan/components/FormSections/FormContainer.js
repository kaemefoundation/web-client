import React from "react";
import "offline-js";

class FormContainer extends React.Component {
	render() {
		let offline = window.navigator.onLine === false;
		return (
			<div className="thirteen wide column">
				{this.props.id === undefined && offline
					? <div className="ui negative message">

							<div className="header">
								You are currently offline
							</div>
							<p>
								This orphan needs to be downloaded before editing
							</p>
						</div>
					: this.props.children}
			</div>
		);
	}
}
export default FormContainer;