import React, { useState, useEffect } from 'react';
import { Row, Button, Col, Form, Card, Table, CloseButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Create from './modal/create';
import Update from './modal/update';
import { deleteProject, getAllProjects } from '../../../redux/projects/action';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../constants/Loader/loader';
import ToastHandle from '../../../constants/toaster/toaster';
import moment from 'moment';
const Projects = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const [openModal, setOpenModal] = useState(false);
    const [render, setRender] = useState(false);
    const [deleteId,setdeleteId]=useState()
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false);
    const [editData, setEditData] = useState();
    const getProjectList = store?.getProject;
    const deletehandle =store?.deleteProject?.data

    const handeldelete = (ele) => {
        setdeleteId(ele?._id)
        setDeleteModal(true);
    };
    const handelCreate = () => {
        setOpenModal(true);
    };
    const closeModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        setOpenModal(false);
    };
    const handelUpdate = (data) => {
        setEditData(data);
        setOpenEditModal(true);
    };
    const closeupdatemodal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        setOpenEditModal(false);
    };
    const handeldYes=()=>{      
        dispatch(deleteProject(deleteId));
        setDeleteModal(false);
    }
    useEffect(() => {
        dispatch(getAllProjects());
    }, [render]);
    useEffect(() => {
        if (deletehandle?.status == 200) {
            ToastHandle('success', deletehandle?.message);
            closeModal('render');
        } else if (deletehandle?.status == 400) {
            ToastHandle('error', deletehandle?.message);
        } else if (deletehandle?.status == 500) {
            ToastHandle('error', deletehandle?.message);
        }
    }, [deletehandle])
    
    return (
        <>
            <div>
                <Card>
                    <Card.Body>
                        <div className="row mx-auto">
                            <div className="col-6 d-flex align-items-end justify-content-end">
                                <h4 className="header-title heading_data"> Projects</h4>
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-end pe-0">
                                <Button
                                    className="web_button"
                                    variant="info"
                                    onClick={() => {
                                        handelCreate();
                                    }}>
                                    Add Projects
                                </Button>
                            </div>
                        </div>
                        {getProjectList?.loading ? (
                            <>
                                <MainLoader />
                            </>
                        ) : (
                            <Table className="mb-0 add_Color_font" striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th> Project Name</th>
                                        <th>Client Name</th>
                                        <th>Project Type</th>
                                        <th>Project Start Date</th>
                                        <th>Project End Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store?.getProject?.data?.project?.map((ele, ind) => {
                                        return (
                                            <tr className="align-middle">
                                                <th scope="row">{ind + 1}</th>
                                                <td className="cp">
                                                    <span className="namelink"> {ele?.projectName} </span>
                                                </td>
                                                <td className="w-20">
                                                    <span className="namelink"> {ele?.clientName}</span>
                                                </td>
                                                <td>
                                                    <span className="namelink"> {ele?.projectType}</span>
                                                </td>
                                                <td>
                                                    <span className="namelink">
                                                        {moment(ele?.startDate).format('L')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="namelink">
                                                        {' '}
                                                        {moment(ele?.endDate).format('L')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Row>
                                                        <Col>
                                                            <p className="action-icon m-0 p-0 ">
                                                                <Link to={`/projects/${ele._id}`}>
                                                                    <i className="mdi mdi-eye m-0 p-0"></i>
                                                                </Link>
                                                            </p>
                                                            <p className="action-icon m-0 p-0  ">
                                                                <i
                                                                    className="uil-edit-alt m-0 p-0"
                                                                    onClick={() => {
                                                                        handelUpdate(ele);
                                                                    }}></i>
                                                            </p>
                                                            <p className="action-icon m-0 p-0  ">
                                                                <i
                                                                    className="mdi mdi-delete m-0 p-0"
                                                                    onClick={()=>{handeldelete(ele)}}></i>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>

                <Create modal={openModal} closeModal={closeModal} />
                <Update modal={openEditModal} closeModal={closeupdatemodal} editData={editData} />
                {/* delete modal */}
                <Modal show={deletemodal} onHide={() => setDeleteModal(false)}>
                    <Row>
                        <Col lg={12} className="text-end mt-1 ">
                            <CloseButton
                                className="pe-2"
                                onClick={() => {
                                    setDeleteModal(false);
                                }}
                            />
                        </Col>
                    </Row>

                    <Modal.Body>Are you sure you want to delete this project</Modal.Body>
                    <Modal.Footer>
                        <Button  className=" web_button " variant="primary" onClick={handeldYes}>
                            Yes
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setDeleteModal(false);
                            }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Projects;
