import React, { useState, Component } from "react";
export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vId: props.vId || "Test vId",
			vUsername: props.vUsername || "vUsername",
			vPass: props.vPass || "Test vPass",
			type: props.type || "Test type",
			otherUID: props.otherUID || "Test otherUID"
		};
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}
