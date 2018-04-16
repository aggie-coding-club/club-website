import { Form, Text, Select, Submit, DynamicSubmit, IBaseValidator, Checkbox, Radio, RadioContainer } from 'guestbell-forms';
import React, { Component } from 'react';

class SignupForm extends Component {
    render() {
        return (
            <Form className = "form">
                <div className = "test">
                
                </div>
            </Form>
            //SAMPLE HTML CODE USING THE API FOR TESTING
            /*
            <Form className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Text
                            required={true}
                            label="Username"
                            value={this.state.name}
                            onChange={this.handleNameChange} />
                    </div>
                    <div className="col-lg-6">
                        <Select
                            required={true}
                            label={'Gender'}
                            values={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }]}
                            onChange={this.handleGenderChange}
                            value={this.state.gender} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <TextInput
                            validators={["email"]}
                            required={true}
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange} />
                    </div>
                    <div className="col-lg-6">
                        <Text
                            customValidators={[AgeValidator.instance]}
                            label="Age (optional)"
                            value={this.state.age}
                            onChange={this.handleAgeChange} />
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <Submit
                        className="btn btn-primary btn-lg"
                        onClick={this.submitForm}>
                        Submit
		</Submit>
                </div>
            </Form>*/


        );
    }
}

export default SignupForm;