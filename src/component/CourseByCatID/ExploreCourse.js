import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button, Container } from 'reactstrap';
import { Icon, Collapse } from 'antd'

import * as courseAction from '../../action/CourseAction'
import * as chapterAction from '../../action/chapterAction'

import ModalDocument from './ModalDocument'

import path from '../../path'
import '../../styling.css'
import 'antd/dist/antd.css';
const Panel = Collapse.Panel;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    fontWeight: 'bold'
};
class ExploreCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docModal: false,
            file: "",
            courseName: "",
            chapterName: ""
        };
        //this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e) {
        this.setState(prevState => ({
            docModal: !prevState.docModal
        }));
    }

    documentClick(filepath, courseName, chapterName, courseUser, e) {
        const { match: { params } } = this.props;
        let courseId = parseInt(params.courseId);
        let boughtCourseId = [];

        // if (this.props.boughtCourse) {
        //     this.props.boughtCourse.map(boughtcourse => {
        //         return boughtCourseId.push(boughtcourse.courseId);
        //     })
        // }
        if (parseInt(this.props.userId) === courseUser) {
            this.setState({
                file: filepath,
                courseName: courseName,
                chapterName: chapterName
            });
            this.toggleModal();
        }
        // else if (boughtCourseId.includes(courseId)) {
        //     this.setState({
        //         file: filepath,
        //         courseName: courseName,
        //         chapterName: chapterName
        //     });
        //     this.toggleModal()
        // }
        // else {
        //     if (!this.props.token) {
        //         this.openNotificationWithIcon('info', "Please Login First");
        //     }
        //     else {
        //         this.openNotificationWithIcon('warning', "You haven't bought this course");
        //     }
        // }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.action.course.getCourseByCourseID(params.courseId);
        this.props.action.chapter.getChapterByCourseId(params.courseId);
    }


    render() {

        let course = "";
        if (this.props.course) {
            this.props.course.map(cdata => {
                return course = cdata
            })
        }

        let chapters = [];
        let totalLecture = 0;
        if (this.props.chapter) {
            this.props.chapter.map(chp => {
                totalLecture = totalLecture + chp.files.length;
                return chapters.push(
                    <Collapse key={chp.id} accordion
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                        <Panel header={chp.chapterName + "  (" + chp.files.length + " Lectures)"} style={customPanelStyle} >
                            {chp.files.map((file, i) => {
                                let courseName = course.coursename;
                                let chapterName = chp.chapterName;
                                let courseUser = course.userId;
                                return (<p className="cursor" key={i}
                                    onClick={this.documentClick.bind(this, file, courseName, chapterName, courseUser)}>
                                    {file.split('-')[0]}
                                </p>)
                            })}
                        </Panel>
                    </Collapse>

                )
            })
        }



        return (
            <div>
                <ModalDocument isOpen={this.state.docModal} toggle={this.toggleModal.bind(this)} chapterName={this.state.chapterName} courseName={this.state.courseName} file={this.state.file} />
                <div key={course.id} className="hrelative">
                    <div class="bg-image">
                        <img src={path + course.courseImage}
                            style={{
                                display: 'block',
                                width: '100%', height: '520px',
                                backgroundRepeat: "no-repeat", backgroundAttachment: "fixed",
                            }}
                            alt="Home"></img>
                    </div>
                    <div className="homediv" style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                        <h1 className="col">{course.coursename}</h1>
                        <h3 className="col">{course.description}</h3>
                    </div>
                    <div className="courseContent">
                        <h4><b>Course Content</b></h4>
                        <h5 className="lect"> {totalLecture} Lectures</h5>
                    </div>
                    {this.props.error_msg ?
                        <h3>Not yet added</h3> :
                        <Container style={{ width: "500px", marginTop: "20px", marginLeft: "100px", float: "left" }}>
                            {chapters}
                        </Container>
                    }
                </div>


            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        error_msg: state.chapter.error_msg,
        course: state.course.getCourseByCid,
        chapter: state.chapter.chapter,
        userId: state.auth.userId,
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        chapter: bindActionCreators(chapterAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ExploreCourse);