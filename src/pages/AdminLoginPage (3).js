import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Form, FormGroup, FormText, Container, Row, Col, Label, Input, Button } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
function AdminLoginPage() {
    const [value, setValue] = useState(new Date().toISOString());
    const [fmtValue, setFmtValue] = useState(undefined);

    const handleChange = (value, formattedValue) => {
        setValue(value);
        setFmtValue(formattedValue);
    };

    useEffect(() => {
        console.log(`Formatted value is ${fmtValue}`);
    }, [fmtValue]);

    return (
        <FormGroup>
            <Label>My Date Picker</Label>
            <DatePicker
                id="example-datepicker"
                value={value}
                onChange={(v, f) => handleChange(v, f)}
            />
            <FormText>Help</FormText>
        </FormGroup>
    );
}

export default AdminLoginPage;
