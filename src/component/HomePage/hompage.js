import React, { Component } from 'react';
import { Button, CardBody, CardText, CardTitle, Card, CardImg } from 'reactstrap'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import { notification, Popover, Rate } from 'antd';
import 'react-animated-slider/build/horizontal.css';

import { Fade } from 'react-slideshow-image';

import * as courseAction from "../../action/CourseAction"
import * as cartAction from '../../action/cartAction'
import * as ratingAction from '../../action/ratingAction'
import HomeLogo from '../../Logo/hom.jpg';
import HomeLogo2 from '../../Logo/hom2.jpg';
import HomeLogo3 from '../../Logo/hom3.jpg';
import HomeLogo4 from '../../Logo/hom4.jpg';
import HomeLogo5 from '../../Logo/hom5.jpg';
import video from '../../Logo/video.png'
import chapter from '../../Logo/chapter.png'
import rupe from '../../Logo/rupee.png'
import path from '../../path'
import "../../styling.css"
import "../../stylesh.css"
import '../../imagesslide.css'

const fadeProperties = {
    duration: 2000,
    transitionDuration: 4000,
    infinite: true,
}
class HomePage extends Component {
    state = {
        width: window.innerWidth,
        height: window.innerHeight - 60,

    }
    componentWillMount() {
        this.props.action.course.getCourse();
        this.props.action.rate.getAllRate();
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }
    }
    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }

    btnGoCart(e) {
        this.props.history.push('/cart');
    }

    btnAddToCart(courseId, e) {
        if (!this.props.token && this.props.Role === "") {
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
    courseexplore = (id, e) => {
        e.preventDefault();
        this.props.action.course.getCourseByCourseID(id);
        let course = "";
        if (this.props.getCourse) {
            this.props.getCourse.map(cdata => {
                return course = cdata
            })
        }
        return (
            <div>
                <p>{course.coursename}</p>
                <p>{course.description}</p>
            </div>
        )
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
            if (userId === course.userId) {
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
        return (
            <div key={course.id} className="abc1" style={{ height: '330px' }}>
                <Card >
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
                        <CardImg style={{ height: "50%" }} onClick={this.btnExplore.bind(this, course.id)} src={path + course.courseImage} alt="Card image cap" />
                    </Popover>
                    <CardBody style={{ height: "50%" }}>
                        <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                        <CardText >{course.description1}</CardText>
                        <Rate allowHalf defaultValue={course.ratings} disabled />
                        <div style={{ marginLeft: '140px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-45px' }} />
                            <h5 style={{ marginTop: '-45px', marginLeft: '22px' }}>{course.rupee}</h5>
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
    renderMedia1(course) {
        
        let courselength = course.description.length.toString();
        if (courselength > 20) {
            course.description1 = course.description.substring(0, 19) + "......"
        }
        if (parseInt(course.ratings) === 0) {
            course.ratings = 3
        }
        let j=0
        this.props.rating.map(rate => {
           if(rate.courseId===course.courseId)
           {
                j=j+1
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
                        <CardImg style={{ height: "50%" }} onClick={this.btnExplore.bind(this, course.id)} top src={path + course.courseImage} alt="Card image cap" />
                    </Popover>
                    <CardBody style={{ height: "50%" }}>
                        <CardTitle ><h2>{course.coursename}</h2></CardTitle>
                        <CardText >{course.description1}</CardText>
                        <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" />
                        <div style={{ marginLeft: '140px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-18px' }} />
                            <h5 style={{ marginTop: '-32px', marginLeft: '20px' }}>{course.rupee}</h5>
                        </div>
                        {/* <Button outline color="danger" onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginLeft: '90px', marginTop: '-70px' }} >Add To Cart</Button> */}
                    </CardBody>
                </Card>
            </div>
        )
    }
    render() {
        let courseList1 = [];
        if (this.props.course) {
            this.props.course.map(course => {
                return courseList1.push(this.renderMedia1(course))
            })
        }

        let courseList = [];
        if (this.props.course) {
            this.props.course.map(course => {
                return courseList.push(this.renderMedia(course))
            })
        }

        return (
            <div className="hrelative">
                <Fade {...fadeProperties} >
                    <div className="each-fade">
                        <div className="image-container">
                            <img src={HomeLogo} alt="homelogo" />
                        </div>
                    </div>
                    <div className="each-fade">
                        <div className="image-container">
                            <img src={HomeLogo2} alt="HomeLogo2" />
                        </div>
                    </div>
                    <div className="each-fade">
                        <div className="image-container" >
                            <img src={HomeLogo5} alt="HomeLogo5" />
                        </div>
                    </div>
                    <div className="each-fade">
                        <div className="image-container" >
                            <img src={HomeLogo3} alt="HomeLogo3" />
                        </div>
                    </div>
                    <div className="each-fade">
                        <div className="image-container" >
                            <img src={HomeLogo4} alt="HomeLogo3" />
                        </div>
                    </div>
                </Fade>
                <div className="homediv" style={{ display: 'block', width: '95%', textAlign: 'left', zIndex: 9 }}>
                    {this.props.token ? (parseInt(this.props.Role) === 2 ? courseList : "") : courseList1}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        rating: state.ratings.rate,
        course: state.course.course,
        getcourse: state.course.getCourseByCid,
        userId: state.auth.userId,
        getCart: state.cart.getCart,
        boughtCourse: state.cart.boughtCourse,
        Role: state.auth.Role,
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        rate: bindActionCreators(ratingAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);