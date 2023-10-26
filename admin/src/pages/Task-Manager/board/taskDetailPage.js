import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
const TaskDetailPage = ({ modal, editData, closeModal }) => {
    console.log(editData, 'dataaaaaaaaaa');

    return (
        <>
            <Modal show={modal} onHide={closeModal} size={'lg'}>
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Task Detail
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={closeModal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal.Body>
                    <Row>
                        <Col lg={8}>
                            <Card className="p-2">
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Project Name :</h4>
                                    <p className="ms-2 p-0">{editData?.projectInfo?.projectName}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Milestone Name :</h4>
                                    <p className="ms-2 p-0">{editData?.milestoneInfo?.title}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Sprint Name :</h4>
                                    <p className="ms-2 p-0">{editData?.sprintInfo?.sprintName}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Summary :</h4>
                                    <p className="ms-2 p-0">{editData?.summary}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0"> Description :</h4>
                                    <p className="ms-2 p-0">{editData?.description}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0"> Start Date :</h4>
                                    <p className="ms-2 p-0">{editData?.startDate}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0"> End Date :</h4>
                                    <p className="ms-2 p-0">{editData?.dueDate}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0"> Assignee :</h4>
                                    <p className="ms-2 p-0">{editData?.assignees?.assigneeInfo?.userName}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Reporter :</h4>
                                    <p className="ms-2 p-0">{editData?.assignees?.reporterInfo?.role}</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Priority :</h4>
                                    <p className="ms-2 p-0">
                                    {editData?.priority == 1
                                            ? 'High'
                                            : '' || editData?.priority == 2
                                            ? 'Medium'
                                            : '' || editData?.priority == 3
                                            ? 'Low'
                                            : '' }</p>
                                </div>
                                <div className=" d-flex">
                                    <h4 className="m-0 p-0">Status :</h4>
                                    <p className="ms-2 p-0">
                                        {editData?.status == 1
                                            ? 'To-Do'
                                            : '' || editData?.status == 2
                                            ? 'In-Progress'
                                            : '' || editData?.status == 3
                                            ? 'Hold'
                                            : '' || editData?.status == 4
                                            ? 'Done'
                                            : ''}
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TaskDetailPage;
