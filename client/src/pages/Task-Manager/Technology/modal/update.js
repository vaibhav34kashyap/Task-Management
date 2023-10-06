import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
import { updateProject } from '../../../../redux/projects/action';
import ToastHandle from '../../../../constants/toaster/toaster';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../constants/Loader/loader';
import { updateTechnology } from '../../../../redux/technology/action';

const Update = ({ modal, closeModal, editData }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const sucesshandel = store?.UpdateTechnologyReducer;
    const loaderhandle = store?.UpdateTechnologyReducer;
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset({
            TechnologyName:editData?.name,    
        });
    }, [modal]);

    console.log(editData, 'pppppp');
    const onSubmit = (data) => {
        let body={
            id:editData?._id,
            name:data?.TechnologyName,
        }
        dispatch(updateTechnology(body));
    };

    // useEffect(() => {
    //     if (sucesshandel?.data?.status == 200) {
    //         ToastHandle('success', sucesshandel?.data?.message);
    //         closeModal('render');
    //     } else if (sucesshandel?.data?.status == 400) {
    //         ToastHandle('error', sucesshandel?.data?.message);
    //     } else if (sucesshandel?.data?.status == 500) {
    //         ToastHandle('error', sucesshandel?.data?.message);
    //     }
    // }, [sucesshandel]);
    return (
        <>
            <Modal show={modal} onHide={closeModal}>
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Update Technology
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={closeModal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal.Body className="py-0">
                    <Card className="p-2">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={12}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Row>
                                            <Col lg={4}>
                                                <Form.Label>
                                                    Technology Name <span className="text-danger">*</span>:
                                                </Form.Label>
                                            </Col>
                                            <Col lg={8}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Please Enter Technology Name"
                                                    {...register('TechnologyName', { required: true })}
                                                />
                                                {errors.TechnologyName?.type === 'required' && (
                                                    <span className="text-danger"> This feild is required *</span>
                                                )}
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="text-start d-flex align-items-center justify-content-center">
                                    <Button
                                        variant="info"
                                        type="submit"
                                        className="btn btn-sm  text-white pt-1 pb-1  web_button ">
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
