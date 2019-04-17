import React, { Component } from 'react';
import { Button, CardBody, CardDeck, CardText, CardTitle, Card, CardImg } from 'reactstrap'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as courseAction from "../../action/CourseAction"

import HomeLogo from '../../Logo/hom.jpg';
import path from '../../path'
import "../../styling.css"

class HomePage extends Component {
    state = {
        width: window.innerWidth,
        height: window.innerHeight - 60
    }
    // handleLetsStartButton() {
    //     this.props.history.push('/courseList');
    // }
    componentDidMount() {
        this.props.action.course.getCourse();
    }
    render() {
        let courseList;
        if (this.props.course) {
            courseList = this.props.course.map(course => {
                return (
                    <div key={course.id} className="abc1">
                        {/* <CardDeck style={{ width: '260px', display: 'flex', flexDirection: 'row' }}> */}
                        <Card>
                            <CardImg top  src={path + course.courseImage} alt="Card image cap" />
                            <CardBody>
                                <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" >Add Chapter</Button>
                            </CardBody>
                        </Card>
                        {/* </CardDeck > */}
                    </div>
                )
            })
        }


        return (
            <div className="hrelative">
                <img src={HomeLogo}
                    style={{
                        width: this.state.width, height: this.state.height,
                        backgroundRepeat: "no-repeat", backgroundAttachment: "fixed"
                    }}
                    alt="Home">
                </img>
                <div className="homediv" style={{ display: 'block', width: '100%',textAlign:'left' }}>
                    {courseList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        course: state.course.course,
        userId: state.auth.userId,
        //getCart: state.cart.getCart,
        //boughtCourse: state.cart.boughtCourse
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        //cart: bindActionCreators(cartAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);