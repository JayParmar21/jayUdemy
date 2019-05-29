import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, CardBody, Card, CardImg, Button } from 'reactstrap';
import { Icon, Collapse, notification, Rate } from 'antd'

import * as courseAction from '../../action/CourseAction'
import * as chapterAction from '../../action/chapterAction'
import * as cartAction from '../../action/cartAction'
import * as ratingAction from '../../action/ratingAction'

import ModalDocument from './ModalDocument'

import path from '../../path'
import '../../styling.css'
import '../../stylesh.css'
import 'antd/dist/antd.css';

import grey from '../../Logo/grey.jpg'
import ulogo from '../../Logo/udemylogo.png'
import rupe from '../../Logo/rupee.png'
import play from '../../Logo/play.png'

const Panel = Collapse.Panel;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    fontWeight: 'bold'
};
const boarder = {
    borderBottom: '30px'
}
class ExploreCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docModal: false,
            file: "",
            courseName: "",
            chapterName: "",
            imgwidth: "150px"
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e) {
        this.setState(prevState => ({
            docModal: !prevState.docModal
        }));
    }

    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };

    documentClick(filepath, courseName, chapterName, courseUser, e) {
        const { match: { params } } = this.props;
        let courseId = parseInt(params.courseId);
        let boughtCourseId = [];

        if (this.props.boughtCourse) {
            this.props.boughtCourse.map(boughtcourse => {
                return boughtCourseId.push(boughtcourse.courseId);
            })
        }
        if (parseInt(this.props.userId) === courseUser) {
            this.setState({
                file: filepath,
                courseName: courseName,
                chapterName: chapterName
            });
            this.toggleModal();
        }
        else if (boughtCourseId.includes(courseId)) {
            this.setState({
                file: filepath,
                courseName: courseName,
                chapterName: chapterName
            });
            this.toggleModal()
        }
        else {
            if (!this.props.token) {
                this.openNotificationWithIcon('info', "Please Login First");
            }
            else {
                this.openNotificationWithIcon('warning', "You haven't bought this course");
            }
        }
    }

    documentClick1(filepath, courseName, chapterName, courseUser, e) {
        const { match: { params } } = this.props;
        let courseId = parseInt(params.courseId);
        let boughtCourseId = [];

        if (this.props.boughtCourse) {
            this.props.boughtCourse.map(boughtcourse => {
                return boughtCourseId.push(boughtcourse.courseId);
            })
        }
        if (parseInt(this.props.userId) !== courseUser) {
            this.setState({
                file: filepath,
                courseName: courseName,
                chapterName: chapterName
            });
            this.toggleModal();
        }
        else if (!boughtCourseId.includes(courseId)) {
            this.setState({
                file: filepath,
                courseName: courseName,
                chapterName: chapterName
            });
            this.toggleModal()
        }
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.action.rate.getAllRate();
        this.props.action.course.getCourseByCourseID(params.courseId);
        this.props.action.chapter.getChapterByCourseId(params.courseId);

        if (this.props.token && this.props.userId) {
            this.props.action.cart.getBoughtCourseByUser(parseInt(this.props.userId));
            this.props.action.cart.getCartByUser(parseInt(this.props.userId));
        }
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
    setvideo(data, e) {
        let chapter2 = [];
        let chapter1 = this.props.chapter[0];
        if (chapter1) {
            chapter1.files.map((chp, i) => {
                let courseName = data.coursename;
                let chapterName = chp.chapterName;
                let courseUser = data.userId;
                return chapter2.push(
                    <p className="cursor" key={i}
                        onClick={this.documentClick1.bind(this, chp, courseName, chapterName, courseUser)}>
                        {chp.split('-')[0]}
                    </p>
                )
            })

        }
        this.documentClick1(chapter1.files[0], data.coursename, chapter1.chapterName, data.userId)
    }
    render() {
        let courses = "";
        if (this.props.course) {
            this.props.course.map(cdata => {
                return courses = cdata
            })
        }
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
            if (userId === courses.userId) {
                bought = true;
            }
            else if (boughtCourseId.includes(courses.id)) {
                bought = true;
            }
            else if (this.props.getCart && this.props.getCart.length !== 0) {
                this.props.getCart.map(cart => {
                    if (cart.courseId === courses.id) {
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
                if (cid[i] === courses.id) {
                    loginCart = false;
                }
            }
        }



        if (parseInt(courses.ratings) === 0) {
            courses.ratings = 3
        }
        let j = 0
        this.props.rating.map(rate => {
            if (rate.courseId === courses.courseId) {
                j = j + 1
            }
            return j
        })
        let chapter2 = [];
        let chapter1 = this.props.chapter[0];
        if (chapter1) {
            chapter1.files.map((chp, i) => {
                let courseName = courses.coursename;
                let chapterName = chp.chapterName;
                let courseUser = courses.userId;
                return chapter2.push(
                    <p className="cursor" key={i}
                        onClick={this.documentClick1.bind(this, chp, courseName, chapterName, courseUser)}>
                        {chp.split('-')[0]}
                    </p>
                )
            })
        }
        let chapters = [];
        let totalLecture = 0;
        if (this.props.chapter) {
            this.props.chapter.map(chp => {
                totalLecture = totalLecture + chp.files.length;
                return chapters.push(
                    <Collapse key={chp.id} accordion
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />} >
                        <Panel header={chp.chapterName + "  (" + chp.files.length + " Lectures)"} style={{ customPanelStyle, boarder }}>
                            {chp.files.map((file, i) => {
                                let courseName = courses.coursename;
                                let chapterName = chp.chapterName;
                                let courseUser = courses.userId;
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
            < div >
                <ModalDocument isOpen={this.state.docModal} toggle={this.toggleModal.bind(this)} chapterName={this.state.chapterName} courseName={this.state.courseName} file={this.state.file} />
                <div>
                    <div style={{ width: '100%', marginLeft: '0px', height: '520px' }}>
                        <div>
                            <figure style={{ height: '50%', margin: '0 0' }}><img src={grey}
                                style={{
                                    display: 'block',
                                    width: '100%', height: '520px',
                                    backgroundRepeat: "no-repeat", backgroundAttachment: "fixed",
                                }}
                                alt="Home"></img>
                            </figure>
                            <div className="overtexture" style={{ marginLeft: '-212px' }}>
                                <p style={{ fontSize: '36px' }}>{courses.coursename}</p>
                                <p style={{ fontSize: '21px', fontFamily: 'open sans,helvetica neue,Helvetica,Arial,sans-serif' }}>{courses.description}</p>

                            </div>

                            <div style={{ margin: '319px 135px 16px 1038px' }}>
                                <img src={play} alt="category" style={{
                                    height: '90px', width: '100px', position: 'relative',
                                    top: "140px",
                                    zIndex: "1"
                                }} className="btn-social" onClick={this.setvideo.bind(this, courses)}/>
                                <div style={{
                                    position: 'relative', position: "relative",
                                    bottom: "-134px",
                                    zIndex: '1',color: "azure"}}>Preview this Course</div>
                                <Card >
                                    <CardImg className='carImag' top src={path + courses.courseImage} alt="Card image cap" onClick={this.setvideo.bind(this, courses)} />
                                    <CardBody style={{ height: "50%", padding: '0rem' }}>
                                        <div >
                                            <div style={{ textAlign: 'initial', margin: '18px 0px 0px 12px' }}>
                                                <img src={rupe} alt="category" className="rupesIcon1" />

                                            </div>
                                            <div style={{ margin: '-38px 28px 0px -56px ', }}>
                                                <h2 style={{ fontSize: '2.31rem' }}><b>{courses.rupee}</b></h2>
                                            </div>
                                        </div>
                                        {bought ? "" :
                                            ((addedToCart && loginCart) ?
                                                <Button color="danger" style={{ width: '215px', margin: '8px 0px 18px 0px' }} onClick={this.btnAddToCart.bind(this, courses.id)} >Add To Cart</Button>
                                                : <Button color="info" style={{ width: '215px', margin: '8px 0px 18px 0px' }} onClick={this.btnGoCart.bind(this)} >Go to Cart</Button>)
                                        }
                                    </CardBody>
                                </Card>
                            </div>
                            <div style={{ margin: '-145px 1104px 146px -65px', color: 'white' }}>
                                <Rate value={courses.ratings} disabled className="anticon" style={{ margin: '22px 0px 0px 13px' }} />
                                <div style={{ margin: '-28px 0px 0px 161px', fontSize: '1.2rem' }}>({j})</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
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
                <div style={{ textAlign: 'initial', marginTop: '255px' }}>
                    <div style={{ color: '#686f7a', borderTop: '1px solid lightgray' }}>
                        <img src={ulogo} alt="ulogo" style={{ height: '70px', width: '120px', margin: ' 0 31.5% 0 0' }}></img>
                        Copyright © 2019 Udemy, Inc</div>
                </div>
                <div className="shadecolor1">
                </div>
            </div >

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
        boughtCourse: state.cart.boughtCourse,
        getCart: state.cart.getCart,
        getcourse: state.course.getCourseByCid,
        rating: state.ratings.rate,
        Role: state.auth.Role,
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        course: bindActionCreators(courseAction, dispatch),
        chapter: bindActionCreators(chapterAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        rate: bindActionCreators(ratingAction, dispatch),
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ExploreCourse);