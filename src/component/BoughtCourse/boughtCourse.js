import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container,  Button, CardTitle, CardImg, CardBody, CardText, Card } from 'reactstrap';

import 'antd/dist/antd.css';

import path from '../../path';
import * as cartAction from '../../action/cartAction';

class BoughtCourse extends Component {

    componentDidMount() {
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
            //this.props.action.rate.getRatings(parseInt(this.props.userId))
        }
    }

    btnExplore(courseId, e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }

    render() {
        let buyCourse = [];
        if (this.props.boughtCourse) {
            buyCourse = this.props.boughtCourse.map(course => {
                let courselength = course.description.length.toString();
                if (courselength > 20) {
                    course.description = course.description.substring(0, 19) + "......"
                }
                return (
                    <div key={course.id} className="abc1" style={{ height: '330px' }}>
                        <Card>
                            <CardImg top style={{ height: "50%" }}src={path + course.courseImage} onClick={this.btnExplore.bind(this,course.courseId)} alt="Card image cap" />
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" onClick={this.btnExplore.bind(this, course.courseId)}  >Learn More</Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        return (
            <div>
                <h3 className="marginTop">Bought Courses</h3>
                <Container className="container">
                    {buyCourse.length !== 0 ? buyCourse : <p>Yet Not bought anything. Explore and buy your course</p>}
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        boughtCourse: state.cart.boughtCourse,
        token: state.auth.token,
        //ratings: state.ratings.ratings
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        cart: bindActionCreators(cartAction, dispatch),
        //rate: bindActionCreators(ratingsAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoughtCourse);