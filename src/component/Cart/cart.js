import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Table, Button } from 'reactstrap';
import { notification } from 'antd';

import * as cartAction from '../../action/cartAction';
import * as courseAction from '../../action/CourseAction';
import path from '../../path';
import 'antd/dist/antd.css';
import '../../styling.css';
import { stat } from 'fs';

class Cart extends Component {
    state = {
        deleteCart: false
    }

    btnRemoveCourse(cartId, e) {
        e.preventDefault();
        this.props.action.cart.removeFromCart(cartId);
    }
    btnRemove(cartId, e) {
        e.preventDefault();
        this.props.action.cart.removeFromCart(cartId);
    }
    componentDidMount() {
        if (this.props.token) {
            let cid = [];
            if (localStorage.getItem("cart")) {
                let courses = JSON.parse(localStorage.getItem("cart"));
                courses.map(c => {
                    return cid.push(c.courseId)

                });
                for (let i = 0; i < cid.length; i++) {
                    let data = {
                        userId: parseInt(this.props.userId),
                        courseId: cid[i]
                    }
                    this.props.action.cart.addToCart(data);
                }
                localStorage.removeItem("cart");
            }
        }

        this.props.action.course.getCourse();
        if (this.props.userId) {
            this.props.action.cart.getCartByUser(this.props.userId);
        }
    }

    btnCheckOut(carts, e) {
        if (this.props.token) {
            carts.map(cart => {
                return this.props.action.cart.buyCourse(parseInt(cart.key));
            })
        }
        else {
            this.openNotificationWithIcon('info', "Login for checkout");
        }
    }
    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };

    btnKeepShopping(e) {
        //console.log(this.props.Role)
        if (this.props.role === 1) {
            this.props.history.push('/courseList');
        }
        this.props.history.push('/');
    }

    btnExplore(courseId, e) {
        this.props.history.push({
            pathname: '/exploreCourse/' + courseId
        })
    }

    render() {

        let carts = [];
        if (this.props.token) {
            if (this.props.getCart && this.props.getCart.length !== 0) {
                this.props.getCart.map((cart, i) => {
                    return carts.push(<tr key={cart.id}>
                        <td><img src={path + 'thumbnail/' + cart.courseImage} alt="" /></td>
                        <td>{cart.coursename}</td>
                        <td>{cart.categoryname}</td>
                        <td>{cart.subcategoryname}</td>
                        <td>
                            <Button outline color="danger" onClick={this.btnRemove.bind(this, cart.id)}>Remove</Button>{' '}
                            <Button outline onClick={this.btnExplore.bind(this, cart.courseId)}>Explore</Button>{' '}
                        </td>
                    </tr>
                    )
                })
            }
            else {
                carts.push(<tr key="1">
                    <td colSpan="5">Your Cart is Empty!!! <br /><br /><Button color="danger" onClick={this.btnKeepShopping.bind(this)}>Keep Shopping</Button></td>
                </tr>)
            }
        }
        else {
            if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length !== 0) {
                let cartData = [];
                let localcarts = JSON.parse(localStorage.getItem("cart"));
                localcarts.map(c => {
                    return cartData.push(c.courseId);
                })
                if (this.props.course && this.props.course.length !== 0) {
                    this.props.course.map((course, i) => {
                        if (cartData.includes(course.id))
                            return carts.push(<tr key={course.id}>
                                <td><img src={path + 'thumbnail/' + course.courseImage} alt="" /></td>
                                <td>{course.coursename}</td>
                                <td>{course.categoryname}</td>
                                <td>{course.subcategoryname}</td>
                                <td>
                                    <Button outline color="danger" onClick={this.btnRemoveCourse.bind(this, course.id)}>Remove</Button>{' '}
                                    <Button outline onClick={this.btnExplore.bind(this, course.id)}>Explore</Button>
                                </td>
                            </tr>
                            )
                        return null
                    })
                }
            }
            else {
                carts.push(<tr key="1">
                    <td colSpan="5">Your Cart is Empty!!! <br /><br /><Button color="danger" onClick={this.btnKeepShopping.bind(this)}>Keep Shopping</Button></td>
                </tr>)
            }
        }
        return (
            <Container className="marginTop">
                <h4>Cart</h4>
                <Table className="marginTop" striped>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Course</th>
                            <th>Category</th>
                            <th>SubCategory</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts}
                    </tbody>
                </Table>
                {(this.props.getCart.length !== 0) ?
                    <div>
                        <Button color="primary" className="buttons" outline onClick={this.btnCheckOut.bind(this, carts)}>Proceed To CheckOut</Button>
                        <Button color="primary" className="buttons" onClick={this.btnKeepShopping.bind(this)} outline>Keep Shopping</Button>
                    </div>
                    : null}
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        getCart: state.cart.getCart,
        course: state.course.course,
        token: state.auth.token,
        Role: state.auth.Role
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        cart: bindActionCreators(cartAction, dispatch),
        course: bindActionCreators(courseAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);