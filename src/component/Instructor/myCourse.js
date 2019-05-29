import React, { Component } from 'react';
import {  Card, Button, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import 'antd/dist/antd.css';

import * as courseAction from '../../action/CourseAction'
import path from '../../path.js'
import '../../styling.css'

class MyCourse extends Component {

    componentDidMount() {
        this.props.action.course.getCourseByUID(this.props.userId)
    }

    btnNewCourse(e) {
        e.preventDefault();
        this.props.history.push('/addCourse');
    }


    btnAddChapter(courseId, e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/addChapter/' + courseId
        })
    }

    btnEdit(courseId, e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/addCourse/' + courseId
        })
    }
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    } 
    render() {
        let courseList;


        if (this.props.coursebyuser) {
            courseList = this.props.coursebyuser.map(course => {
                let courselength = course.description.length.toString();
                if (courselength > 20) {
                    course.description = course.description.substring(0, 19) + "......"
                }
                return (
                    <div key={course.id} className="abc1" style={{ height: '330px',margin: '5px 7px' }}>
                        <Card>
                            <CardImg top style={{ height: "50%" }} onClick={this.btnExplore.bind(this, course.id)} src={path + course.courseImage} alt="Card image cap" />
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" onClick={this.btnAddChapter.bind(this, course.id)}>Add Chapter</Button>
                                <Button outline color="danger" style={{ marginLeft: '35px' }} onClick={this.btnEdit.bind(this, course.id)}>Edit</Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }

        return (
            <div >
                <h3 style={{marginBottom:'0rem'}}>My Courses</h3>
                <div>
                    <Button color="danger" className="btnnewcourse" style={{ margin: '24px 657px' }} outline onClick={this.btnNewCourse.bind(this)}>Add Course</Button>
                </div>
                <br />
                <div className="cnt" style={{margin:'0 40px'}}>
                    <div style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                        {courseList}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        coursebyuser: state.course.coursebyuser,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCourse);