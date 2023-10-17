import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import {createTask} from '../../../client/src/redux/actions'
import { useParams } from "react-router-dom";


export default function RightBar(props) {
  const { showModal, setShowModal, content } = props;
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { projectId,milestoneId,spriteId} = useParams();
  const dispatch=useDispatch()

  const onSubmit=(e)=>{
    const dataList = {
      projectId:projectId,
      milestoneId:milestoneId,
      sprintId:spriteId,
      summary:e.Summary,
      Description:e.Description,
      AssigneeId:e.Assignee,
      reporterId:e.Report,
      priority:e.priority,
      startDate:e.start_date,
      dueDate:e.dueDate,
      status:1
    }

    // dispatch(createTask(dataList))
    console.log(dataList)
  }
  

  useEffect(() => {

    // call click outside
  }, []);



  return (
    <div
      className={showModal ? "rightBar show" : "rightBar"}
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Task</h3>
          <button
            type="button"
            className="close "
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">

          </h4>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae nulla ut ex lobortis aliquet eu non urna. Morbi fringilla,
            nulla sit amet vulputate lobortis, justo lectus porta erat, vitae
        
          </p> */}

        </div>

        <div className="modal-body">
          <p>{content}</p>
          <div className="model-content-detail">
            <form class="" onSubmit={handleSubmit(onSubmit)}>
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-2">
                    {/* <label class="form-label" for="exampleForm.ControlInput1">Project  <span class="text-danger">*</span>:</label> */}
                    <input placeholder="project id" type="hidden" id="exampleForm.ControlInput1" class="form-control" {...register("projectid")} />
                  </div></div>
                <div class="col-lg-6"><div class="mb-2">
                {/* <label class="form-label" for="exampleForm.ControlTextarea1">Milestone
                  <span class="text-danger">*</span>:</label> */}
                  <input placeholder="milestone id" type="hidden" id="exampleForm.ControlTextarea1" class="form-control" {...register("milestoneid")} />
                </div></div>
              </div>
              <div class="row">
                <div class="col-lg-6"><div class="mb-2">
                {/* <label class="form-label" for="exampleForm.ControlTextarea1">Sprint
                  <span class="text-danger">*</span>:</label> */}
                  <input placeholder="sprint id" name="clientName" type="hidden" id="exampleForm.ControlTextarea1" class="form-control" {...register("sprintid")} />
                </div></div>

             
                {/* <div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlInput1">Type Of Project 
         <span class="text-danger">*</span>:</label><select name="project_type" class="form-select" id="exampleForm.ControlInput1">
         <option>Choose an Project Type </option><option value="T&amp;M">T&amp;M</option><option value="Fixed Cost">Fixed Cost</option>
         <option value=" Hourly">Hourly</option><option value="Dedicated team">Dedicated team</option></select></div>
         </div> */}


              </div>

              <div class="row">
          

                <div class="col-lg-6"><div class="mb-2">
                <label class="form-label" for="exampleForm.ControlTextarea1">Summary
                  <span class="text-danger">*</span>:</label>
                  <input placeholder="Please Enter Summary" type="text" id="exampleForm.ControlTextarea1" class="form-control" {...register("Summary")} />
                </div></div>
                <div class="col-lg-6">
                  <div class="mb-2">
                    <label class="form-label" for="exampleForm.ControlInput1">Description  <span class="text-danger">*</span>:</label>
                    <input placeholder="Please Enter Description" type="text" id="exampleForm.ControlInput1" class="form-control" {...register("Description")} />
                  </div></div>


              </div>
              <div class="row">
            
                <div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">Assignee
                  <span class="text-danger">*</span>:</label>
                  <input placeholder="Please Enter Assignee" type="text" id="exampleForm.ControlTextarea1" class="form-control" {...register("Assignee")} />
                </div></div>
                <div class="col-lg-6">
                  <div class="mb-2">
                    <label class="form-label" for="exampleForm.ControlInput1">Report  <span class="text-danger">*</span>:</label>
                    <input placeholder="Please Enter Report" type="text" id="exampleForm.ControlInput1" class="form-control"  {...register("Report")} />
                  </div></div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">Start Date<span class="text-danger">*</span>:</label>
                    <input placeholder="Please start Date " type="date" id="exampleForm.ControlTextarea1" class="form-control" {...register("start_date")} />
                  </div>
                </div>
                <div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">End Date<span class="text-danger">*</span>:</label>
                  <input placeholder="Please end Date" type="date" id="exampleForm.ControlTextarea1" class="form-control" {...register("last_date")} /></div></div>
              </div>
              <div class="row">
              
                <div class="col-lg-6">
                 
                    <div class="mb-1"><label class="form-label" for="exampleForm.ControlInput1"> Priority <span class="text-danger">*</span>:</label>
                    <select name="Priority" class="form-select" id="exampleForm.ControlInput1"><option>-----select----</option><option value="1">High</option>
                    <option value="2">Medium</option><option value="3">Low</option></select>
                    </div>

                  </div>
                  <div class="col-lg-6"><div class="mb-2"><label class="form-label" for="exampleForm.ControlTextarea1">Status<span class="text-danger">*</span>:</label>
                <input disabled="Live" name="status" placeholder="Live" type="text" id="exampleForm.ControlTextarea1" class="form-control" /></div></div>
              </div>
           
              <div class="row">
             

                </div><div class="row"><div class="text-start d-flex align-items-center justify-content-center col">
                  <button type="submit" class="btn btn-sm  text-white pt-1 pb-1 mt-3 web_button  btn btn-info">Add</button></div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
