import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Container, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload';

import * as catAction from '../../action/categoryAction';
import * as subcatAction from '../../action/subcategoryAction'
import * as courseAction from '../../action/CourseAction'
//import defaultimg from '../../Logo/defaultCourseImage.png'

import path from '../../path.js'

import deleteIcon from '../../Logo/delete.png'
class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursename: "",
            description: "",
            catId: 0,
            subcatId: 0,
            fieldsErrors: { coursename: '', description: '', catMsg: "", subcatMsg: "" },
            fieldsValid: { coursename: false, description: false },
            formValid: false,
            catValid: false,
            subcatValid: false,
            edit: false,
            courseId: 0,
            editData: { coursename: "", description: "", catId: 0, subcatId: 0, courseImage: "" },
            courseImage: [],
            showimage: false,
            displayImage: ""
        }
        this.onImageUpload = this.onImageUpload.bind(this);
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'coursename':
                fieldValidation.coursename = value.match(/^[a-zA-Z- ,&0-9+]+$/i);
                fieldValidationErrors.coursename = fieldValidation.coursename ? '' : ' Invalid coursename'
                break;
            case 'description':
                fieldValidation.description = value.match(/^[a-zA-Z- ,&0-9+]+$/i);
                fieldValidationErrors.description = fieldValidation.description ? '' : ' Invalid description'
                break;
            default:
                break;
        }
        this.setState({
            fieldsErrors: { ...this.state.fieldsErrors, fieldValidationErrors },
            fieldsValid: fieldValidation,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldsValid.coursename &&
                this.state.fieldsValid.description
        });
    }
    componentWillReceiveProps(nextProps, prevProps) {
        const { match: { params } } = this.props;
        const { subcategory } = nextProps;

        if (this.state.catChanged)
            this.setState({ editData: { ...this.state.editData, catId: subcategory[0].catId }, catChanged: false });
        else if (nextProps !== prevProps) {
            let courses = nextProps.getcourse;
            if (params.courseId !== undefined) {
                if (courses.length === 1 && (subcategory.length === 0 || subcategory[0].catId !== courses[0].catId)) {
                    this.props.action.subcategory.getSubCategory(courses[0].catId);
                    this.setState({
                        editData: {
                            coursename: courses[0].coursename,
                            description: courses[0].description,
                            catId: parseInt(courses[0].catId),
                            subcatId: parseInt(courses[0].subcatId)
                        },
                        courseImage: courses[0].courseImage,
                        displayImage: "",
                        showimage: true,
                        edit: true,
                        courseId: parseInt(params.courseId),
                        dispSubCat: true,
                    })
                }
            }
        }
    }
    componentDidMount() {
        this.props.action.category.getCategory();
        const { match: { params } } = this.props;
        if (params.courseId !== undefined) {
            this.props.action.course.getCourseByCourseID(params.courseId);

        }
    }

    inputHandler(e) {
        //console.log(e.target.value)
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    cancelImageClick(e) {
        e.preventDefault();
        this.setState({
            showimage: false,
            displayImage: ""
        })
    }

    categoryHandler(e) {
        this.setState({
            editData: { ...this.state.editData, catId: e.target.value },
            catId: e.target.value,
            catValid: true,
            dispSubCat: true,
            catChanged: true,
        })

        this.props.action.subcategory.getSubCategory(e.target.value)
    }

    onImageUpload(image) {
        var reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onloadend = (e) => {
            this.setState({
                courseImage: image,
                showimage: true,
                displayImage: reader.result
            })
        };
    }

    subcategoryHandler(e) {
        this.setState({
            editData: { ...this.state.editData, subcatId: e.target.value },
            subcatId: e.target.value,
            subcatValid: true
        })
    }

    btnEdit(e) {
        let coursename = this.state.coursename;
        let description = this.state.description;
        let catId = this.state.catId;
        let subcatId = this.state.subcatId;
        if (this.state.coursename === "") {
            coursename = this.state.editData.coursename
        }
        if (this.state.description === "") {
            description = this.state.editData.description
        }
        if (this.state.catId === 0) {
            catId = this.state.editData.catId
        }
        if (this.state.subcatId === 0) {
            subcatId = this.state.editData.subcatId
        }

        let formdata = new FormData();
        formdata.append('coursename', coursename);
        formdata.append('description', description);
        formdata.append('catId', parseInt(catId));
        formdata.append('subcatId', parseInt(subcatId));
        if (this.state.showimage === false && this.state.displayImage === "") {
            formdata.append("courseImage", "defaultCourseImage.png");
        }
        else if (this.state.displayImage) {
            formdata.append('courseImage', this.state.courseImage[0]);
        }
        let courseId = parseInt(this.state.courseId);
        this.props.action.course.editCourse(courseId, formdata);
        this.props.history.push('/myCourse');
    }

    btnAdd(e) {
        e.preventDefault();
        if (this.state.subcatId === 0)
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    subcatMsg: "* Select Sub-Category "
                }
            })
        if (this.state.catId === 0)
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    catMsg: "* Select Category "
                }
            })
        if (this.state.description === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    description: "* Description Required"
                }
            })
        if (this.state.coursename === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    coursename: "* Course Name Required"
                }
            })
        let formdata = new FormData();
        formdata.append('coursename', this.state.coursename);
        formdata.append('description', this.state.description);
        formdata.append('catId', this.state.catId);
        formdata.append('subcatId', this.state.subcatId);
        formdata.append('userId', parseInt(localStorage.getItem("userId")));
        if (this.state.courseImage && this.state.showimage) {
            formdata.append('courseImage', this.state.courseImage[0]);
        }
        console.log(localStorage.getItem("userId"))
        console.log(this.state.courseImage[0])
        if (this.state.formValid && this.state.catValid && this.state.subcatValid) {
            this.props.action.course.addCourse(formdata);
            this.props.history.push('/courseList');
        }
    }

    btnCancel(e) {
        this.props.history.push('/myCourse');
    }

    render() {
        let categories = ""
        let subcategories = ""
        if (this.props.category) {
            categories = this.props.category.map(cat => {
                return <option key={cat.id} value={cat.id} >{cat.name}</option>
            })
        }
        if (this.props.subcategory && this.state.dispSubCat) {
            subcategories = this.props.subcategory.map(subcat => {
                return <option key={subcat.id} value={subcat.id} >{subcat.name}</option>
            })
        }
        console.log(this.props.getcourse.getCourseByCid)
        return (
            <div>
                <Container style={{ marginTop: "30px", width: "40%", boxShadow: "4px 2px 4px 2px", color: "grey", marginBottom: "30px", boxShadow: "0 0 5px 5px" }}>
                    {!this.state.edit ? <h1>Add Course</h1> : <h1>Edit Course</h1>}
                    <Form >
                        <FormGroup>
                            <Label className="chphead">Course Title</Label>
                            <Input type="text" name="coursename" id="coursename" placeholder="Title" defaultValue={this.state.editData.coursename} onChange={this.inputHandler.bind(this)} />
                            <span className="chperror">{this.state.fieldsErrors.coursename}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label className="chphead">Course description</Label>
                            <Input type="text" name="description" id="description" placeholder="Description" defaultValue={this.state.editData.description} onChange={this.inputHandler.bind(this)} />
                            <span className="chperror">{this.state.fieldsErrors.description}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Category" className="chphead">Category</Label>
                            <Input type="select" name="Category" id="Category" onChange={this.categoryHandler.bind(this)} value={this.state.editData.catId}>
                                <option className="dddisplay">Select Category</option>
                                {categories}
                            </Input>
                            {!this.state.catValid ? <span className="chperror">{this.state.fieldsErrors.catMsg}</span> : ""}
                        </FormGroup>
                        <FormGroup>
                            <Label for="SubCategory" className="chphead">SubCategory</Label>
                            <Input type="select" name="subcatId" id="SubCategory" onChange={this.subcategoryHandler.bind(this)} value={this.state.editData.subcatId}>
                                <option className="dddisplay">Select SubCategory</option>
                                {subcategories}
                            </Input>
                            {!this.state.subcatValid ? <span className="chperror">{this.state.fieldsErrors.subcatMsg}</span> : ""}
                        </FormGroup>
                        <FormGroup>
                            <Label className="chphead">Upload Image</Label>
                            {(this.state.showimage && this.state.courseImage !== "defaultimg.png") ?
                                (this.state.editData.length > 0 || this.state.displayImage === "") ?
                                    (<div align="center">
                                        <img src={path + "thumbnail/" + this.state.courseImage} alt="" className="courseimg" />
                                        <img src={deleteIcon} onClick={this.cancelImageClick.bind(this)}
                                            className="courseimgdelete"
                                            alt="" />
                                    </div>) :
                                    (<div align="center">
                                        <img src={this.state.displayImage} alt="" className="courseimg" />
                                        <img src={deleteIcon} onClick={this.cancelImageClick.bind(this)}
                                            className="courseimgdelete"
                                            alt="" />
                                    </div>) : (<ImageUploader
                                        withIcon={true}
                                        ref="file"
                                        buttonText="Select Course Images"
                                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                                        onChange={this.onImageUpload.bind(this)}
                                        maxFileSize={5242880}
                                        withLabel={false}
                                        singleImage={true}
                                        accept={"image/*"} />)}
                        </FormGroup>
                        {!this.state.edit ?
                            <Button color="danger" onClick={this.btnAdd.bind(this)}>Create Course</Button>
                            :
                            <Button color="danger" onClick={this.btnEdit.bind(this)}>Edit Course</Button>
                        }{' '}
                        <Button color="secondary" outline onClick={this.btnCancel.bind(this)}>Cancel</Button>
                    </Form>
                    <br />
                </Container>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        category: state.category.category,
        subcategory: state.subcategory.subcategory,
        getcourse: state.course.getCourseByCid

    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        category: bindActionCreators(catAction, dispatch),
        subcategory: bindActionCreators(subcatAction, dispatch),
        course: bindActionCreators(courseAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);