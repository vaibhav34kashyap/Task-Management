import * as URL from '../../constants/endpoint';
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();

export function createTaskApi(data): any {
    return api.create(URL.CREATE_TASK, data.payload);
}
export function getSingleSprintTaskApi(data): any {
    return api.get(`${URL.SingleSprintTask}${data.payload.id}&activeStatus=${data.payload.activeStatus}&skip=${data.payload.skip}`);
}
export function getAllTaskApi(data): any {
    return api.get(URL.GetAllTask, data.payload);
}
export function UpdateTaskApi(data): any {
    return api.update(URL.UpdateTask, data.payload);
}
export function deleteTaskApi(data): any {
    return api.delete(URL.DeleteTask+ data.payload);
}

export function updateTaskStatusApi(data): any {
    console.log("task",data.payload)
    return api.update(URL.UpdateTaskStatus, data.payload);
}