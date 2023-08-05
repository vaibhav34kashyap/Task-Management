import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
import { updateProject } from '../../../../redux/projects/action';
import {useDispatch,useSelector} from "react-redux"

const Update = ({ modal, closeModal, editData }) => {
    const dispatch = useDispatch()
    const store = useSelector(state=>state)
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    
    const handleDate = (data) => {
        let date = new Date(data);
        let year = date.toLocaleString('default', { year: 'numeric' });
        let month = date.toLocaleString('default', { month: '2-digit' });
        let day = date.toLocaleString('default', { day: '2-digit' });
        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
    };
    useEffect(() => {
        reset({
            projectName: editData?.projectName,
            clientName: editData?.clientName,
            access: editData?.projectAccess,
            key: editData?.key,
            startDate: handleDate(editData?.startDate),
            endDate:handleDate( editData?.endDate),
            expectedEndDate: handleDate(editData?.CompilationDate),
            projecttype: editData?.projectType,
            technology: editData?.technology,
        });
    }, [modal]);
    console.log(editData, 'pppppp');
    const onSubmit = (data) => {
        let body = {
            _id:editData?._id,
            projectName:data?.projectName,
            projectAccess:data?.access,
            startDate:data?.startDate,
            endDate:data?.endDate,
            CompilationDate:data?.expectedEndDate,
            clientName:data?.clientName,
            projectType:data?.projecttype,
            technology:data?.technology,
            key:data?.key
        }
        dispatch(updateProject(body))
    };
    return (
        <>
            <Modal show={modal} onHide={closeModal} size="lg">
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Update Project Details
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
                                            <option value="0">Private</option>
                                            <option value="1">Limited</option>
                                            <option value="2"> Open</option>
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
                                            <option value="T&M">T&M</option>
                                            <option value="Fixed">Fixed</option>
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
                                            <option Value="Web">Web</option>
                                            <option Value="Mobile">Mobile</option>
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
                                        <Form.Control type="file" {...register('uploadicons', { required: false })} />
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
                                        Update
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

export default Update;
