import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
// import ToastHandle from '../../../../constants/toaster/toaster';
import { useDispatch, useSelector } from 'react-redux';
// import MainLoader from '../../../../constants/Loader/loader';

const Update = ({modal,CloseModal,editData}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const CloseModaal =()=>{
        CloseModal()
    } 
    const onSubmit=(data)=>{

    }
    useEffect(() => {
        reset({
            title: editData?.sprintName            ,
            Description: editData?.sprintDesc,
            startDate: handleDate(editData?.startDate),
            endDate: handleDate( editData?.endDate),
            
        });
    }, [modal]);
    console.log(editData, 'pppppp');
    const handleDate = (data) => {
        let date = new Date(data);
        let year = date.toLocaleString('default', { year: 'numeric' });
        let month = date.toLocaleString('default', { month: '2-digit' });
        let day = date.toLocaleString('default', { day: '2-digit' });
        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
    };
  return (
<>
<Modal show={modal} onHide={CloseModaal} >
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={8} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Update Sprint Detail
                                </Modal.Title>
                            </Col>
                            <Col lg={4} className="text-end pt-2">
                                <CloseButton onClick={CloseModaal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
               
                    <Modal.Body className="py-0">
                        <Card className="p-3">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                            Sprint Name<span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Please Enter Sprint Name"
                                                {...register('title', { required: true })}
                                            />
                                            {errors.title?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>
                                            Description <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Please Enter Description Name"
                                                {...register('Description', { required: true })}
                                            />
                                            {errors.Description?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                
                                    <Col lg={12}>
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
                                    <Col lg={12}>
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
  )
}

export default Update