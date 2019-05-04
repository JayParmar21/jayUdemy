import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Table } from 'reactstrap'


import * as cartAction from '../../action/cartAction'
class User extends Component {

    componentDidMount() {
        this.props.action.cart.getCartAllUser();
    }
    render() {
        let alluser = [];
        let data = []
        if (this.props.token) {
            if (this.props.users && this.props.users.length !== 0) {
                this.props.users.map((user, i) => {
                    if (!data.includes(user.userId)) {
                        data.push(user.userId)
                        return alluser.push(
                            <tr key={user.id}>
                                <td>{user.userId}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.coursename}</td>
                            </tr>
                        )
                    } else {
                        return alluser.push(
                            <td>{user.coursename}</td>
                        )
                    }
                })
            }
        }
        return (
            <div>
                <Container className="marginTop">
                    <h4>Users</h4>
                    <Table className="marginTop" striped>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Buying Courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alluser}
                        </tbody>
                    </Table>

                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.cart.alluser,
        token: state.auth.token,
        Role: state.auth.Role
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        cart: bindActionCreators(cartAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User);