import React, { Component } from "react";
import { Card, Row, Col, Container, CardBody, CardTitle, Button, CardImg, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';


import path from '../../path'
import '../../styling.css'

class CourseByCID extends Component {

    render() {

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
                                <Button outline color="info" >Add Chapter</Button>
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
                        {courseList}
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
    }
}

export default connect(mapStateToProps, null)(CourseByCID);