import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button, CardImg, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { bindActionCreators } from "redux";

import * as courseAction from "../../action/CourseAction"
import * as cartAction from '../../action/cartAction'
import * as ratingAction from '../../action/ratingAction'
import * as catAction from '../../action/categoryAction'

import path from '../../path'
import '../../styling.css'
import 'react-animated-slider/build/horizontal.css';

import rupe from '../../Logo/rupee.png'
import video from '../../Logo/video.png'
import chapter from '../../Logo/chapter.png'
import ulogo from '../../Logo/udemylogo.png'
import { notification, Popover, Rate } from 'antd';

class CourseByCID extends Component {

    componentDidMount() {
        this.props.action.course.getCourse();
        this.props.action.category.getCourseByCID(this.props.match.params.cid);
        this.props.action.rate.getAllRate();
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }
    }
    componentDidUpdate() {
        //  this.props.action.category.getCourseByCID(this.props.match.params.cid);
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
    btnGoCart(e) {
        this.props.history.push('/cart');
    }
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }
    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };
    btnAddToCart(courseId, e) {
        if (!this.props.token && !this.props.Role) {
            this.openNotificationWithIcon('info', "Please Login First");
        }
        else {
            let cartData = [];
            let data = {
                userId: parseInt(this.props.userId),
                courseId: courseId
            }
            if (this.props.token) {
                this.props.action.cart.addToCart(data);
            }
            else {
                cartData = JSON.parse(localStorage.getItem("cart"));
                if (cartData === null) {
                    cartData = [];
                }
                cartData.push({ courseId: courseId });
                localStorage.setItem("cart", JSON.stringify(cartData));
            }
            this.openNotificationWithIcon('success', "Successfully added to cart");
        }
    }
    renderMedia(course) {
        let addedToCart = true;
        let loginCart = true;
        let bought = false;
        let boughtCourseId = [];
        let userId = parseInt(this.props.userId);
        if (this.props.token) {
            if (this.props.boughtCourse && this.props.boughtCourse.length !== 0) {
                this.props.boughtCourse.map(boughtcourse => {
                    return boughtCourseId.push(boughtcourse.courseId);
                })
            }
            if (userId === parseInt(this.props.boughtCourse.userId)) {
                bought = true;
            }
            else if (boughtCourseId.includes(course.id)) {
                bought = true;
            }
            else if (this.props.getCart && this.props.getCart.length !== 0) {
                this.props.getCart.map(cart => {
                    if (cart.courseId === course.id) {
                        return addedToCart = false;
                    }
                    return null
                })
            }
        }
        else if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length !== 0) {
            let carts = JSON.parse(localStorage.getItem("cart"));
            let cid = [];
            carts.map(c => {
                return cid.push(c.courseId)
            });
            for (let i = 0; i < cid.length; i++) {
                if (cid[i] === course.id) {
                    loginCart = false;
                }
            }
        }
        let courselength = course.description.length.toString();
        if (courselength > 20) {
            course.description1 = course.description.substring(0, 19) + "......"
        }
        if (parseInt(course.ratings) === 0) {
            course.ratings = 3
        }
        let j = 0
        this.props.rating.map(rate => {
            if (rate.courseId === course.courseId) {
                j = j + 1
            }
            return j
        })
        return (
            <div key={course.id} className="abc1" style={{ height: '330px', margin: '10px 0px' }}>
                <Card style={{ width: '222px', margin: '0 4px' }}>
                    <Popover content={
                        <div style={{ width: '250px' }}>
                            <div><h5>{course.coursename}</h5></div>
                            <div>{course.description}</div>
                            <div style={{ marginTop: '10px' }}><h6><img src={video} alt="video" style={{ width: '14px', height: '14px', marginTop: '-4px', marginRight: '2px' }} />{course.lecture.split(',').length}<b style={{ marginLeft: '3px' }}>Lecture</b><img src={chapter} alt="video" style={{ width: '18px', height: '18px', marginTop: '-4px', marginLeft: '20px' }} /> {course.TotalChapter}<b style={{ marginLeft: '3px' }}>Chapter</b></h6></div>
                            <div style={{ marginTop: '15px' }}>
                                {bought ? "" :
                                    ((addedToCart && loginCart) ?
                                        <Button color="danger" onClick={this.btnAddToCart.bind(this, course.id)} >Add To Cart</Button>
                                        : <Button color="info" onClick={this.btnGoCart.bind(this)} >Go to Cart</Button>)
                                }
                            </div>
                        </div>
                    } placement="right">
                        <CardImg style={{ height: "50%" }} top src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.id)} alt="Card image cap" />
                    </Popover>
                    <CardBody style={{ height: "50%" }}>
                        <CardTitle ><h5 style={{ textAlign: 'initial' }}>{course.coursename}</h5></CardTitle>
                        <CardText style={{ marginBottom: '-1px', textAlign: 'initial' }}>{course.description1}</CardText>
                        <div style={{ textAlign: 'initial' }}>
                            <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" style={{ marginLeft: '-12px' }} />
                            ({j})
                        </div>
                        <div style={{ marginLeft: '116px', marginTop: '30px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-18px', marginLeft: '3px' }} />
                            <h5 style={{ marginTop: '-32px', marginLeft: '18px' }}>{course.rupee}</h5>
                        </div>
                    </CardBody>
                </Card>

            </div>
        )
    }

    render() {

        let courseList = [];
        let catname = ""
        if (this.props.courses) {
            courseList = this.props.courses.map(course => {
                let categoryname = course.category
                catname = categoryname
                let courselength = course.description.length.toString();
                if (courselength > 20) {
                    course.description1 = course.description.substring(0, 19) + "......"
                }
                return (
                    <div key={course.id} style={{ height: '305px', margin: '10px 7px' }}>
                        <Card style={{ margin: '0 0px' }}>
                            <CardImg style={{ height: "50%" }} top src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.id)} alt="Card image cap" />
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h5 style={{ textAlign: 'initial' }}>{course.coursename}</h5></CardTitle>
                                <CardText>{course.description1}</CardText>
                                <Button outline color="info" onClick={this.btnAddChapter.bind(this, course.id)} style={{ margin: '8px -6px' }}>Add Chapter</Button>
                                <Button outline color="danger" style={{ marginLeft: '35px' }} onClick={this.btnEdit.bind(this, course.id)}>Edit</Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        let courseList1 = []
        if (this.props.courses) {
            this.props.courses.map(course => {
                return courseList1.push(this.renderMedia(course))
            })
        }
        let courseList2 = []
        if (this.props.courses) {
            let description1;
            courseList2 = this.props.courses.map(course => {
                let courselength = course.description.length.toString();
                if (courselength > 20) {
                    description1 = course.description.substring(0, 19) + "......"
                }
                if (parseInt(course.ratings) === 0) {
                    course.ratings = 3
                }
                let j = 0
                this.props.rating.map(rate => {
                    if (rate.courseId === course.courseId) {
                        j = j + 1
                    }
                    return j
                })
                return (
                    <div key={course.id} style={{ height: '330px', margin: '10px 0px' }}>
                        <Card style={{ width: '222px', margin: '0 4px' }}>
                            <Popover content={
                                <div style={{ width: '250px' }}>
                                    <div><h5>{course.coursename}</h5></div>
                                    <div>{course.description}</div>
                                    <div style={{ marginTop: '10px' }}><h6><img src={video} alt="video" style={{ width: '14px', height: '14px', marginTop: '-4px', marginRight: '2px' }} />{course.lecture.split(',').length}<b style={{ marginLeft: '3px' }}>Lecture</b><img src={chapter} alt="video" style={{ width: '18px', height: '18px', marginTop: '-4px', marginLeft: '20px' }} /> {course.TotalChapter}<b style={{ marginLeft: '3px' }}>Chapter</b></h6></div>
                                    <div style={{ marginTop: '15px' }}>
                                        <Button color="danger" onClick={this.btnAddToCart.bind(this, course.id)}>Add To Cart</Button>
                                    </div>
                                </div>
                            } placement="right">
                                <CardImg style={{ height: "50%" }} top src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.id)} alt="Card image cap" />
                            </Popover>
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h5 style={{ textAlign: 'initial' }}>{course.coursename}</h5></CardTitle>
                                <CardText style={{ marginBottom: '-1px', textAlign: 'initial' }}>{description1}</CardText>
                                <div style={{ textAlign: 'initial' }}>
                                    <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" style={{ marginLeft: '-12px' }} />
                                    ({j})
                                 </div>
                                <div style={{ marginLeft: '116px', marginTop: '40px' }}>
                                    <img src={rupe} alt="category" style={{ marginTop: '-18px', marginLeft: '3px' }} className="rupesIcon" />
                                    <h5 style={{ marginTop: '-32px', marginLeft: '18px' }}>{course.rupee}</h5>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        return (

            <div className="hrelative">
                <div className="shadecolor">
                </div>
                <div style={{ fontSize: '36px', fontFamily: 'inherit', textAlign: 'initial', color: '#ffffff', margin: '-72px 0px 34px 145px' }}>
                    {catname}
                </div>
                <div className="homediv" style={{ display: 'block', width: '95%', textAlign: 'left', margin: '10px 142px' }}>
                    {this.props.token ? (parseInt(this.props.Role) === 1 ? courseList : courseList1) : courseList2}
                </div>
                <div style={{ textAlign: 'initial', marginTop: '142px' }}>
                    <div style={{ color: '#686f7a', borderTop: '1px solid lightgray' }}>
                        <img src={ulogo} alt="ulogo" style={{ height: '70px', width: '120px', margin: ' 0 31.5% 0 0' }}></img>
                        Copyright © 2019 Udemy, Inc</div>
                </div>
                <div className="shadecolor1">

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error_msg: state.category.error_msg,
        courses: state.category.courses,
        rating: state.ratings.rate,
        Role: state.auth.Role,
        token: state.auth.token,
        userId: state.auth.userId,
        getCart: state.cart.getCart,
        boughtCourse: state.cart.boughtCourse,
    }
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        rate: bindActionCreators(ratingAction, dispatch),
        category: bindActionCreators(catAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseByCID);