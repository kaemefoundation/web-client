import React from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

class LogoutButton extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	render() {
		const { auth } = this.props;

		return auth.isAuthenticated()
			? <div className="item"> <a className="ui red button"
					onClick={(e) => {
						e.preventDefault();
						auth.logout();
						window.location.href="/login";
					}}
				>
					Sign out
				</a></div>
			: <p />;
	}
}

export default withRouter(LogoutButton);
