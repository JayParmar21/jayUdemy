import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import path from '../../path';
import '../../styling.css';

class ModalDocument extends Component {

    render() {
        let showDocument = "";
        let extn = this.props.file.split('.')[1];
        if (extn === 'mp4') {
            showDocument = (<video className="docstyle" controls>
                <source src={path + 'document/' + this.props.file} type="video/mp4" />
            </video>
            )
        }
        if (extn === 'jpg' || extn === 'jpeg' || extn === 'png') {
            showDocument = (<img src={path + 'document/' + this.props.file} alt="Document" className="docstyle" />)
        }
        if (extn === 'pdf' || extn === 'txt') {
            showDocument = (
                <iframe title="abc" src={path + 'document/' + this.props.file} className="frame" ></iframe>
            )
        }
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>{this.props.courseName} : {this.props.chapterName}</ModalHeader>
                <ModalBody>
                    <center>{showDocument}</center>
                </ModalBody>
            </Modal>
        )
    }
}
export default ModalDocument;