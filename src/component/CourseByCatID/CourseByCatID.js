import React, { Component } from "react";
import { Card, Row, Col, Container, CardBody, CardTitle, Button, CardImg, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { bindActionCreators } from "redux";

import * as courseAction from "../../action/CourseAction"
import * as cartAction from '../../action/cartAction'
import path from '../../path'
import '../../styling.css'

class CourseByCID extends Component {

    componentDidMount(){
        //this.props.action.course.getCourse();
        if (this.props.token && this.props.userId) {
           // this.props.action.cart.getCartByUser(parseInt(this.props.userId))
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
        }
    }
    btnAddChapter(courseId, e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/addChapter/' + courseId
        })
    }
    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }
    btnAddToCart(courseId, e) {
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
    renderMedia(course) {
        debugger
        let addedToCart = true;
        let loginCart = true;
        let bought = false;
        let boughtCourseId = [];
        let userId = parseInt(this.props.userId);
        console.log(this.props.boughtCourse)
        if (this.props.token) {
            debugger
            if (this.props.boughtCourse && this.props.boughtCourse.length !== 0) {
                this.props.boughtCourse.map(boughtcourse => {
                    return boughtCourseId.push(boughtcourse.courseId);
                })
            }
            if (userId === this.props.boughtCourse.userId) {
                debugger
                bought = true;
            }
            else if (boughtCourseId.includes(course.id)) {
                bought = true ;
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
        return (
            <div key={course.id} className="abc1">
                <Card>
                    <CardImg top src={path + course.courseImage} alt="Card image cap" />
                    <CardBody>
                        <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                        <CardText>{course.description}</CardText>
                        <Button outline color="info" outline onClick={this.btnExplore.bind(this, course.id)} style={{ marginLeft: '-10px' }} >Learn More</Button>
                        {bought ? "" :
                            ((addedToCart && loginCart) ?
                                <Button outline onClick={this.btnAddToCart.bind(this, course.id)} style={{ marginRight: '-10px', marginLeft: '10px' }}>Add To Cart</Button>
                                : <Button outline onClick={this.btnGoCart.bind(this)} style={{ marginRight: '-10px', marginLeft: '10px' }}>Go to Cart</Button>)
                        }
                    </CardBody>
                </Card>

            </div>
        )
    }

    render() {
        console.log(this.props.token)
        console.log(this.props.Role)
        console.log(this.props.userId)
        let courseList = [];
        let category = "";
        if (this.props.courses) {
            courseList = this.props.courses.map(course => {
                category = course.category;
                return (
                    <div key={course.id} className="abc1">
                        <Card>
                            <CardImg top src={path + course.courseImage} alt="Card image cap" />
                            <CardBody>
                                <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" onClick={this.btnAddChapter.bind(this, course.id)}>Add Chapter</Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }

        let courseList1 = []
        console.log(this.props.courses)
        if (this.props.courses) {
            courseList1 = this.props.courses.map(course => {
                return courseList1.push(this.renderMedia(course))
            })
        }

        let courseList2 = []
        if (this.props.courses) {
            courseList2 = this.props.courses.map(course => {
                return (
                    <div key={course.id} className="abc1">
                        <Card>
                            <CardImg top src={path + course.courseImage} alt="Card image cap" />
                            <CardBody>
                                <CardTitle style={{ marginTop: '-20px' }}><h2>{course.coursename}</h2></CardTitle>
                                <CardText>{course.description}</CardText>
                                <Button outline color="info" onClick={this.btnExplore.bind(this, course.id)}>Learn More</Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        return (
            <div>
                <Container className="cnt">
                    <div style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                        {this.props.token ? (this.props.Role == 1 ? courseList : courseList1): courseList2}
                    </div>
                </Container>
            </div>

        )
    }

}
const mapStateToProps = state => {
    return {
        error_msg: state.category.error_msg,
        courses: state.category.courses,
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseByCID);