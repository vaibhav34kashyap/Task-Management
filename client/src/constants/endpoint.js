// end points
export const AddProject = "/project/add";
export const GetAllProject = "/project/getProjects?status=";
export const UpdateProjectDetails = "/project/update";
export const DeleteProject = "/project/updateStatus";
export const GetProjectById = "/project/getbyprojectid/";
export const GetAllMileStones = "/milestone?";
export const MileStoneDelete = "/milestone/updateStatus"
export const MileStoneAdd = "/milestone/add"
export const ParticularMilestoneDetail = "/milestone/getmilestonebyid/";
export const AddSprint = "/sprint/add";
export const GetAllSprints = "/sprint";
export const DeleteSprint = "/sprint/updateStatus";
export const ParticularSprintDetail = "/sprint/getsprintbyid/";
export const getAllSingleSprint = "/sprint/getAMilestoneAllSprints?id="
// create task 
export const CREATE_TASK = "/task/createtask";
export const UPDATE_MILESTONE = "/milestone/update";
export const ALL_USERS = "/users";
export const deleteUsers = "/users/usersDelete/";
export const UpdateSprint = "/sprint/update";
export const SingleMilestone = "/milestone/getAProjectMilestones?id="
export const SingleSprintTask = "/task/getSprintTasks?id="
export const GetAllTask = "/task/getTasksAccToStatus"
export const UpdateTask = "/task/updatetaskdetails"
export const InviteUser = "/users/register"
export const AddTechnology ="/technology/addTechnology"
export const GetTechnology ="/technology/getTechnology?status="
export const UpdateTechnology ="/technology/updateTechnology"
export const DeleteTechnology ="/technology/updateTechnologyStatus"
export const AddCategoryTechnology ="/technology/addTechCategory"
export const GetCategoryTechnology ="/technology/getTechCategory?status="
export const UpdateCategoryTechnology ="/technology/updateTechCategory"
export const DeleteCategoryTechnologyy ="/technology/updateTechCategoryStatus"