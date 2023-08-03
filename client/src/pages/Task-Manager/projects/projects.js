import React, { useState } from 'react';
import { Row, Button, Col, Form, Card, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Create  from './modal/create';
import Update from './modal/update';
const Projects = () => {
    const [openModal, setOpenModal] = useState(false);
    const [deletemodal,setDeleteModal] = useState(false);
    const handeldelete=()=>{
        setDeleteModal(true)
    }
    const handelCreate = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <div>
                <Card>
                    <Card.Body>
                        <div className="row mx-auto">
                            <div className="col-6 d-flex align-items-end justify-content-end">
                                <h4 className="header-title heading_data"> Projects</h4>
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-end pe-0">
                                <Button className="web_button" variant="info" onClick={handelCreate}>
                                    Add Projects
                                </Button>
                            </div>
                        </div>

                        <Table className="mb-0 add_Color_font" striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Project Name</th>
                                    <th>Client Name</th>
                                    <th>Project Type</th>
                                    <th>Project Start Date</th>
                                    <th>Project End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-middle">
                                    <th scope="row"> 1</th>
                                    <td className="cp">
                                        <span className="namelink"> Shivam </span>
                                    </td>
                                    <td className="w-20">
                                        <span className="namelink"> Neha</span>
                                    </td>
                                    <td>
                                        <span className="namelink"> Fixed Type</span>
                                    </td>
                                    <td>
                                        <span className="namelink"> 2-04-2023</span>
                                    </td>
                                    <td>
                                        <span className="namelink"> 2-06-2023</span>
                                    </td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <p className="action-icon m-0 p-0 ">
                                                    <i className="mdi mdi-eye m-0 p-0"></i>
                                                </p>
                                                <p className="action-icon m-0 p-0  ">
                                                    <i className="uil-edit-alt m-0 p-0"></i>
                                                </p>
                                                <p className="action-icon m-0 p-0  ">
                                                    <i className="mdi mdi-delete m-0 p-0" onClick={handeldelete}></i>
                                                </p>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Create modal={openModal} closeModal={closeModal} />
                <Update  />
                <Modal show={deletemodal} onHide={() => setDeleteModal(false)}>
                <Modal.Body>
                    Are you sure you want to delete this project
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setDeleteModal(false);
                        }}>
                        No
                    </Button>
                    <Button className=" web_button " variant="primary" >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    );
};

export default Projects;
