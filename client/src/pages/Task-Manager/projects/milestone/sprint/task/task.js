import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Table, Button ,Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Create from './modal/create';
import moment from 'moment';
import { getsingleSprintTask } from '../../../../../../redux/task/action';
import MainLoader from '../../../../../../constants/Loader/loader';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Task = () => {
    const { projectId, milestoneId, spriteId } = useParams();
    const [skip, setSkip] = useState(1);
    const store = useSelector((state) => state);
    const [openModal, SetOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const getSingleSprintTask = store?.getSigleSprintTask?.data?.response;

    const loaderhandel = store?.getSigleSprintTask;
    const handleCreate = () => {
        SetOpenModal(true);
    };
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSkip(value);
        dispatch(getsingleSprintTask({ id: spriteId, skip: value }));
    };
    const CloseModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        SetOpenModal(false);
    };
    useEffect(() => {
        dispatch(getsingleSprintTask({ id: spriteId, skip: 1 }));
    }, [render]);

    return (
        <>
            <Card>
                <Card.Body>
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
                    {loaderhandel.loading ? (
                        <MainLoader />
                    ) : (
                        <Row>
                            <Col className="mx-auto" lg={12}>
                                <Row>
                                    <Col className="text-center" lg={12}>
                                        {' '}
                                        <h4>Tasks</h4>
                                    </Col>
                                    <Col className="" lg={12}>
                                        <Table striped>
                                            <thead >
                                                <tr>
                                                    <th>#</th>

                                                    <th> Description</th>
                                                    <th> Summary</th>
                                                    <th> Start Date</th>
                                                    <th> End Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getSingleSprintTask?.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.summary}</td>
                                                        <td>{item?.description}</td>

                                                        <td> {moment(item?.startDate).format('L')}</td>
                                                        <td>{moment(item?.dueDate).format('L')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className="d-flex justify-content-end mt-3">
                                        {store?.getSigleSprintTask?.data?.totalPages > 0 && (
                                            <Stack spacing={2}>
                                                <Pagination
                                                    defaultPage={skip}
                                                    count={store?.getSigleSprintTask?.data?.totalPages}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={handlePaginationChange}
                                                />
                                            </Stack>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>

            <Create modal={openModal} CloseModal={CloseModal} data={getSingleSprintTask} />
        </>
    );
};

export default Task;
