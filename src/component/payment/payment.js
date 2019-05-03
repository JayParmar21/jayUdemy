import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';


import * as cartAction from '../../action/cartAction';
import * as courseAction from '../../action/CourseAction'

import path from '../../path'
import rupe from '../../Logo/rupee.png'
class Payment extends Component {

    btnCheckOut(carts, e) {
        e.preventDefault();
        if (this.props.token) {
            carts.map(cart => {
                return this.props.action.cart.buyCourse(parseInt(cart.key));

            })
        }
        else {
            this.openNotificationWithIcon('info', "Login for checkout");
        }
        this.props.toggle();
    }
    render() {
        let total = 0;
        let carts = [];
        if (this.props.getCart && this.props.getCart.length !== 0) {
            this.props.getCart.map((cart, i) => {
                total = total + cart.rupee
                return carts.push(<div key={cart.id}>
                    <div style={{ textAlign: 'center' }}><img src={path + 'thumbnail/' + cart.courseImage} style={{ width: "145px" }} alt="" /></div>
                    <div style={{ textAlign: 'center' }}><h4>{cart.coursename}</h4></div>
                </div>
                )
            })
        }
        let total1 = 0;
        let carts1 = [];
        if (this.props.getCart && this.props.getCart.length !== 0) {
            this.props.getCart.map((cart, i) => {
                total1 = total1 + cart.rupee
                return carts1.push(<tr key={cart.id}>
                    <td>{cart.categoryname}</td>
                    <td>{cart.subcategoryname}</td>
                    <td>{cart.rupee}</td>
                </tr>
                )
            })
        }

        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="loginmodel">
                    <ModalHeader toggle={this.props.toggle}>Payment</ModalHeader>
                    <ModalBody>
                        {carts}
                    </ModalBody>
                    <Table className="marginTop" striped>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th><img src={rupe} alt="category" className="rupesIcon" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts1}
                        </tbody>
                        <thead>
                            <tr>
                                <th>Total Amount</th>
                                <th></th>
                                <th>{total}</th>
                            </tr>
                        </thead>
                    </Table>
                    <ModalFooter>
                        <Button color="success" block onClick={this.btnCheckOut.bind(this, carts)} >Pay</Button>
                    </ModalFooter>

                </Modal>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);