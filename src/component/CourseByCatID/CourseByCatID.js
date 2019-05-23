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
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import HomeLogo from '../../Logo/hom.jpg';
import HomeLogo2 from '../../Logo/hom2.jpg';
import HomeLogo3 from '../../Logo/hom3.jpg';
import HomeLogo4 from '../../Logo/hom4.jpg';
import rupe from '../../Logo/rupee.png'
import video from '../../Logo/video.png'
import chapter from '../../Logo/chapter.png'
import { notification, Popover, Rate } from 'antd';

const content = [
    { image: HomeLogo },
    { image: HomeLogo2 },
    { image: HomeLogo3 },
    { image: HomeLogo4 }
];
class CourseByCID extends Component {

    componentDidMount() {
        // this.props.action.course.getCourse();
        // this.props.action.category.getCourseByCID(this.props.match.params.cid);
        // this.props.action.category.getCourseByCID(this.props.match.params.cid);
        this.props.action.course.getCourse();
        this.props.action.category.getCourseByCID(this.props.match.params.cid);
        this.props.action.rate.getAllRate();
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }

    }
    componentDidUpdate() {
        this.props.action.category.getCourseByCID(this.props.match.params.cid);
    }
    componentWillMount() {
        // this.props.action.course.getCourse();
        // this.props.action.category.getCourseByCID(this.props.match.params.cid);
        // this.props.action.rate.getAllRate();
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
            <div key={course.id} className="abc1" style={{ height: '330px' }}>
                <Card>
                    <Popover content={
                        <div style={{ width: '250px' }}>
                            <div><h4>{course.coursename}</h4></div>
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
                        <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                        <CardText style={{ marginBottom: '-1px' }}><p style={{ marginBottom: '-1px' }}>{course.description1}</p></CardText>
                        <div>
                            <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" />
                            (<b style={{ fontSize: '16px', fontFamily: 'serif' }}>{j}</b>)
                        </div>
                        <div style={{ marginLeft: '140px', marginTop: '16px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-18px' }} />
                            <h5 style={{ marginTop: '-32px', marginLeft: '20px' }}>{course.rupee}</h5>
                        </div>
                        {/* {bought ? "" :
                            ((addedToCart && loginCart) ?
                                <Button outline color="danger" onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginLeft: '90px', marginTop: '-70px' }}>Add To Cart</Button>
                                : <Button outline onClick={this.btnGoCart.bind(this)} style={{ marginLeft: '90px', marginTop: '-70px' }}>Go to Cart</Button>)
                        } */}
                    </CardBody>
                </Card>

            </div>
        )
    }

    render() {

        let courseList = [];
        if (this.props.courses) {
            courseList = this.props.courses.map(course => {

                let courselength = course.description.length.toString();
                if (courselength > 20) {
                    course.description1 = course.description.substring(0, 19) + "......"
                }
                return (
                    <div key={course.id} className="abc1" style={{ height: '330px' }}>
                        <Card>
                            <CardImg style={{ height: "50%" }} top src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.id)} alt="Card image cap" />
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description1}</CardText>
                                <Button outline color="info" onClick={this.btnAddChapter.bind(this, course.id)}>Add Chapter</Button>
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
                    <div key={course.id} className="abc1" style={{ height: '330px' }}>
                        <Card>
                            <Popover content={
                                <div style={{ width: '250px' }}>
                                    <div><h4>{course.coursename}</h4></div>
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
                                <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                                <CardText style={{ marginBottom: '-1px' }}><p style={{ marginBottom: '-1px' }}>{description1}</p></CardText>
                                <div>
                                    <Rate allowHalf defaultValue={course.ratings} disabled />
                                    (<b style={{ fontSize: '16px', fontFamily: 'serif' }}>{j}</b>)
                                </div>
                                <div style={{ marginLeft: '140px', marginTop: '16px' }}>
                                    <img src={rupe} alt="category" style={{ marginTop: '-18px' }} className="rupesIcon" />
                                    <h5 style={{ marginTop: '-32px', marginLeft: '20px' }}>{course.rupee}</h5>
                                </div>
                                {/* <Button outline color="danger" onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginLeft: '90px', marginTop: '-70px' }} >Add To Cart</Button> */}
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }

        let sliderimg = []
        sliderimg = content.map((item, index) => {
            return (
                <div key={index} className="slider-content"
                    style={{ background: `url('${item.image}') no-repeat center center`, height: '100%' }}>
                </div>
            )
        })
        return (

            <div className="hrelative">
                <Slider className="slider-wrapper" >
                    {sliderimg}
                </Slider>

                <div className="homediv" style={{ display: 'block', width: '95%', textAlign: 'left' }}>
                    {this.props.token ? (parseInt(this.props.Role) === 1 ? courseList : courseList1) : courseList2}
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