import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Button, CardTitle, CardImg, CardBody, CardText, Card } from 'reactstrap';
import { Popover, Rate } from 'antd'
import 'antd/dist/antd.css';

import path from '../../path';


import * as cartAction from '../../action/cartAction';
import * as ratingsAction from '../../action/ratingAction'

import video from '../../Logo/video.png'
import chapter from '../../Logo/chapter.png'

class BoughtCourse extends Component {

    componentDidMount() {
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
            this.props.action.rate.getRatings(parseInt(this.props.userId))
        }
    }

    ratings(courseId, value, e) {
        let data = {
            userId: parseInt(this.props.userId),
            courseId: courseId,
            ratings: value
        }
        this.props.action.rate.addRatings(data)
    }

    renderMedia(course) {
        let rates = [];
        let rateFound = false;
        let keycnt = 0;
        if (this.props.ratings) {
            this.props.ratings.map((rate, i) => {
                if (rate.courseId === course.courseId) {
                    rateFound = true;
                    rates.push(
                        <Rate key={i} allowHalf defaultValue={rate.ratings} className="ratings" onChange={this.ratings.bind(this, course.courseId)} />
                    )
                }
                return null
            })
            if (!rateFound) {
                keycnt = keycnt + 1;
                rates.push(
                    <Rate key={keycnt} allowHalf className="ratings" onChange={this.ratings.bind(this, course.courseId)} />
                )
            }
        }
        let courselength = course.description.length.toString();
        if (courselength > 20) {
            course.description1 = course.description.substring(0, 19) + "......"
        }

        return (
            <div key={course.id} className="abc1" style={{ height: '330px' }}>
                <Card>
                    <Popover content={
                        <div style={{ width: '250px' }}>
                            <div><h4>{course.coursename}</h4></div>
                            <div>{course.description}</div>
                            <div style={{ marginTop: '10px' }}><h6><img src={video} alt="video" style={{ width: '14px', height: '14px', marginTop: '-4px', marginRight: '2px' }} />{course.lecture.split(',').length}<b style={{ marginLeft: '3px' }}>Lecture</b><img src={chapter} alt="video" style={{ width: '18px', height: '18px', marginTop: '-4px', marginLeft: '20px' }} /> {course.TotalChapter}<b style={{ marginLeft: '3px' }}>Chapter</b></h6></div>
                            <div style={{ marginTop: '15px' }}>
                                {/* <Button outline color="info" onClick={this.btnExplore.bind(this, course.courseId)}  >Learn More</Button>     */}
                            </div>
                        </div>
                    } placement="right">
                        <CardImg top style={{ height: "50%" }} src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.courseId)} alt="Card image cap" />
                    </Popover>
                    <CardBody style={{ height: "50%" }}>
                        <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                        <CardText>{course.description1}</CardText>
                        <Button outline color="info" onClick={this.btnExplore.bind(this, course.courseId)}>Learn More</Button><br/>
                        <b>Rate It:-{rates}</b>
                    </CardBody>
                </Card>
            </div>
        )

    }

    btnExplore(courseId, e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }

    render() {

        let buycourse = [];
        if (this.props.boughtCourse) {
            this.props.boughtCourse.map(course => {
                return buycourse.push(this.renderMedia(course))
            })
        }
        return (
            <div>
                <h3 className="marginTop">Bought Courses</h3>
                <Container className="container">
                    {buycourse.length !== 0 ? buycourse : <p>Yet Not bought anything. Explore and buy your course</p>}
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
        ratings: state.ratings.ratings
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        cart: bindActionCreators(cartAction, dispatch),
        rate: bindActionCreators(ratingsAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoughtCourse);