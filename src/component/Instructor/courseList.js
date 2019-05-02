import React, { Component } from 'react';
import { Button, Container, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import 'antd/dist/antd.css';

import { Popconfirm } from 'antd';

import * as courseAction from '../../action/CourseAction';
import * as cartAction from '../../action/cartAction';
import path from '../../path';
import '../../styling.css'
import rupe from '../../Logo/rupee.png'

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageModal: false,
            videoModal: false,
            courseId: 0,
            visible: false
        };
    }
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }
    btnDelete(courseId, e) {
        this.props.action.course.deleteCourse(courseId);
    }

    componentDidMount() {
        // this.props.action.course.getCourse();
        this.props.action.course.getCourseByUID(this.props.userId);
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
                    <div key={course.id} className="abc1" style={{ height: '330px' }}>
                        <Card>
                            <CardImg top style={{ height: "50%" }} onClick={this.btnExplore.bind(this, course.id)} src={path + course.courseImage} alt="Card image cap" />
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <div>
                                    <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '17px' }} />
                                    <h5 style={{ marginTop: '-22px', marginLeft: '22px' }}>{course.rupee}</h5>
                                </div>                        
                                    <Button className="btnmycourse" outline color="danger" style={{ marginLeft: '120px', marginTop: '-70px' }} onClick={this.btnDelete.bind(this, course.id)}>Delete</Button> 
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        return (
            <div>
                <h3 className="marginTop">Courses</h3>
                <Container className="cnt">
                    <div style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                        {courseList}
                    </div>
                </Container>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        course: state.course.course,
        userId: state.auth.userId,
        getCart: state.cart.getCart,
        coursebyuser: state.course.coursebyuser,
        boughtCourse: state.cart.boughtCourse
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);