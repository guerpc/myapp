import React, { useState } from "react";

class User {
    constructor(email, password, address, city, state, zip, id, userType, phone) {
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.id = id;
        this.userType = userType;
        this.phone = phone;
    }
}

export default User;