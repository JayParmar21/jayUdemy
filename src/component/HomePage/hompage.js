import React, { Component } from 'react';
import { Button, CardBody, CardText, CardTitle, Card, CardImg, NavLink, Nav, Navbar } from 'reactstrap'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import ScrollMenu from 'react-horizontal-scrolling-menu';
import { notification, Popover, Rate } from 'antd';
import 'react-animated-slider/build/horizontal.css';

import { Fade } from 'react-slideshow-image';
import Slider from "react-slick";

import * as courseAction from "../../action/CourseAction"
import * as cartAction from '../../action/cartAction'
import * as ratingAction from '../../action/ratingAction'
import * as catAction from '../../action/categoryAction'

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
import "../../roll.css"

const fadeProperties = {
    duration: 2000,
    transitionDuration: 4000,
    infinite: true,
    arrows: false
}
const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear"
};

const settings1 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 2,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};
const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};
const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} arrow`}
            style={{ ...style, display: "block", right: '1%', zIndex: 99999 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} arrow`}
            style={{ ...style, display: "block", left: '1%', zIndex: 99999 }}
            onClick={onClick}
        />
    );
}
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
class HomePage extends Component {
    state = {
        width: window.innerWidth,
        height: window.innerHeight - 60,
        courseData: [],
        boughtcoursedata: [],
        index: 0
    }
    componentWillMount() {
        let id = 1
        this.props.action.category.getCourseByCID(id);
        this.props.action.rate.getAllRate();
        this.props.action.course.getCourse();
        if (this.props.token && this.props.userId) {
            this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                courseData: nextProps.course,

            }
        )
    }
    onSelect(cid, index, e) {
        e.preventDefault();
        if (cid) {
            this.props.action.category.getCourseByCID(cid);
        }
        this.setState({ index: parseInt(index) })
        // this.props.history.push({
        //     pathname: '/courseCID/' + cid
        // });
    }
    // componentDidMount() {
    //     if (this.props.token && this.props.userId) {
    //         this.props.action.cart.getCartByUser(parseInt(this.props.userId))
    //         this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
    //     }
    // }
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
            <div key={course.id} style={{ height: '300px' }}>
                <Card style={{ width: '222px', margin: '0 auto' }}>
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
                        <CardImg className='carImag' style={{ height: "50%" }} onClick={this.btnExplore.bind(this, course.id)} src={path + course.courseImage} alt="Card image cap" />
                    </Popover>
                    <CardBody style={{ height: "50%" }}>
                        <CardTitle ><h5 style={{ textAlign: 'initial' }}>{course.coursename}</h5></CardTitle>
                        <CardText style={{ marginBottom: '-1px', textAlign: 'initial' }}>{course.description1}</CardText>
                        <div style={{ textAlign: 'initial' }}>
                            <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" style={{ marginLeft: '-12px' }} />
                            ({j})
                        </div>
                        <div style={{ marginLeft: '116px', marginTop: '40px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-18px', marginLeft: '3px' }} />
                            <h5 style={{ marginTop: '-22px', marginLeft: '18px' }}>{course.rupee}</h5>
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
        let j = 0
        this.props.rating.map(rate => {
            if (rate.courseId === course.courseId) {
                j = j + 1
            }
            return j
        })

        return (
            <div key={course.id} style={{ height: '300px' }}>
                <Card style={{ width: '222px' }}>
                    <Popover content={
                        <div style={{ width: '250px' }}>
                            <div ><h6>{course.coursename}</h6></div>
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
                        <CardTitle ><h5 >{course.coursename}</h5></CardTitle>
                        <CardText style={{ marginBottom: '-1px' }}>{course.description1}</CardText>
                        <div >
                            <Rate allowHalf defaultValue={course.ratings} disabled className="anticon" style={{ marginLeft: '-12px' }} />
                            ({j})
                        </div>
                        <div style={{ marginLeft: '114px', marginTop: '22px' }}>
                            <img src={rupe} alt="category" className="rupesIcon" style={{ marginTop: '-18px' }} />
                            <h5 style={{ marginTop: '-32px', marginLeft: '18px' }}>{course.rupee}</h5>
                        </div>
                        {/* <Button outline color="danger" onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginLeft: '90px', marginTop: '-70px' }} >Add To Cart</Button> */}
                    </CardBody>
                </Card>
            </div>
        )
    }
    render() {
        let courseList1 = [];
        if (this.state.courseData) {
            this.state.courseData.map(course => {
                return courseList1.push(this.renderMedia1(course))
            })
        }

        let courseList = [];
        if (this.state.courseData) {
            this.state.courseData.map(course => {
                return courseList.push(this.renderMedia(course))
            })
        }

        let categories1 = "";
        if (this.props.category) {
            categories1 = this.props.category.map((cat, index) => {
                return <NavLink key={cat.id} style={{ borderBottom: this.state.index === index ? '2px solid #162d9a' : '2px solid white' }} onClick={this.onSelect.bind(this, cat.id, index)}>{cat.name}</NavLink>

            })
        }

        let courseList2 = []
        if (this.props.courses) {

            let description1;
            courseList2 = this.props.courses.map(course => {
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
                    <div key={course.id} className="abc1" style={{ height: '300px' }}>
                        <Card style={{ width: '222px', margin: '0 auto' }}>
                            <Popover content={
                                <div style={{ width: '250px' }}>
                                    <div ><h5>{course.coursename}</h5></div>
                                    <div>{course.description}</div>
                                    <div style={{ marginTop: '10px' }}><h6><img src={video} alt="video" style={{ width: '14px', height: '14px', marginTop: '-4px', marginRight: '2px' }} />{course.lecture.split(',').length}<b style={{ marginLeft: '3px' }}>Lecture</b><img src={chapter} alt="video" style={{ width: '18px', height: '18px', marginTop: '-4px', marginLeft: '20px' }} /> {course.TotalChapter}<b style={{ marginLeft: '3px' }}>Chapter</b></h6></div>
                                    <div style={{ marginTop: '15px' }}>
                                        <Button color="danger" onClick={this.btnAddToCart.bind(this, course.id)}>Add To Cart</Button>
                                    </div>
                                </div>
                            } placement="right">
                                <CardImg className='carImag' style={{ height: "50%" }} top src={path + course.courseImage} onClick={this.btnExplore.bind(this, course.id)} alt="Card image cap" />
                            </Popover>
                            <CardBody style={{ height: "50%" }}>
                                <CardTitle ><h5>{course.coursename}</h5></CardTitle>
                                <CardText style={{ marginBottom: '-1px' }}>{description1}</CardText>
                                <div>
                                    <Rate allowHalf defaultValue={course.ratings} disabled style={{ marginLeft: '-12px' }} />
                                    ({j})
                                </div>
                                <div style={{ marginLeft: '116px', marginTop: '40px' }}>
                                    <img src={rupe} alt="category" style={{ marginTop: '-18px' }} className="rupesIcon" />
                                    <h5 style={{ marginTop: '-22px', marginLeft: '18px' }}>{course.rupee}</h5>
                                </div>
                                {/* <Button outline color="danger" onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginLeft: '90px', marginTop: '-70px' }} >Add To Cart</Button> */}
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        return (
            <div className="hrelative">
                <Slider {...settings}>
                    <div style={{ width: '100%', height: '300px' }}>
                        <img src={HomeLogo} alt="homelogo" style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <img src={HomeLogo2} alt="homelogo2" style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <img src={HomeLogo3} alt="homelogo" style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <img src={HomeLogo4} alt="homelogo" style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <img src={HomeLogo5} alt="homelogo" style={{ width: '100%', height: '600px' }} />
                    </div>
                </Slider>
                {/* <Fade {...fadeProperties} >
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
                </Fade> */}
                <div style={{ display: 'flex', margin: '0px 30px' }}>
                    <div style={{
                        width: '50%', margin: 'auto', padding: '0 100px',
                        textAlign: 'initial'
                    }}>
                        <p style={{ fontSize: '19px', fontWeight: '500', margin: 0 }}>The world’s largest selection of courses</p>
                        <p style={{ fontSize: '16px', margin: 0 }}>Choose from over 100,000 online video courses with new additions published every month</p>
                    </div>
                    <div style={{ width: '50%' }}>

                        <Navbar >
                            <Nav style={{ fontWeight: 'bold' }}>
                                {categories1}
                            </Nav>
                        </Navbar>

                        <div className="homediv abc3" style={{ display: 'block', textAlign: 'left', zIndex: 9, height: '300px' }}>
                            <Slider style={{ width: '100%' }} {...settings2}>
                                {courseList2.map(x => x)}
                            </Slider>

                        </div>
                    </div>
                </div>
                <div >
                    <p style={{
                        margin: '0.5rem 30px',
                        textAlign: 'initial', fontSize: '19px', fontFamily: 'open sans, helvetica neue, Helvetica, Arial, sans- serif',
                        fontWeight: 400,
                        color: '#505763'

                    }}>Students are viewing</p>
                    <div style={{ margin: '0 25px' }} >
                        {/* <ScrollMenu style={{ display: 'block', width: '80%', textAlign: 'left', zIndex: 9, marginLeft: '15px' }}
                            // {this.props.token ? (parseInt(this.props.Role) === 2 ? courseList : "") : courseList1}
                            data={this.props.token ? (parseInt(this.props.Role) === 2 ? courseList : "") : courseList1}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}

                        /> */}

                        <Slider {...settings1}>
                            {this.props.token ?
                                (parseInt(this.props.Role) === 2 ? this.state.courseData.map(x => <div style={{ height: 100 }}>{this.renderMedia(x)}</div>) : "")
                                : this.state.courseData.map(x => <div style={{ height: 100 }}>{this.renderMedia(x)}</div>)}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        category: state.category.category,
        token: state.auth.token,
        rating: state.ratings.rate,
        course: state.course.course,
        courses: state.category.courses,
        getcourse: state.course.getCourseByCid,
        userId: state.auth.userId,
        getCart: state.cart.getCart,
        boughtCourse: state.cart.boughtCourse,
        Role: state.auth.Role,
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        category: bindActionCreators(catAction, dispatch),
        course: bindActionCreators(courseAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        rate: bindActionCreators(ratingAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);