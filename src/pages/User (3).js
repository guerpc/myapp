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
		const { email, password, address, city, userState, zip, id, userType, phone } = this.state;
		return (
			<div>
				<p>Email: {email}</p>
				<p>Password: {password}</p>
				<p>Address: {address}</p>
				<p>City: {city}</p>
				<p>State: {userState}</p>
				<p>Zip: {zip}</p>
				<p>ID: {id}</p>
				<p>User Type: {userType}</p>
				<p>Phone: {phone}</p>
			</div>
		);
	}
}
