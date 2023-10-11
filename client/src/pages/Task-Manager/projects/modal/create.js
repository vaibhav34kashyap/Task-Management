import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
import { addProject } from '../../../../redux/projects/action';
import ToastHandle from '../../../../constants/toaster/toaster';
import MainLoader from '../../../../constants/Loader/loader';
import Multiselect from 'multiselect-react-dropdown';
import { getAllTechnology } from '../../../../redux/technology/action';
const Create = ({ modal, closeModal }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const options = [
        { label: 'React ', value: 'React' },
        { label: 'Node', value: 'Node' },
        { label: 'Angular', value: 'Angular' },
        { label: 'Flutter', value: 'Flutter' },
    ];
    const [selected, setSelected] = useState([]);
    const errorhandel = store?.addProject;
    const loaderhandel = store?.addProject;
    const [removeValue, setRemoveValue] = useState([]);
    const [addValue, setAddValue] = useState([]);
    const getTechnology = store?.getAllTechnologyReducer?.data?.response;
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        let body = {
            projectName: data?.projectName,
            clientName: data?.clientName,
            startDate: data?.startDate,
            endDate: data?.endDate,
            projectType: addValue,
            technology: data?.technology,
            projectStatus: 'Live',
        };
        console.log(data, 'bbb');
        dispatch(addProject(body));
    };
    useEffect(() => {
        if (errorhandel?.data?.status == 200) {
            ToastHandle('success', 'Successfully added');
            closeModal('render');
        } else if (errorhandel?.data?.status == 400) {
            ToastHandle('error', errorhandel?.data?.message);
        } else if (errorhandel?.data?.status == 500) {
            ToastHandle('error', errorhandel?.data?.message);
        }
    }, [errorhandel]);
    useEffect(() => {
        reset();
    }, [modal]);
    const removehandle = () => {
        const remove = getTechnology.map((ele, ind) => ele?._id);
        console.log(remove, 'ritu');
        setRemoveValue(remove);
    };
    const addhandle = (name) => {
        const add = getTechnology.filter((ele, ind) => {
            return ele?.techName == name;
        });
        console.log(add, 'ritika');
        setAddValue(add);
    };
    useEffect(() => {
        const getTechnologyname = [];
        dispatch(getAllTechnology({ status: true }));
        for (let i = 0; i < getTechnology?.length; i++) {
            getTechnologyname.push(getTechnology[i]?.techName);
        }
        setSelected(getTechnologyname);
    }, [modal]);

    return (
        <>
            <Modal show={modal} onHide={closeModal} size="lg">
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Create Project
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
                                    <Col lg={6}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Project Name <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Please Enter Project Name"
                                                {...register('projectName', { required: true })}
                                            />
                                            {errors.projectName?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>
                                                Client Name <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Please Enter Client Name"
                                                {...register('clientName', { required: true })}
                                            />
                                            {errors.clientName?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Type Of Project <span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Select {...register('projecttype', { required: true })}>
                                                <option>Choose an Project Type </option>
                                                <option value="T&M">T&M</option>
                                                <option value="Fixed Cost">Fixed Cost</option>
                                                <option value=" Hourly">Hourly</option>
                                                <option value="Dedicated team">Dedicated team</option>
                                            </Form.Select>
                                            {errors.projecttype?.type === 'required' && (
                                                <span className="text-danger"> This feild is required *</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Select Your Technology <span className="text-danger">*</span>:
                                            </Form.Label>

                                            <Multiselect
                                                // options={options}
                                                // value={selected}
                                                // onChange={setSelected}
                                                // labelledBy="Select"
                                                onRemove={removehandle}
                                                onSelect={addhandle}
                                                isObject={false}
                                                options={selected}
                                                showCheckbox
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
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
                                    <Col lg={6}>
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
                                    <Col lg={6}>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>
                                                Status<span className="text-danger">*</span>:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('status', { required: true, disabled: true })}
                                                placeholder="Live"
                                            />
                                            {errors.status?.type === 'required' && (
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
