import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import * as registerAction from '../../action/authAction';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            password: "",
            role: 2,
            fieldsErrors: { fullname: '', email: '', password: '' },
        }
    }

    roleChangeHandler(e) {
        let role = 0;
        if (e.target.checked) {
            (e.target.value === "Student") ? role = 2 : role = 1;
            this.setState({
                role: role
            })
        }
    }

    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "role") {
            this.roleChangeHandler(e);
        }
        else {
            this.setState({ [name]: value })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let err_msg = this.props.err_msg;
            if (err_msg === "Email Id Already Exist") {
                this.setState({ err_msg: this.props.err_msg })
            }
            else if (err_msg === "") {
                if (this.props.isOpen) {
                    this.props.toggle();
                    this.props.history.push('/courseList');
                }
            }
        }
    }

    btnRegisterClick() {
        let fieldsErrors = {};
        if (this.state.password === "") {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                password: "* Password Required"
            }
        } else if (this.state.password.trim().length < 6) {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                password: "* Password must contain minimum 6 characters"
            }
        }
        if (this.state.email === "") {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                email: "* Email Required"
            }
        } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                email: "* Invalid Email"
            }
        }
        if (this.state.fullname === "") {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                fullname: "* FullName Required"
            }
        } else if (!this.state.fullname.match(/^[a-zA-Z 0-9]+$/i)) {
            fieldsErrors = {
                ...this.state.fieldsErrors,
                fullname: "* Invalid name"
            }
        }
        if (!fieldsErrors.email && !fieldsErrors.password && !fieldsErrors.fullname) {
            this.props.action.register.RegisterUser(this.state);
        } else {
            this.setState({
                fieldsErrors
            });
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="loginmodel">
                    <ModalHeader toggle={this.props.toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                        {(this.props.err_msg !== "" && this.props.err_msg !== undefined) ? <span className="chperror">{this.props.err_msg}</span> : ""}
                        <Form>
                            <FormGroup>
                                <Input type="text" placeholder="Full Name" name="fullname" onChange={this.inputChangeHandler.bind(this)} />
                                <span className="chperror">{this.state.fieldsErrors.fullname}</span>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" placeholder="Email" onChange={this.inputChangeHandler.bind(this)} />
                                <span className="chperror">{this.state.fieldsErrors.email}</span>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} />
                                <span className="chperror">{this.state.fieldsErrors.password}</span>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" block onClick={this.btnRegisterClick.bind(this)} >Sign Up</Button>
                    </ModalFooter>
                    <center>Already have an account?<span className="signuplink" onClick={this.props.toggleModals}> Log In</span></center>
                    <br />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        err_msg: state.auth.error_msg,
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        register: bindActionCreators(registerAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));