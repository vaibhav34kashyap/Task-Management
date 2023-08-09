import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSprintById } from '../../../../redux/sprint/action';
import Create from './Task/Create';
const Sprint = () => {
    const { id } = useParams();
    const store = useSelector((state) => state);
    const [openModal, SetOpenModal] = useState(false);
    const dispatch = useDispatch();
    const handleCreate=()=>{
      SetOpenModal(true)
    }
    const CloseModal = () => {
      SetOpenModal(false);
  };
    useEffect(() => {
        dispatch(getSprintById(id));
    }, []);

    return (
        <>
            <Row>
                <Col className="text-end mt-2 " lg={12}>
                    <Button
                        onClick={handleCreate}
                        variant="info"
                        type="submit"
                        className="btn fs-5  text-white p-1   web_button">
                        Create Task
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Row>
                        <Col className="text-center" lg={12}>
                            <h4> Sprint</h4>
                        </Col>

                        <ListGroup as="ol" numbered style={{ marginLeft: '20px', position: 'sticky' }}>
                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="">
                                        <b> Sprint Name : </b>
                                        {/* <i>{data?.title}</i> */}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="">
                                        <b>Description : </b>
                                        {/* <i>{data?.description}</i> */}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="">
                                        <b>Start Date : </b>
                                        {/* <i>{moment(data?.startDate).format('L')}</i> */}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="">
                                        <b>End Date : </b>
                                        {/* <i>{moment(data?.completion_date).format('L')}</i> */}
                                    </div>
                                </div>
                            </ListGroup.Item>
     
                        </ListGroup>
                    </Row>
                </Col>
               
              
            </Row>
            <Create modal={openModal} CloseModal={CloseModal}/>
        </>
    );
};

export default Sprint;
