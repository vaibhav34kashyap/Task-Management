import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, CloseButton, Card } from 'react-bootstrap';
import { addSprint } from '../../../../../../redux/sprint/action';
import ToastHandle from '../../../../../../constants/toaster/toaster';
import MainLoader from '../../../../../../constants/Loader/loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Create = ({ modal, CloseModal, projectId, milestoneId }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const successHandle = store?.addSprint;
    const [description, setDescription] = useState('');
    // disable previous date
    const today = new Date().toISOString().split('T')[0];
    //
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
console.log(projectId,"projectId")
    const onSubmit = (val) => {
        let body = {
            projectId: projectId,
            milestoneId: milestoneId,
            sprintName: val?.Name,
            sprintDesc: description,
            startDate: val?.Startdate,
            endDate: val?.Enddate,
        };
        dispatch(addSprint(body));
    };
    useEffect(() => {
        reset();
    }, [modal]);
    useEffect(() => {
        if (successHandle?.data?.status == 200) {
            ToastHandle('success', successHandle?.data?.message);
            CloseModal('render');
        } else if (successHandle?.data?.status == 400) {
            ToastHandle('error', successHandle?.data?.message);
        } else if (successHandle?.data?.status == 500) {
            ToastHandle('error', successHandle?.data?.message);
        }
    }, [successHandle]);
    const handleClose = () => {
        CloseModal();
    };
    return (
        <>
            <Modal show={modal} onHide={handleClose}>
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Add Sprint
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={handleClose} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {successHandle?.loading ? (
                    <MainLoader />
                ) : (
                    <Modal.Body className="py-0">
                        <Card className="p-2">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                Name <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control type="text" {...register('Name', { required: true })} />
                                            {errors.Name?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Description <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                config={{
                                                    ckfinder: {
                                                        uploadUrl:
                                                            'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
                                                    },
                                                }}
                                                data=""
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                Start date <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                min={today}
                                                {...register('Startdate', { required: true })}
                                            />{' '}
                                            {errors.Startdate?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                End date <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                disabled={watch("Startdate")== ""|| watch("Startdate")== undefined }
                                                min={watch("Startdate")} 
                                                {...register('Enddate', { required: true })}
                                            />{' '}
                                            {errors.Enddate?.type === 'required' && (
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
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Modal.Body>
                )}
            </Modal>
        </>
    );
};

export default Create;
