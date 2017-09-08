import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Callback extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = { redirectToReferrer: false };
	}
	componentDidMount() {
		this.props.auth.handleAuthentication(() => {
			localStorage.removeItem("orphanages");
			window.location.href="/";
		});
	}
	render() {
		return null;
	}
}

export default withRouter(Callback);