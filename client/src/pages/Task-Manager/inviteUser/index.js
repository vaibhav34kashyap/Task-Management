import React from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
const InviteUser = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit=()=>{

    }
    return (
        <>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col lg={4}>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            Name<span className="text-danger">*</span>:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please Enter  Name"
                            {...register('title', { required: true })}
                        />
                        {errors.title?.type === 'required' && (
                            <span className="text-danger"> This feild is required *</span>
                        )}
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>
                            Email<span className="text-danger">*</span>:
                        </Form.Label>
                        <Form.Control
                            type="mail"
                            placeholder="Please Enter e-mail"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && (
                            <span className="text-danger"> This feild is required *</span>
                        )}
                    </Form.Group>
                </Col>
</Row>
<Row>
                <Col lg={4}>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>
                            Password<span className="text-danger">*</span>:
                        </Form.Label>
                        <Form.Control
                            type="password"
                            {...register('password', { required: true })}
                            placeholder="Please enter password"
                        />
                        {errors.password?.type === 'required' && (
                            <span className="text-danger"> This feild is required *</span>
                        )}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col> <Button>Invite</Button></Col>
               
            </Row>
            </Form>
        </>
    );
};

export default InviteUser;
