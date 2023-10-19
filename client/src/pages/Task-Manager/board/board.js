import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { columnsFromBackend } from './data';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { getAllTask, updateTask } from '../../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import MainLoader from '../../../constants/Loader/loader';
import RightBar from '../../../layouts/AddRightSideBar';
import {updateTaskStatus} from '../../../../src/redux/task/action'



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
  const store = useSelector(state => state)
  const successHandle = store?.getAllTaskReducer



  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    console.log("colun", columns)


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
      
      handelupdatetask(destItems);
    } 
    else {
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
    dispatch(getAllTask())
  
  }, [])
  useEffect(() => {

    if (successHandle?.data?.status == 200) {
      setColumns({
        [uuidv4()]: {
          title: 'To-do',
          items: successHandle?.data?.Response?.map((ele) => { return { ...ele, id: ele._id } }),
        },
        [uuidv4()]: {
          title: 'In Progress',
          items: successHandle?.data?.inProgress?.map((ele) => { return { ...ele, id: ele._id } }),
        },
        [uuidv4()]: {
          title: 'Done',
          items: successHandle?.data?.done?.map((ele) => { return { ...ele, id: ele._id } }),
        },
      })
    }
  }, [successHandle])
  const handelupdatetask = (ele) => {
    let body = {
      taskId: ele[0].id,
      status: 2
    }
    
    // console.log("body dataaaaa",body)
    dispatch(updateTaskStatus(body))
   
  }

  const handel= () => {
    
    alert()
    // console.log("body dataaaaa",body)
    ///dispatch(updateTask(body))
   
  }
  console.log("dsgsgsbhsr",columns)
  return (

    <>

     <div className='add_task'>
     <button
          type="button"
          className="mybutton btn btn-info"
          onClick={() => {
            console.log("button click");
            setShowModal(!showModal);
          }}
        >
          Add Task
        </button>
        <RightBar className="d-none" projectId={props.projectId} mileStoneId={props.mileStoneId} sprintId={props.sprintId} showModal={showModal} setShowModal={setShowModal}/>
     </div>

      <DragDropContext  onDragEnd={(result) => onDragEnd(result, columns, setColumns)} 

      >
        {successHandle.loading ? (<MainLoader />) : <Container>
          <TaskColumnStyles >
            {Object.entries(columns).map(([columnId, column], index) => {
             
              return (
                <Droppable key={columnId} droppableId={columnId}>
                
                  {(provided, snapshot) => (
                    <TaskList class="three" 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title class="">{column.title}</Title>
                      {column.items.map((item, index) => (
                        <TaskCard key={item} item={item} index={index}  />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </Container>}

      </DragDropContext>
    
    </>

  );
};

export default Boards;
