import React, { useState, Component } from "react";
export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: props.email || "Test Email",
			password: props.password || "TestPass",
			address: props.address || "Test Address",
			city: props.city || "Test City",
			userState: props.userState || "Test State",
			zip: props.zip || "TestZip",
			id: props.id || "TestID",
			userType: props.userType || "TestType",
			phone: props.phone || "TestPhone"
		};
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}
