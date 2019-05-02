import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as chapterAction from '../../action/chapterAction';


import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class AddChapter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chapterName: "",
            files: [],
            fieldsError: { chapterName: "", files: "" }
        }
    }

    btnCancel(e) {
        this.props.history.push('/myCourse');
    }

    documentUpdate = (fileItems) => {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file),
            fieldsError: { files: "" }
        });
    }

    checkMimeType = (data) => {
        let files = data;
        let err = '';
        const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4', 'application/pdf', 'text/plain']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n';
            }
        }
        if (err !== '') {
            this.setState({ files: [] })
            return false;

        }
        else {
            this.setState({
                fieldsError: {
                    files: ""
                }
            })
        }
        return true;
    }

    inputChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    btnCreateChapter(e) {
        e.preventDefault();
        const { match: { params } } = this.props;
        let fieldsError = { chapterName: "", files: "" };
        if (this.state.files.length === 0) {
            fieldsError = {
                files: "* Files Required"
            }
        }
        if (this.state.chapterName === "") {
            fieldsError = {
                chapterName: "* Name Required"
            }
        } else if (!this.state.chapterName.match(/^[a-zA-Z 0-9]+$/i)) {
            fieldsError = {
                chapterName: "* Invalid chapter name"
            }
        }
        if (!fieldsError.chapterName && !fieldsError.files) {
            const formData = new FormData();
            formData.append('chapterName', this.state.chapterName);
            formData.append('courseId', params.courseId);
            if (this.checkMimeType(this.state.files)) {
                for (var i = 0; i < this.state.files.length; i++) {
                    formData.append('files', this.state.files[i]);
                }
                this.props.action.chapter.addChapter(formData);
                this.props.history.push('/myCourse');
            }
            else {
                this.setState({
                    fieldsError: {
                        files: "* file not supported"
                    }
                })
            }
        } else {
            this.setState({
                fieldsError
            });
        }
    }

    render() {
        return (
            <Container style={{ marginTop: "30px", width: "40%", boxShadow: "4px 2px 4px 2px", color: "grey" }}>
                <h1>Add Chapter</h1>
                <Form >
                    <FormGroup>
                        <Label className="chphead">Chapter Name</Label>
                        <Input type="text" name="chapterName" placeholder="Chapter Name" onChange={this.inputChangeHandler.bind(this)} value={this.state.chapterName} />
                    </FormGroup>
                    <FormGroup className="chphead">
                        <FilePond
                            files={this.state.files}
                            allowMultiple={true}
                            onupdatefiles={(files) => this.documentUpdate(files)}
                            labelIdle='Upload the Document'
                        />
                        <span className="chperror">{this.state.fieldsError.files}</span>
                    </FormGroup>
                    <Button color="danger" onClick={this.btnCreateChapter.bind(this)}>Create Chapter</Button>{' '}
                    <Button color="secondary" outline onClick={this.btnCancel.bind(this)}>Cancel</Button>
                </Form>
                <br />
            </Container>
        )
    }

}
const mapDispatchToProps = (dispatch) => ({
    action: {
        chapter: bindActionCreators(chapterAction, dispatch),
    }
})
export default connect(null, mapDispatchToProps)(AddChapter);