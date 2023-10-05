import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './milstone.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Create from '../milestone/modal/create';
import { getProjectsById } from '../../../../redux/projects/action';
import { getallMileStones, getsingleMileStone } from './../../../../redux/milestone/action';
import MainLoader from '../../../../constants/Loader/loader';

// import ToastHandle from '../../../constants/toaster/toaster';
const Milestone = () => {
    const { id } = useParams();
    const store = useSelector((state) => state);

    const dispatch = useDispatch();
    const [openModel, setOpenModel] = useState(false);
    const [render, setRender] = useState(false);
    const [status, setStatus] = useState(1);
    const GetDataById = store?.getProjectById?.data?.project;
    const GetSinglemilstonesData = store?.getSigleMileStone?.data?.Response;
    const loaderhandel = store?.getSigleMileStone;
    const closeModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        setOpenModel(false);
    };
    const handleActive = (val) => {
        if (val) {
            setStatus(1);
            let data = {
                id:id ,
                status: 1,
            };
            dispatch(getsingleMileStone(data));
        } else {
            setStatus(0);
            let data = {
                id:id,
                status: 0,
            };
            dispatch(getsingleMileStone(data));
        }
    };
    useEffect(() => {
        dispatch(getProjectsById(id));
        dispatch(getsingleMileStone({id:id ,status:1}));
    }, [render]);

    return (
        <>
            {/* {/ <h1>{id}</h1> /} */}
            <Container className="my-3">
                <Row>
                    <Col className="text-end" lg={12}>
                        <Button
                            onClick={() => {
                                setOpenModel(true);
                            }}
                            // onClick={handleCreate}

                            // onClick={(e)=>{handleCreate(e,"ghjkl")}}

                            variant="info"
                            type="submit"
                            className="btn fs-5  text-white p-1   web_button">
                            Add Milestone
                        </Button>
                    </Col>
                </Row>
                {loaderhandel.loading ? (
                    <MainLoader />
                ) : (
                    <>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col className="text-center" lg={12}>
                                        <h4> Project</h4>
                                    </Col>
                                    <Row>
                                        <Col lg={12} className='d-flex justify-content-between'>
                                            <div className='d-flex'><h5 className='p-0 m-0'>Project Name :</h5>
                                                <p className='p-0 m-0'>{GetDataById?.projectName}</p></div>
                                            <div className='d-flex '><h5 className='p-0 m-0'>Client Name :</h5>
                                                <p className='p-0 m-0'>{GetDataById?.clientName}</p></div>
                                            <div className='d-flex '><h5 className='p-0 m-0'>Project Type :</h5>
                                                <p className='p-0 m-0'>{GetDataById?.projectType}</p></div>
                                            <div className='d-flex '><h5 className='p-0 m-0'>Project Start Date :</h5>
                                                <p className='p-0 m-0'> {moment(GetDataById?.startDate).format('L')}</p></div>
                                            <div className='d-flex '><h5 className='p-0 m-0'>Project End Date :</h5>
                                                <p className='p-0 m-0'> {moment(GetDataById?.endDate).format('L')}</p></div>
                                        </Col>
                                    </Row>




                                </Row>
                            </Col>


                        </Row>
                        <Card className='mt-3'>
                            <Card.Body>
                                <Col className="mx-auto" lg={12}>
                                    <Row>
                                        <div className="row mx-auto mt-2">
                                            <div className="d-flex col-4">
                                                <div className="row d-flex align-items-center">
                                                    <div
                                                        className={`col-auto  cp ${status == 1 ? 'Active_data' : 'InActive_data'}`}>
                                                        <p className="p-0 m-0 p-1 cp" onClick={() => handleActive(true)}>
                                                            Active
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`col-auto  cp ${status == 0 ? 'Active_data' : 'InActive_data'}`}>
                                                        <p className=" p-0 m-0 p-1 cp" onClick={() => handleActive(false)}>
                                                            Deactive
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                        </div>
                                        <Col className="" lg={12}>

                                            <Table striped>
                                                <thead >
                                                    <tr>
                                                        <th>#</th>
                                                        <th> MileStone Name</th>
                                                        <th> Description</th>
                                                        <th> Start Date</th>
                                                        <th> End Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {GetSinglemilstonesData?.map((item, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.title}</td>
                                                            <td>{item?.description}</td>

                                                            <td> {moment(item?.startDate).format('L')}</td>
                                                            <td>{moment(item?.completion_date).format('L')}</td>
                                                            <td> <Row>
                                                                <Col>
                                                                    <p className="action-icon m-0 p-0 ">
                                                                        <Link to={`/singleMilestonesprint/${item?._id}`}>
                                                                            <i className="mdi mdi-eye m-0 p-0"></i>
                                                                        </Link>
                                                                    </p>
                                                                    <p className="action-icon m-0 p-0  ">
                                                                        <i
                                                                            className="uil-edit-alt m-0 p-0"
                                                                        ></i>
                                                                    </p>

                                                                </Col>
                                                            </Row></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>

                                        </Col>
                                    </Row>
                                </Col>
                            </Card.Body>
                        </Card>
                    </>

                )}

                <Create modal={openModel} closeModal={closeModal} />
            </Container>
        </>
    );
};

export default Milestone;