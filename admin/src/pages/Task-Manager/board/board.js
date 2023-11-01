import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Badge } from 'react-bootstrap';
import styled from '@emotion/styled';
import { columnsFromBackend } from './data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { getAllTask, updateTask } from '../../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import MainLoader from '../../../constants/Loader/loader';
import RightBar from '../../../layouts/AddRightSideBar';
import { updateTaskStatus } from '../../../../src/redux/task/action';
import ToastHandle from '../../../constants/toaster/toaster';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

import {
    deleteTask,
    getAllProjects,
    getAllRoles,
    getAllUsers,
    getSingleSprint,
    getsingleMileStone,
} from '../../../redux/actions';

const Container = styled.div`
    display: flex;
`;

const TaskList = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    background: #f3f3f3;
    min-width: 341px;
    border-radius: 5px;
    padding: 15px 15px;
    margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
    margin: 8px;
    display: flex;
    width: 100%;
    min-height: 80vh;
    overflow: auto;
`;

const Title = styled.span`
    color: #10957d;
    background: rgba(16, 149, 125, 0.15);
    padding: 2px 10px;
    border-radius: 5px;
    align-self: flex-start;
`;

const Boards = (props) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const successHandle = store?.getAllTaskReducer;
    const statushandle = store?.updateTaskStatus;
    const deletehandel = store?.deleteTask;
    const updatehandel = store?.UpdateTaskReducer;
    const Createhandel = store?.createTaskReducer;
    const [render, setRender] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [columns, setColumns] = useState(columnsFromBackend);
    const sprintId = store?.getSprintId?.data;
    const projectId = store?.getProjectId?.data;
    const milestoneId = store?.getMilestoneId?.data;
    const onDragEnd = (result, columns, setColumns) => {
        console.log('colun', result);

        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });

            handelupdatetask(result);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    useEffect(() => {
        dispatch(getAllTask({ projectId: projectId, milestoneId: milestoneId, sprintId: sprintId }));
    }, [render, sprintId]);
    useEffect(() => {
        if (successHandle?.data?.status == 200) {
            setColumns({
                [1]: {
                    title: 'To-do',
                    items: successHandle?.data?.Response?.tasks?.map((ele) => {
                        return { ...ele, id: ele._id };
                    }),
                },
                [2]: {
                    title: 'In Progress',
                    items: successHandle?.data?.inProgress?.tasks?.map((ele) => {
                        return { ...ele, id: ele._id };
                    }),
                },
                [3]: {
                    title: 'Hold',
                    items: successHandle?.data?.hold?.tasks?.map((ele) => {
                        return { ...ele, id: ele._id };
                    }),
                },
                [4]: {
                    title: 'Done',
                    items: successHandle?.data?.done?.tasks?.map((ele) => {
                        return { ...ele, id: ele._id };
                    }),
                },
            });
        }
    }, [successHandle]);
    const handelupdatetask = (ele) => {
        let body = {
            taskId: ele?.draggableId,
            status: ele?.destination?.droppableId,
        };
        dispatch(updateTaskStatus(body));
        dispatch(getAllTask({ projectId: projectId, milestoneId: milestoneId, sprintId: sprintId }));
    };
    const closeModal = (val) => {
        if (val == 'render') {
            setRender(!render);
        }
    };

    useEffect(() => {
        if (statushandle?.data?.status == 200) {
            ToastHandle('success', statushandle?.data?.message);
            closeModal('render');
        } else if (statushandle?.data?.status == 400) {
            ToastHandle('error', statushandle?.data?.message);
        } else if (statushandle?.data?.status == 500) {
            ToastHandle('error', statushandle?.data?.message);
        }
    }, [statushandle]);
    useEffect(() => {
        if (deletehandel?.data?.status == 200) {
            ToastHandle('success', deletehandel?.data?.message);
            closeModal('render');
        } else if (deletehandel?.data?.status == 400) {
            ToastHandle('error', deletehandel?.data?.message);
        } else if (deletehandel?.data?.status == 500) {
            ToastHandle('error', deletehandel?.data?.message);
        }
    }, [deletehandel]);
    useEffect(() => {
        console.log(updatehandel?.data?.status, '////////');
        if (updatehandel?.data?.status == 200) {
            closeModal('render');
            ToastHandle('success', 'Updated Successfully');
        } else if (updatehandel?.data?.status == 400) {
            ToastHandle('error', updatehandel?.data?.message);
        } else if (updatehandel?.data?.status == 500) {
            ToastHandle('error', updatehandel?.data?.message);
        }
    }, [updatehandel]);
    useEffect(() => {
        console.log(Createhandel?.data?.status, '////////');
        if (Createhandel?.data?.status == 200) {
            closeModal('render');
            ToastHandle('success', Createhandel?.data?.message);
        } else if (Createhandel?.data?.status == 400) {
            ToastHandle('error', Createhandel?.data?.message);
        } else if (Createhandel?.data?.status == 500) {
            ToastHandle('error', Createhandel?.data?.message);
        }
    }, [Createhandel]);
    useEffect(() => {
        let body = {
            status: 1,
            skip: 0,
        };
        dispatch(getAllProjects(body));
        dispatch(getsingleMileStone({ id: '', activeStatus: 1, skip: 0, mileStoneId: '' }));
        dispatch(getSingleSprint({ activeStatus: 1, id: '', skip: 0 }));
    }, []);
    return (
        <>
            <div className="add_task row d-flex">
                <div  className='col-lg-8 d-flex '>
                <div >
                    {' '}
                    <h4 className="page-title">
                        {' '}
                        To-Do :
                        <Badge className="badge-success-lighten ms-1">{successHandle?.data?.Response?.taskCount}</Badge>
                    </h4>{' '}
                </div>
                <div className='ms-3'>
                    {' '}
                    <h4 className="page-title">
                        {' '}
                        In-Progress :
                        <Badge className="badge-success-lighten ms-1">
                            {successHandle?.data?.inProgress?.taskCount}
                        </Badge>
                    </h4>{' '}
                </div>
                <div className='ms-3'>
                    {' '}
                    <h4 className="page-title">
                        {' '}
                        Hold :
                        <Badge className="badge-success-lighten ms-1">{successHandle?.data?.hold?.taskCount}</Badge>
                    </h4>{' '}
                </div>
                <div className='ms-3'>
                    {' '}
                    <h4 className="page-title">
                        {' '}
                        Done :
                        <Badge className="badge-success-lighten ms-1">{successHandle?.data?.done?.taskCount}</Badge>
                    </h4>{' '}
                </div>
                </div>
               <div className='col-lg-4'>
               <button
                    type="button"
                    className="mybutton btn btn-info"
                    onClick={() => {
                        console.log('button click');
                        setShowModal(!showModal);
                    }}>
                    Add Task
                </button>
                <RightBar
                    className="d-none"
                    projectId={props.projectId}
                    mileStoneId={props.mileStoneId}
                    sprintId={props.sprintId}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
               </div>
              
            </div>

            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {successHandle.loading ? (
                    <MainLoader />
                ) : (
                    <Container>
                        <TaskColumnStyles>
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return (
                                    <Droppable key={columnId} droppableId={columnId}>
                                        {(provided, snapshot) => (
                                            <TaskList
                                                class="three"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}>
                                                <Title class="">{column.title}</Title>
                                                {column.items.map((item, index) => (
                                                    <TaskCard
                                                        key={item}
                                                        item={item}
                                                        index={index}
                                                        closeModal={closeModal}
                                                    />
                                                ))}
                                                {provided.placeholder}
                                            </TaskList>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </TaskColumnStyles>
                    </Container>
                )}
            </DragDropContext>
        </>
    );
};

export default Boards;
