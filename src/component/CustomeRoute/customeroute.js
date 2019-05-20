import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CRoute extends Component {
    getExtractedJson({ component, cprivate, crole, actions, auth, ...rest }) {
        return rest;
    }
    render() {
        const rest = this.getExtractedJson(this.props);
        const isUserLoggedIn = this.props.auth.token ? this.props.auth.token !== "" : false;
        const userCurrentRole = parseInt(this.props.auth.Role);
        const { component } = this.props;
        const Component = component;
        let redirectTo = undefined;
        if (!isUserLoggedIn && rest.path === "/myCourse") {
            redirectTo = "/"
        }
        else if (!isUserLoggedIn && rest.path === "/courseList") {
            redirectTo = "/"
        }
        else if (!isUserLoggedIn && rest.path.includes("/addCourse")) {
            redirectTo = "/"
        }
        else if (!isUserLoggedIn && rest.path === "/boughtCourse") {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path.includes("/addCourse") && userCurrentRole !== 1) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/myCourse" && userCurrentRole !== 1) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/courseList" && userCurrentRole !== 1) {
            redirectTo = "/"
        }
        return (
            <Route
                {...rest}
                render={props => (
                    (redirectTo)
                        ? <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
                        : <Component {...props} />
                )}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth
    }
};

export default connect(mapStateToProps, null)(CRoute)
