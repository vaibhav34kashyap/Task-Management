import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, CloseButton, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAllmilstones } from '../../../../../redux/milestone/action';
import ToastHandle from '../../../../../constants/toaster/toaster';
import MainLoader from './../../../../../constants/Loader/loader';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import "../../../../../../node_modules/react-quill/dist/quill.snow.css";
const Create = ({ modal, closeModal }) => {
    
    const store = useSelector((state) => state);
    const [description, setDescription] = useState('');
    const sucesshandel = store?.addAllmilstones;
    const loaderhandel = store?.addAllmilstones;
    // disable previous date
    const today = new Date().toISOString().split('T')[0];
    //
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const milStones = {
            projectId: id,
            title: data.Title,
            description: description,
            startDate: data.Start_date,
            completionDate: data.End_date,
            
        };
        dispatch(addAllmilstones(milStones));
        closeModal();
    };
    useEffect(() => {
        reset();
    }, [modal]);

    useEffect(() => {
        if (sucesshandel?.data?.status == 200) {
            console.log(sucesshandel, '//////////////////////////////////////////////////');
            ToastHandle('success', 'Successfully Added');
            closeModal('render');
        } else if (sucesshandel?.data?.status == 400) {
            ToastHandle('error', sucesshandel?.data?.message);
        } else if (sucesshandel?.data?.status == 500) {
            ToastHandle('error', sucesshandel?.data?.message);
        }
    }, [sucesshandel]);

    return (
        <>
            <Modal show={modal} onHide={closeModal} size="md">
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Add Milestone
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={closeModal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal.Body className="py-0">
                    {loaderhandel?.loading ? (
                        <>
                            <MainLoader />
                        </>
                    ) : (
                        <Card className="p-3">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                Milestone Name<span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control type="text" {...register('Title', { required: true })} />
                                            {errors.Title?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Description <span className="text-danger">*</span>:
                                            </Form.Label>
                                            {/* <CKEditor
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
                                            /> */}
                                            <ReactQuill theme="snow" value={description} onChange={(event, editor) => {
                                                    // const data = editor.getData();
                                                    setDescription(event);
                                                }} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                Start date <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                min={today}
                                                {...register('Start_date', { required: true })}
                                            />
                                            {errors.Start_date?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                {' '}
                                                End date <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                disabled={watch("Start_date")== ""|| watch("Start_date")== undefined }
                                                min={watch("Start_date")} 
                                                {...register('End_date', { required: true })}
                                            />{' '}
                                            {errors.End_date?.type === 'required' && (
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
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Create;
