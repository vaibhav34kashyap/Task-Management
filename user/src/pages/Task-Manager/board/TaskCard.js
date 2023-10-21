import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { deleteTask } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'
import moment from 'moment';
const TaskInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 15px;
    min-height: 106px;
    border-radius: 5px;
    max-width: 311px;
    /* background: ${({ isDragging }) => (isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white')}; */
    background: white;
    margin-top: 15px;

    .secondary-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 12px;
        font-weight: 400px;
        color: #7d7d7d;
    }
    /* .priority{ */
    /* margin-right: 12px; */
    /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: import Column from './../Boards/board/Column';
12px; */
    /* margin-top: 2px; */
    /* } */
    /* } */
`;

const TaskCard = ({ item, index,Column}) => {

  const dispatch = useDispatch();
const deleteData=(id)=>{
dispatch(deleteTask({taskId:id}))
}


  return (
   <>
  
     <Draggable key={item.id} draggableId={item.id} index={index} >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
          <div className='action_icon'>
          <button type='button' ><i class="uil-edit-alt m-0 p-0"></i></button>
          <button type='button' onClick={()=>deleteData(item.id)} ><i class="mdi mdi-delete m-0 p-0"></i></button>
          
          </div>

            <p>{item.summary}</p>
            <p>{item.description}</p>
            <div className="secondary-details">
              <p>
                <span>
                {item?.createdAt ? (moment(item?.createdAt).format('ll')) : ""}
                </span>
              </p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
   </>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
