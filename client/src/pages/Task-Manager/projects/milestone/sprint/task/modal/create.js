import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, CloseButton, Card } from 'react-bootstrap';
import { createTask } from '../../../../../../../redux/task/action';
import ToastHandle from '../../../../../../../constants/toaster/toaster';
const Create = ({ modal, CloseModal ,data }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const errorhandel = store?.createTaskReducer;
    console.log(data,"newwwwwww")
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (val) => {
          let body={
            sprint_id: data?._id ,
            milestone_id:data?.milestone_id,
            project_id: data?.project_id ,
            task_name:val?.Name,
            task_summery:val?.summary,
            start_time:val?.Startdate,
            end_time:val?.Enddate,
            status:val?.status,
            module:val?.module,
            original_estimate:val?.estimatedate,
            actual_time:val?.actualtime,
            due_date:val?.dueDate
          }
          dispatch( createTask(body))
    };
    const handleClose = () => {
        reset()
        CloseModal();
    };
    useEffect(() => {
        if (errorhandel?.data?.status == 200) {
            ToastHandle('success', 'Successfully added');
            CloseModal('render');
            reset();
        } else if (errorhandel?.data?.status == 400) {
            ToastHandle('error', errorhandel?.data?.message);
        } else if (errorhandel?.data?.status == 500) {
            ToastHandle('error', errorhandel?.data?.message);
        }
    }, [errorhandel]);

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
                                                    Project<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('ProjectName', { required: true })} />
                                                {errors.ProjectName?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Milestone<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('Milestone', { required: true })} />
                                                {errors.Milestone?.type === 'required' && (
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
                                                Sprint <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register('Sprint', { required: true })}
                                                />{' '}
                                                {errors.Sprint?.type === 'required' && (
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
                                                    Description<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('Description', { required: true })} />{' '}
                                                {errors.Description?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Assignee <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register('Assignee', { required: true })}
                                                />{' '}
                                                {errors.Assignee?.type === 'required' && (
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
                                                    Reporter<span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control type="text" {...register('Reporter', { required: true })} />{' '}
                                                {errors.Reporter?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                <Form.Label>
                                                    {' '}
                                                    Prioiity  <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register('Prioiity ', { required: true })}
                                                />{' '}
                                                {errors.Prioiity ?.type === 'required' && (
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
                                                    Start Date <span className="text-danger">*</span>:
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    {...register('startdate', { required: true })}
                                                />{' '}
                                                {errors.estimatedate?.type === 'required' && (
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
                                                    type="date"
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
