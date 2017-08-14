import React, { Component } from "react";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { redirectToReferrer: false };
		this.login = this.login.bind(this);
	}

	login() {
		this.props.auth.login();
	}

	render() {
		return (
			<div>
				<h1 className="ui center aligned header">Welcome to the Kaeme Database</h1>
				<div className="">
					<button style={{margin:"auto",display:"block"}}
						className="ui red button"
						type="button"
						onClick={this.login}
					>
						Log in
					</button>
				</div>
			</div>
		);
	}
}
export default Login;
