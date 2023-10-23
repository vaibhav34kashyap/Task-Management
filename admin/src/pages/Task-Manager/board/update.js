import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
import ToastHandle from '../../../constants/toaster/toaster';
import { useDispatch, useSelector } from 'react-redux';
// import { updateSprint } from '../../../../../../../redux/sprint/action';
import MainLoader from '../../../constants/Loader/loader';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getSingleSprint, getsingleMileStone, updateTask } from '../../../redux/actions';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const UpdateTask = ({ modal, closeModal, editData }) => {
    console.log(editData, 'update');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const [hideMilestone ,setHideMilestone] = useState(true);
    const [hideSprint ,setHideSprint] = useState(true);
    const sucesshandel = store?.UpdateTaskReducer;
    const loaderhandel = store?.UpdateTaskReducer;
    // disable previous date
    const today = new Date().toISOString().split('T')[0];
    //
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const CloseModaal = () => {
        closeModal();
    };
    const projectHandel=(e)=>{
        const id=e.target.value
if (id){
    setHideMilestone(false)
    dispatch(getsingleMileStone({ id:id,activeStatus: 1 ,skip:0 }));
}
    }
    const milestoneHandel=(e)=>{
        const id=e.target.value
        if (id){
            setHideSprint(false)
            dispatch(getSingleSprint({ activeStatus:1, id: id ,skip :0}));
        }
    }
    const onSubmit = (data) => {
        let body = {
            taskId: editData?._id,
            projectId: data?.projectname,
            milestoneId: data?.Milestone,
            sprintId: data?.Sprint,
            summary: data?.summary,
            description: description,
            assigneeId: data?.Assignee,
            reporterId: data?.Reporter,
            priority: data?.priority,
            startDate: data?.startDate,
            dueDate: data?.dueDate,
            status: data?.status,
        };
        console.log('editsprit', body);
        dispatch(updateTask(body));
    };

    useEffect(() => {
        reset({
            Milestone: editData?.milestoneId?._id,
            projectname: editData?.projectId?._id,
            Sprint: editData?.sprintId?._id,
            startDate: handleDate(editData?.createdAt),
            dueDate: handleDate(editData?.dueDate),
            summary: editData?.summary,
            Assignee: editData?.assigneeId?._id,
            Reporter: editData?.reporterId?._id,
            priority: editData?.priority,
            status: editData?.status,
        });
        setDescription(editData?.description);
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

    useEffect(() => {
        if (sucesshandel?.data?.status == 200) {
            ToastHandle('success', 'Updated Successfully');
            closeModal('render');
        } else if (sucesshandel?.data?.status == 400) {
            ToastHandle('error', sucesshandel?.data?.message);
        } else if (sucesshandel?.data?.status == 500) {
            ToastHandle('error', sucesshandel?.data?.message);
        }
    }, [sucesshandel]);
    return (
        <>
            <Modal show={modal} onHide={closeModal} size={'lg'}>
                <Row className="m-0 p-0">
                    <Col lg={12}>
                        <Row>
                            <Col lg={7} className="text-end">
                                <Modal.Title id="" className="mx-auto">
                                    Update Task
                                </Modal.Title>
                            </Col>
                            <Col lg={5} className="text-end pt-2">
                                <CloseButton onClick={closeModal} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {loaderhandel.loading ? (
                    <MainLoader />
                ) : (
                    <Modal.Body className="py-0">
                        <Card className="p-3">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Project<span className="text-danger">*</span>:
                                                    </Form.Label>

                                                    <Form.Select
                                                        {...register('projectname', {
                                                            required: true,
                                                           
                                                        })}
                                                        onChange={(e)=>{projectHandel(e)}}
                                                       >
                                                        {/* <option value={''}>--Select--</option> */}
                                                        {store?.getProject?.data?.response?.map((ele, ind) => (
                                                            <option value={ele?._id} > {ele?.projectName} </option>
                                                        ))}
                                                    </Form.Select>
                                                    {errors.projectname?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Milestone<span className="text-danger">*</span>:
                                                    </Form.Label>

                                                    <Form.Select
                                                        {...register('Milestone', { required: true,disabled:hideMilestone  })}
                                                        onChange={(e)=>{milestoneHandel(e)}}>
                                                        <option value={''}>--Select--</option>
                                                        {store?.getSigleMileStone?.data?.response?.map((ele, ind) => (
                                                            <option value={ele?._id}> {ele?.title} </option>
                                                        ))}
                                                    </Form.Select>
                                                    {errors.Milestone?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        Sprint <span className="text-danger">*</span>:
                                                    </Form.Label>

                                                    <Form.Select
                                                        {...register('Sprint', { required: true,  disabled:hideSprint })}>
                                                        <option value={''}>--Select--</option>
                                                        {store?.getAllSingleSprints?.data?.response?.map((ele, ind) => (
                                                            <option value={ele?._id}> {ele?.sprintName} </option>
                                                        ))}
                                                    </Form.Select>
                                                    {errors.Sprint?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Summary <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=" Enter Task Summary"
                                                        {...register('summary', { required: true })}
                                                    />{' '}
                                                    {errors.summary?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Description<span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <CKEditor
                                                        config={{
                                                            ckfinder: {
                                                                // Upload the images to the server using the CKFinder QuickUpload command.
                                                                uploadUrl:
                                                                    'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                                                            },
                                                        }}
                                                        editor={ClassicEditor}
                                                        data={description}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setDescription(data);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Assignee <span className="text-danger">*</span>:
                                                    </Form.Label>

                                                    <Form.Select {...register('Assignee', { required: true })}>
                                                        <option value={''}>--Select--</option>
                                                        {store?.getAllUsers?.data?.response?.map((ele, ind) => (
                                                            <option value={ele?._id}> {ele?.userName} </option>
                                                        ))}
                                                    </Form.Select>
                                                    {errors.Assignee?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Reporter<span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Select {...register('Reporter', { required: true })}>
                                                        <option value={''}>--Select--</option>
                                                        {store?.getAllRoles?.data?.response?.map((ele, ind) => (
                                                            <option value={ele?._id}> {ele?.role} </option>
                                                        ))}
                                                    </Form.Select>
                                                    {errors.Reporter?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Priority <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Select {...register('priority', { required: true })}>
                                                        <option>-------select----</option>
                                                        <option value="1">High</option>
                                                        <option value="2">Medium</option>
                                                        <option value="3">Low</option>
                                                    </Form.Select>
                                                    {errors.priority?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Start Date <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        min={today}
                                                        {...register('startDate', { required: true })}
                                                    />{' '}
                                                    {errors.startDate?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Due Date<span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        min={today}
                                                        {...register('dueDate', { required: true })}
                                                    />{' '}
                                                    {errors.dueDate?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>
                                                        {' '}
                                                        Status <span className="text-danger">*</span>:
                                                    </Form.Label>
                                                    <Form.Select {...register('status', { required: true })}>
                                                        <option>-------select----</option>
                                                        <option value="1">todo</option>
                                                        <option value="2">inProgress</option>
                                                        <option value="3">done</option>
                                                        <option value="4">review</option>
                                                    </Form.Select>
                                                    {errors.status?.type === 'required' && (
                                                        <span className="text-danger"> This feild is required *</span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
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
                )}
            </Modal>
        </>
    );
};


export default UpdateTask