import React, { Component } from 'react';
import { Button, Container, Media, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Rate, notification } from 'antd';
import 'antd/dist/antd.css';

import * as courseAction from '../../action/CourseAction';
import * as cartAction from '../../action/cartAction';
import path from '../../path';
import '../../styling.css'

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageModal: false,
            videoModal: false,
            courseId: 0,
            visible: false
        };
        //this.toggleImage = this.toggleImage.bind(this);
        //this.toggleVideo = this.toggleVideo.bind(this);
        //this.onDismiss = this.onDismiss.bind(this);
    }
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }

    componentDidMount() {
        this.props.action.course.getCourse();
        // if (this.props.token && this.props.userId) {
        //     this.props.action.cart.getCartByUser(parseInt(this.props.userId))
        //     this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        // }

    }
    render() {
        let addedToCart = true;
        let loginCart = true;
        let bought = false;
        let boughtCourseId = [];

        let courseList;
        if (this.props.course) {
            courseList = this.props.course.map(course => {
                return (
                    <div key={course.id} className="abc1">
                        <Card>
                            <CardImg top width="10px" src={path + course.courseImage} alt="Card image cap" />
                            <CardBody>
                                <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" outline onClick={this.btnExplore.bind(this, course.id)} >Learn More</Button>
                                {bought ? "" :
                                    ((addedToCart && loginCart) ?
                                        <Button outline  >Add To Cart</Button>
                                        : <Button  outline onClick={this.btnGoCart.bind(this)}>Go to Cart</Button>)
                                }
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