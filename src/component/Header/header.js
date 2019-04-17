import React, { Component } from 'react';
import { Navbar, DropdownItem, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, Collapse, Dropdown, DropdownToggle, DropdownMenu, Input, InputGroup, InputGroupAddon, } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";


import Login from '../Login/login'
import Register from '../Register/register'

import ulogo from '../../Logo/udemylogo.png'
import tlogo from '../../Logo/trolly.png'
import category from '../../Logo/category.png'
import search from '../../Logo/search.png'

import * as authAction from "../../action/authAction";
import * as catAction from "../../action/categoryAction"
import * as courseAction from "../../action/CourseAction"

import '../../styling.css'
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            LoginModal: false,
            RegisterModal: false,
            dropdownOpen: false,
            ddlogoutopen: false,
            query: '',
            result: []
        };

        this.toggle = this.toggle.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.DropDownToggle = this.DropDownToggle.bind(this);
        this.DropDownLogoutToggle = this.DropDownLogoutToggle.bind(this);
    }

    componentDidMount() {
        this.props.action.category.getCategory();
    }
    onSelect(cid, e) {
        this.props.action.category.getCourseByCID(cid);
        this.props.history.push('/courseCID');
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleLogin() {
        this.setState(prevState => ({
            LoginModal: !prevState.LoginModal
        }));
    }

    toggleLinks() {
        this.setState(prevState => ({
            LoginModal: !prevState.LoginModal,
            RegisterModal: !prevState.RegisterModal
        }));
    }

    toggleRegister() {
        this.setState(prevState => ({
            RegisterModal: !prevState.RegisterModal
        }));
    }
    btnMyCourse(e) {
        e.preventDefault();
        this.props.history.push('/myCourse');
    }
    btnLogout(e) {
        this.props.action.auth.logoutUser();
        localStorage.clear();
        this.props.history.push('/');
    }
    btnBoughtCourse(e) {
        e.preventDefault();
        this.props.history.push('/boughtCourse')
    }
    btnCourses(e) {
        e.preventDefault();
        this.props.history.push('/courseList')
    }
    DropDownToggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    DropDownLogoutToggle() {
        this.setState(prevState => ({
            ddlogoutopen: !prevState.ddlogoutopen
        }));
    }

    render() {
        let token = this.props.token;
        let role = parseInt(this.props.Role);

        let categories = "";
        if (this.props.category) {
            categories = this.props.category.map(cat => {
                return <DropdownItem key={cat.id} onClick={this.onSelect.bind(this, cat.id)}>{cat.name}</DropdownItem>
            })
        }

        return (
            <div>
                <Login isOpen={this.state.LoginModal} toggle={this.toggleLogin.bind(this)} toggleModals={this.toggleLinks.bind(this)}></Login>{' '}
                <Register isOpen={this.state.RegisterModal} toggle={this.toggleRegister.bind(this)} toggleModals={this.toggleLinks.bind(this)}></Register>
                <Navbar className="navbar" light expand="md" style={{ height: '65px' }}>
                    <NavbarBrand href="/"><img src={ulogo} alt="ulogo" style={{ height: '100px', width: '150px' }}></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav>
                            <NavItem>
                                <NavLink>
                                    <img src={category} alt="category" className="cat" height="35px" width="35px" />
                                    {' '}
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.DropDownToggle} className="display" >
                                        <DropdownToggle style={{ background: "white", color: " black" }} caret>Categories </DropdownToggle>
                                        <DropdownMenu>
                                            {categories}
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavLink>
                            </NavItem>
                            <NavItem className="searchNav">
                                <InputGroup style={{ width: "450px", marginLeft: "10px", marginTop: "10px" }}>
                                    <Input placeholder="Search For Course" />
                                    <InputGroupAddon addonType="append"> <img src={search} alt="category" className="searchIcon" /></InputGroupAddon>
                                </InputGroup>
                                <div className="searchResult">

                                </div>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavbarBrand href="/"><img src={tlogo} alt="tlogo" style={{ height: '42px', width: '50px' }}></img></NavbarBrand>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">
                                    {(token && role === 1) ? <Button color="danger" outline onClick={this.btnMyCourse.bind(this)} >ADD Courses</Button> : ""}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">
                                    {(token && role === 1) ? <Button color="danger" outline onClick={this.btnCourses.bind(this)}>Courses</Button> : ""}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">
                                    {token ? <Button color="danger" outline onClick={this.btnBoughtCourse.bind(this)}>Bought Course</Button> : ""}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {!token ?
                                    (<div className="marginLogin" >
                                        <Button outline onClick={this.toggleLogin}> Log In</Button>{' '}
                                        <Button color="danger" onClick={this.toggleRegister}>Sign Up</Button></div>) :
                                    (<div>
                                        <Dropdown isOpen={this.state.ddlogoutopen} toggle={this.DropDownLogoutToggle} className="ddlogout">
                                            <DropdownToggle style={{ background: "white", color: " black", marginTop: "8px" }} caret>{this.props.Name} </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={this.btnLogout.bind(this)}>LogOut</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>)
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        category: state.category.category,
        Name: state.auth.Name,
        token: state.auth.token,
        Role: state.auth.Role,
        //getCart: state.cart.getCart,
        userId: state.auth.userId,
        //totalCart: state.cart.totalCart,
        course: state.course.course,
        getCourse: state.course.getCourseByCid
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        category: bindActionCreators(catAction, dispatch),
        auth: bindActionCreators(authAction, dispatch),
        //cart: bindActionCreators(cartAction, dispatch),
        course: bindActionCreators(courseAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));