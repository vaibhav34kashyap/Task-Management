import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { deleteTask, getAllTask } from '../../../redux/task/action';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addComment, getComment } from '../../../redux/addcomment/actions';
import { useForm, SubmitHandler } from "react-hook-form"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import UpdateTask from '../board/update';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';





// import CustomAvatar from '../TableComponents/CustomAvatar'

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
  
`;

const TaskCard = ({ item, index,closeModal }) => {
  const [editData, setEditData] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const handelUpdate = (data) => {
    setEditData(data);
    setOpenEditModal(true);
};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (e) => {
  }

  const closeupdatemodal = (val) => {
    closeModal("render");
    setOpenEditModal(false);
};
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  console.log("storedataaaaaa", store)

  useEffect(() => {
    //dispatch(getComment())
  }, [])

  const deleteData = (id) => {
    dispatch(deleteTask({ taskId: id }))
    dispatch(getAllTask())
  }
  const addComect = (e, item) => {
    let data = {
      taskId: item.id,
      comment: txtComment
    }
    dispatch(addComment(data));
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showData, setShowData] = useState(false);

  const handleCloseData = () => setShowData(false);
  const handleShowData = () => setShowData(true);

  return (
    <>

      <Draggable key={item.id} draggableId={item.id} index={index} >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>

            <TaskInformation>
                <div className='action_icon'>
                <button type='button'  onClick={() => {
                                            handelUpdate(item);
                                        }}><i class="uil-edit-alt m-0 p-0" ></i></button>
                <button type='button' onClick={() => deleteData(item.id)} ><i class="mdi mdi-delete m-0 p-0"></i></button>

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
              <div>
                <form onSubmit={() => addComect(e, item)}>
                  <input name="txtComment" placeholder='add your comment' />
                  <button type="submit" >add</button>
                </form>

              </div>
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
        <ul style={{ listStyle: "none" }}>
          <li>
            <b> Summary: </b></li>
          <li>{item.summary}</li><br /><br />
          <li><b>Description:</b></li>

          <li>{item.description}</li><br /><br />
          <li><b>Start Date :</b></li>
          <li>{item?.startDate ? (moment(item?.startDate).format('ll')) : ""}</li><br /><br />
          <li><b>Priority</b></li>
          <li>{item.priority ? "medium" : ""}</li><br /><br />
          <li><b>End Date </b></li>
          <li>{item?.dueDate ? (moment(item?.dueDate).format('ll')) : ""}</li><br /><br />
          <li>Assignee Name</li>
          <li>{item.assignees?.assigneeInfo?.userName} </li><br /><br />
          <li>Reporter</li>
          <li>{item.assignees?.reporterInfo?.role}</li> <br /><br />
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

      <Modal show={showData} onHide={handleCloseData}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onClick={handleSubmit(onSubmit)}>
            <div class="row mb-2">

              <div class="col-lg-6">
                <label class="form-label" for="exampleForm.ControlTextarea1">
                  Project
                  <span class="text-danger">*</span>:
                </label>
                <select class="form-select" id="exampleForm.ControlInput1" {...register('project')}>
                  <option value="">--Select--</option>
                </select>
              </div>

              <div class="col-lg-6">
                <label class="form-label" for="exampleForm.ControlTextarea1">
                  Milestone
                  <span class="text-danger">*</span>:
                </label>
                <select class="form-select" id="exampleForm.ControlInput1" {...register('Milestone')}>
                  <option value="">--Select--</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">Summary
                  <span class="text-danger">*</span>:</label>
                  <input placeholder="Please Enter Summary" type="text" id="exampleForm.ControlTextarea1" class="form-control" name="Summary" />
                </div></div>
                <div class="col-lg-6">
                <label class="form-label" for="exampleForm.ControlTextarea1">
                  Sprint
                  <span class="text-danger">*</span>:
                </label>
                <select class="form-select" id="exampleForm.ControlInput1" {...register('Milestone')}>
                  <option value="">--Select--</option>
                </select>
              </div>
             
            </div>


            <div class="row">
            <div class="col-lg-12">
            <div class="mb-2"><label class="form-label" for="exampleForm.ControlInput1">Description
                <span class="text-danger">*</span>:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Write Somthing...</p>"
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                  }}
                  onBlur={(event, editor) => {

                  }}
                  onFocus={(event, editor) => {

                  }}
                />
                {/* <input placeholder="Please Enter Description" type="text" id="exampleForm.ControlInput1" class="form-control" name="Description" /> */}
              </div></div>
            </div>
            <div class="row mb-2">

              <div class="col-lg-6">
                <label class="form-label" for="exampleForm.ControlTextarea1">
                  Assignee
                  <span class="text-danger">*</span>:
                </label>
                <select class="form-select" id="exampleForm.ControlInput1" {...register('Assignee')}>
                  <option value="">--Select--</option>
                </select>
              </div>

              <div class="col-lg-6">
                <label class="form-label" for="exampleForm.ControlTextarea1">
                  Reporter
                  <span class="text-danger">*</span>:
                </label>
                <select class="form-select" id="exampleForm.ControlInput1" {...register('Report')}>
                  <option value="">--Select--</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">
                Start Date<span class="text-danger">*</span>:</label>
                <input placeholder="Please start Date " type="date" id="exampleForm.ControlTextarea1" class="form-control" name="start_date" />
              </div></div><div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">End Date<span class="text-danger">*</span>:</label>
                <input placeholder="Please end Date" type="date" id="exampleForm.ControlTextarea1" class="form-control" name="last_date" /></div></div></div>


            <div class="row">

              <div class="col-lg-6">

                <div class="mb-1"><label class="form-label" for="exampleForm.ControlInput1">
                  Priority <span class="text-danger">*</span>:</label>
                  <select name="priority" class="form-select" id="exampleForm.ControlInput1" disabled="">
                    <option>Medium</option><option value="1">High</option><option value="2">Medium</option>
                    <option value="3">Low</option></select></div>

              </div>
              <div class="col-lg-6">

                <div class="mb-2">
                  <label class="form-label" for="exampleForm.ControlTextarea1">Status<span class="text-danger">*</span>:</label>
                  <input disabled="" name="status" placeholder="Live" type="text" id="exampleForm.ControlTextarea1" class="form-control" />
                </div></div></div>
            <div className='update_btn'><button type="submit" className='btn btn-info'>update</button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseData}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowData}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      <UpdateTask modal={openEditModal} closeModal={closeupdatemodal} editData={editData} />


    </>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
