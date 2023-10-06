import React, { useState, useEffect } from 'react';
import { Row, Button, Col, Form, Card, Table, CloseButton, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Create from './modal/create';
import { getAllTechnology } from '../../../redux/technology/action';
import Update from './modal/update';
const Technology = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const [status, setStatus] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [render, setRender] = useState(false);
    const [editData, setEditData] = useState();
    const [openEditModal, setOpenEditModal] = useState(false);
    const handelCreate = () => {
        setOpenModal(true);
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
    const closeModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
        setOpenModal(false);
    };
    const handleActive = (val) => {
        if (val) {
            setStatus(true);
            let body = {
                status: true,
            };
            dispatch(getAllTechnology(body));
        } else {
            setStatus(false);
            let body = {
                status: false,
            };
            dispatch(getAllTechnology(body));
        }
    };
    useEffect(() => {
        let body = {
            status: status,
        };
        dispatch(getAllTechnology(body));
    }, [render]);

    return (
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <div className="row mx-auto mt-2">
                                <div className="d-flex col-4">
                                    <div className="row d-flex align-items-center">
                                        <div
                                            className={`col-auto  cp ${
                                                status == true ? 'Active_data' : 'InActive_data'
                                            }`}>
                                            <p className="p-0 m-0 p-1 cp" onClick={() => handleActive(true)}>
                                                Active
                                            </p>
                                        </div>
                                        <div
                                            className={`col-auto  cp ${
                                                status == false ? 'Active_data' : 'InActive_data'
                                            }`}>
                                            <p className=" p-0 m-0 p-1 cp" onClick={() => handleActive(false)}>
                                                Deactive
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 d-flex align-items-center justify-content-center">
                                    <h4 className="header-title heading_data"> Technology</h4>
                                </div>
                                {status == 1 ? (
                                    <div className="col-4 d-flex align-items-center justify-content-end pe-0">
                                        <Button
                                            className="web_button"
                                            variant="info"
                                            onClick={() => {
                                                handelCreate();
                                            }}>
                                            Add Technology
                                        </Button>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            <Table className="mb-0 add_Color_font" striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th> Technology Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store?.getAllTechnologyReducer?.data?.response?.map((ele, ind) => {
                                        return (
                                            <tr className="align-middle">
                                                <th scope="row">{ind + 1}</th>
                                                <td className="cp">
                                                    <span className="namelink"> {ele?.name} </span>
                                                </td>

                                                <td>
                                                    <Form.Check
                                                        type="switch"
                                                        // checked={ele?.status}
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
                                                                        handelUpdate(ele);
                                                                    }}
                                                                ></i>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Create modal={openModal} closeModal={closeModal} />
            <Update modal={openEditModal} closeModal={closeupdatemodal} editData={editData} />
        </>
    );
};

export default Technology;
