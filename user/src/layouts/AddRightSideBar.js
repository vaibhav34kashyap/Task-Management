import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { createTask } from "../redux/actions";
import { useParams } from "react-router-dom";


export default function RightBar(props) {
 
 
  const { showModal, setShowModal, content,projectId,mileStoneId,sprintId } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const dispatch=useDispatch()

  const onSubmit=(e)=>{
    const dataList ={
      projectId:sessionStorage.getItem('projectId'),
      milestoneId:sessionStorage.getItem('mileStoneId'),
      sprintId:sessionStorage.getItem('sprintId'),
      summary:e.Summary,
      description:e.Description,
      assigneeId:e.Assignee,
      reporterId:e.Report,
      priority:e.priority,
      startDate:e.start_date,
      dueDate:e.last_date,
      status:1,
  }
if(sessionStorage.getItem('projectId') !== '' && sessionStorage.getItem('mileStoneId') !== '' && sessionStorage.getItem('sprintId') !== ''){
  dispatch(createTask(dataList))
}
else{
  alert("plsease select project");
}
    
    sessionStorage.setItem('projectId','')
    sessionStorage.setItem('mileStoneId','')
    sessionStorage.setItem('sprintId','')
    setShowModal(false);
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

                  <select name="Assignee" class="form-select"  id="exampleForm.ControlInput1" {...register("Assignee")}>
                  <option value="">--Select--</option><option value="651fe69edc2c29808d08a6e5"> 
                  Ajay </option><option value="65264cca1ba6b52acbea2731"> 
                  Demo </option><option value="652695c3950dc346ff6fee62"> Ritika </option>
                  <option value="652f5c3f87988c4f0654b966"> new </option>
                  </select>

                  {/* <input placeholder="Please Enter Assignee" type="text" id="exampleForm.ControlTextarea1" class="form-control" {...register("Assignee")} /> */}
                </div></div>
                <div class="col-lg-6">
                  <div class="mb-2">
                    <label class="form-label" for="exampleForm.ControlInput1">Report  <span class="text-danger">*</span>:</label>
                    <select name="Reporter" defaultValue='Admin' class="form-select" id="exampleForm.ControlInput1" {...register("Report")}><option value="">--Select--</option>
                    <option value="651fb9421a1c8c7b228c3ed5"> Admin </option>
                    <option value="651fba4a271bfb7c6008f9cc"> Employee </option></select>
                    {/* <input placeholder="Please Enter Report" type="text" id="exampleForm.ControlInput1" class="form-control"  {...register("Report")} /> */}
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
                    <select name="Priority" class="form-select" id="exampleForm.ControlInput1" {...register("priority")}><option>-----select----</option><option value="1">High</option>
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
