import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import Create from './modal/create';
import { getSingleSprint } from '../../../../../redux/sprint/action';
const Sprint = () => {
    const {projectId,milestoneId} = useParams()
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const [data, setData] = useState();
    const [openModal, SetOpenModal] = useState(false);
    const GetAllSingleSprintData = store?.getAllSingleSprints?.data?.Response;
    const CloseModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        SetOpenModal(false);
    };
    const handleCreate = () => {
        SetOpenModal(true);
    };
    useEffect(() => {
        dispatch(getSingleSprint(milestoneId));
    }, [render]);
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col lg={12} className='text-end'>
                            <Button
                                variant="info"
                                
                                onClick={handleCreate}
                                className="btn fs-5  text-white p-1   web_button">
                                Add Sprint
                            </Button>
                        </Col>
                    </Row>
                    <Col className="mx-auto" lg={12}>
                        <Row>
                            <Col className="text-center" lg={12}>
                                {' '}
                                <h4>Sprints</h4>
                            </Col>
                            <Col className="" lg={12}>

                                <Table striped>

                                    <thead >
                                        <tr>
                                            <th>#</th>
                                            <th>SprintName</th>
                                            <th>Sprint Description</th>
                                            <th>Sprint Start Date</th>
                                            <th>Sprint End Date</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {GetAllSingleSprintData?.map((item, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item?.sprintName}</td>
                                                <td>{item?.sprintDesc}</td>

                                                <td>  {moment(item?.startDate).format('L')}</td>
                                                <td>{moment(item?.endDate).format('L')}</td>
                                            </tr>

                                        )}
                                    </tbody>




                                </Table>

                            </Col>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
            <Create modal={openModal} CloseModal={CloseModal} projectId={projectId} milestoneId={milestoneId}/>
        </>
    )
}
export default Sprint