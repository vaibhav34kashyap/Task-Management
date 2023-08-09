import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, CloseButton, Card } from 'react-bootstrap';
const Create = ({ modal, CloseModal }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        //   let body={
        //     milestone_id: id ,
        //     sprintName:data?.Name,
        //     sprintDesc:data?.Description,
        //     startDate:data?.Startdate,
        //     endDate:data?.Enddate,
        //     sprintStatus:data?.Status
        //   }
        //   dispatch( addSprint(body))
    };
    const handleClose = () => {
        CloseModal();
    };

    return (
        <>
            <Modal show={modal} onHide={handleClose} size="lg">
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Add Task
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={handleClose} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal.Body className="py-0">
                    <Card className="p-2">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Task Name <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('Name', { required: true })} />
                                                {errors.Name?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Status<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Select {...register('Name', { required: true })}>
                                                <option >---Select---</option>
                                                    <option value="1">To Do</option>
                                                    <option value="2">In Progress</option>
                                                    <option value="3">Done</option>
                                                    {errors.Name?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    Description <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register('Description', { required: true })}
                                                />{' '}
                                                {errors.Description?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Summary <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register('summary', { required: true })}
                                                />{' '}
                                                {errors.summary?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Module<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('module', { required: true })} />{' '}
                                                {errors.module?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Estimate Date <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    {...register('estimatedate', { required: true })}
                                                />{' '}
                                                {errors.estimatedate?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Actual Time <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    {...register('actualtime', { required: true })}
                                                />{' '}
                                                {errors.actualtime?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Due Date<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    {...register('dueDate', { required: true })}
                                                />{' '}
                                                {errors.dueDate?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-start d-flex align-items-center justify-content-center">
                                    <Button
                                        variant="info"
                                        type="submit"
                                        className="btn btn-sm  text-white pt-1 pb-1 mt-3 web_button ">
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Create;
