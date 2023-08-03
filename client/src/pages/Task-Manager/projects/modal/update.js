import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';

const Update = ({modal,closeModal}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },} = useForm();
    const onSubmit = () => {};
  return (
    <>
     <Modal show={modal} onHide={closeModal} size="lg">
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Create Project
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={closeModal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal.Body className="py-0">
                    <Card className="p-3">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            Project Name <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please Enter Project Name"
                                            {...register('projectName', { required: true })}
                                        />
                                        {errors.projectName?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>
                                            Client Name <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please Enter Client Name"
                                            {...register('clientName', { required: true })}
                                        />
                                        {errors.clientName?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            Access <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Select {...register('access', { required: true })}>
                                            <option>Choose an access level </option>
                                            <option>Private</option>
                                            <option>Limited</option>
                                            <option>Open</option>
                                           
                                        </Form.Select>
                                        {errors.access?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>
                                            Key<span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('key', { required: true })}
                                            placeholder="Please Enter key"
                                        />
                                        {errors.key?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>
                                            Start Date<span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register('startDate', { required: true })}
                                            placeholder="Please start Date "
                                        />
                                        {errors.startDate?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>
                                            End Date<span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register('endDate', { required: true })}
                                            placeholder="Please end Date"
                                        />
                                        {errors.endDate?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>
                                            Expected End Date<span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register('expectedEndDate', { required: true })}
                                            placeholder="Please Expected End Date "
                                        />
                                        {errors.expectedEndDate?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            Type Of Project <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Select {...register('projecttype', { required: true })}>
                                            <option>Choose an Project Type </option>
                                            <option>T&M</option>
                                            <option>Fixed</option>
                                        </Form.Select>
                                        {errors.projecttype?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            Select Your Technology <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Select {...register('technology', { required: true })}>
                                            <option>Choose Technology</option>
                                            <option>Web</option>
                                            <option>Mobile</option>
                                        </Form.Select>
                                        {errors.technology?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            Upload Icons <span className="text-danger">*</span>:
                                        </Form.Label>
                                        <Form.Control type="file" {...register('uploadicons', { required: true })} />
                                        {errors.uploadicons?.type === 'required' && (
                                            <span className="text-danger"> This feild is required *</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="text-start d-flex align-items-center justify-content-center">
                                    <Button
                                        variant="info"
                                        type="submit"
                                        className="btn btn-sm  text-white pt-1 pb-1 mt-3 web_button ">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Modal.Body>
            </Modal>
    </>
  )
}

export default Update