import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { deleteTask } from '../../../redux/actions';
import { useDispatch,useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

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
12px; */import Summary from './../../apps/Ecommerce/Checkout/Summary';
import Milestone from './../projects/milestone/milestone';

    /* margin-top: 2px; */
    /* } */
    /* } */
`;

const TaskCard = ({ item, index}) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  console.log("storedataaaaaa",store)

  // useEffect(()=>{
  //   dispatch(getAllUsers())
  // },[])

const deleteData=(id)=>{
dispatch(deleteTask({taskId:id}))
}

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

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
            <div onClick={handleShow}>
            <p>{item.summary}</p>
            {item.description}
            <div className="secondary-details">
              <p>
                <span>
                {item?.createdAt ? (moment(item?.createdAt).format('ll')) : ""}
                </span>
              </p>
            </div>
            </div>
            <p>{item.assignees?.assigneeInfo?.userName}</p>
          </TaskInformation>
        </div>
      )}
    </Draggable>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 
        </Modal.Body>
        <ul style={{listStyle:"none"}}>
          <li>
          <b> Summary: </b></li>
          <li>{item.summary}</li><br/><br/>
          <li><b>Description:</b></li>
          
          <li>{item.description}</li><br/><br/>
          <li><b>Start Date :</b></li>
          <li>{item?.startDate ? (moment(item?.startDate).format('ll')) : ""}</li><br/><br/>
          <li><b>Priority</b></li>
          <li>{item.priority}</li><br/><br/>
          <li><b>End Date </b></li>
          <li>{item?.dueDate?(moment(item?.dueDate).format('ll')) : ""}</li><br/><br/>
         <li>Assignee Name</li>
          <li>{item.assignees?.assigneeInfo?.userName} </li><br/><br/>
          <li>Reporter</li>
          <li>{item.assignees?.reporterInfo?.role}</li> <br/><br/>
          <li>Project Name</li>
          <li>{item.projectInfo?.projectName}</li>  
        </ul>
        
      
          
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
   </>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
