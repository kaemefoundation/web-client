import React from "react";
import { getLocalStorage } from "../../utils.js";
import "offline-js";

class FormContainer extends React.Component {
	render() {
		let offline = window.navigator.onLine === false;
		//if there is a child (from Orphans/index.js)
		if (this.props.id !== undefined) {
			let orphanStoredOffline = getLocalStorage(this.props.id);
			if (
				!offline &&
				orphanStoredOffline &&
				orphanStoredOffline.update === "optimistic"
			) {
				return (
					<div className="thirteen wide column">
						<div className="ui negative message">

							<div className="header">
								This child has updates that were done offline
							</div>
							<p>
								Please confirm you would like to use the offline updates.
							</p>
							<button
								className="ui green button"
								type="button"
								id="local"
								onClick={this.props.onClickLoadData}
							>
								Upload Offline Data
							</button>
							<button
								className="ui red button"
								type="button"
								id="remote"
								onClick={this.props.onClickLoadData}
							>
								<span style={{ fontWeight: "700" }}>
									Do Not
								</span>
								{" "}
								Upload Offline Data
							</button>
						</div>
					</div>
				);
			} else {
				return (
					<div className="thirteen wide column">
						{this.props.children}
					</div>
				);
			}
		} else if (offline) {
			return (
				<div className="thirteen wide column">
					<div className="ui negative message">

						<div className="header">
							You are currently offline
						</div>
						<p>
							This orphan needs to be downloaded before editing
						</p>
					</div>
				</div>
			);
		} else {
			return (
				<div className="thirteen wide column">

					<div className="ui active inverted dimmer">
						<div className="ui indeterminate text loader">
							Loading....
						</div>
					</div>

				</div>
			);
		}
	}
}
export default FormContainer;
