import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as loginAction from '../../action/authAction';
import * as cartAction from '../../action/cartAction'
import * as courseAction from '../../action/CourseAction' 

import loginlogo from '../../Logo/login.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fieldsErrors: { email: '', password: '' },
            err_msg: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let err_msg = this.props.err_msg;
            if (err_msg === "Password In Correct" || err_msg === "Email Id Already Exist") {
                this.setState({ err_msg: this.props.err_msg })
            }
            else if (localStorage.getItem("token")) {
                if (this.props.isOpen) {
                    this.props.toggle();
                    // this.props.history.push('/courseList');
                }
            }
        }
    }

    inputChangeHandler(e) {
        this.setState({ fieldsErrors: { email: '', password: '' } })
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    btnLoginClick(e) {
        e.preventDefault();
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
        if (!fieldsErrors.email && !fieldsErrors.password) {
            this.props.action.auth.loginUser(this.state);
        } else {
            this.setState({
                fieldsErrors
            });
        }
        this.props.action.course.getCourse();
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="loginmodel">
                    <ModalHeader toggle={this.props.toggle}>Log In</ModalHeader>
                    <ModalBody>
                        {(this.props.err_msg !== "" && this.props.err_msg !== undefined) ? <span className="chperror">{this.props.err_msg}</span> : ""}
                        <Form>
                            <FormGroup style={{ textAlign: 'center' }}>
                                <img src={loginlogo} className="loginlogo" alt=""></img>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.inputChangeHandler.bind(this)} value={this.state.email} />
                                <span className="chperror">{this.state.fieldsErrors.email}</span>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} value={this.state.password} />
                                <span className="chperror">{this.state.fieldsErrors.password}</span>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" block onClick={this.btnLoginClick.bind(this)}>Log In</Button>
                    </ModalFooter>
                    <center>Don't have an account? <span className="signuplink" onClick={this.props.toggleModals} > Sign up</span></center>
                    <br />
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => {
    const { auth } = state;
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        err_msg: auth.error_msg,
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        auth: bindActionCreators(loginAction, dispatch)

    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));