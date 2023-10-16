import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Link, Table, Button, Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Create from './modal/create';
import moment from 'moment';
import { getsingleSprintTask } from '../../../../../../redux/task/action';
import MainLoader from '../../../../../../constants/Loader/loader';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Update from './modal/update';
import { getAllProjects } from '../../../../../../redux/projects/action';
import { getallMileStones, getsingleMileStone } from '../../../../../../redux/milestone/action';
import { getAllSprint, getSingleSprint, getSprintById } from '../../../../../../redux/sprint/action';
import { getAllUsers } from '../../../../../../redux/actions';
const Task = () => {
    const { projectId, milestoneId, spriteId } = useParams();
    const [skip, setSkip] = useState(1);
    const store = useSelector((state) => state);
    const [openModal, SetOpenModal] = useState(false);
    const [editopenModal, SetEditOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [status, setStatus] = useState(1);
    const [editData, setEditData] = useState();
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
    const handleActive = (val) => {
        if (val) {
            setStatus(1);
            let data = {
                id: spriteId,
                skip: skip,
            };
            dispatch(getsingleSprintTask(data));
        } else {
            setStatus(0);
            let data = {
                id: spriteId,
                skip: skip,
            };
            dispatch(getsingleSprintTask(data));
        }
    };

    const handelUpdate = (data) => {
        setEditData(data);
        SetEditOpenModal(true);
    };
    const CloseUpdateModal = () => {
        SetEditOpenModal(false);
    };
    useEffect(() => {
        dispatch(getsingleSprintTask({ id: spriteId, skip: 1 }));
    }, [render]);
    useEffect(() => {
        let body = {
            status: 1,
        };
        dispatch(getAllProjects(body));
    //    dispatch(getallMileStones({status:1}))
    // dispatch(getAllSprint({status:1}))
    dispatch(getsingleMileStone({id:projectId , status:1}))
    dispatch(getSprintById({status:1,id:milestoneId}))
        dispatch(getSingleSprint({status:1 ,id:milestoneId}));
        dispatch(getAllUsers());
    }, [render ])
    return (
        <>
            <Card>
                <Card.Body>
                  
                    <div className="row mx-auto mt-2">
                        <div className="d-flex col-4">
                            <div className="row d-flex align-items-center">
                                <div className={`col-auto  cp ${status == 1 ? 'Active_data' : 'InActive_data'}`}>
                                    <p className="p-0 m-0 p-1 cp" onClick={() => handleActive(true)}>
                                        Active
                                    </p>
                                </div>
                                <div className={`col-auto  cp ${status == 0 ? 'Active_data' : 'InActive_data'}`}>
                                    <p className=" p-0 m-0 p-1 cp" onClick={() => handleActive(false)}>
                                        Deactive
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            <h4 className="header-title heading_data"> Tasks</h4>
                        </div>
                        {status == 1 ? (
                            <div className="col-4 d-flex align-items-center justify-content-end pe-0">
                                <Button className="web_button" variant="info" onClick={handleCreate}>
                                    Create Task
                                </Button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    {loaderhandel.loading ? (
                        <MainLoader />
                    ) : (
                        <Row>
                            <Col className="mx-auto" lg={12}>
                                <Row>
                                    <Col className="" lg={12}>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>

                                                    <th> Description</th>
                                                    <th> Summary</th>
                                                    <th> Start Date</th>
                                                    <th> End Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
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
                                                        <td>
                                                            <Form.Check
                                                                type="switch"
                                                                checked={item?.status}
                                                                // onChange={(e) => handleStatusChange(e, ele)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Row>
                                                                <Col>
                                                                    <p className="action-icon m-0 p-0  ">
                                                                        <i
                                                                            className="uil-edit-alt m-0 p-0"
                                                                            onClick={() => {
                                                                                handelUpdate(item);
                                                                            }}></i>
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </td>
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

            <Create
                modal={openModal}
                CloseModal={CloseModal}
                projectid={projectId}
                milestoneid={milestoneId}
                sprintid={spriteId}
            />
            <Update modal={editopenModal} CloseModal={CloseUpdateModal} editData={editData} />
        </>
    );
};

export default Task;
