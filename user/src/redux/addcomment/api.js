import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()


export function addTaskCommentApi(data): any {
    
    return api.create(URL.AddTaskComment,data?.payload)
    
}

export function getTaskCommentApi(data): any {
    
    return api.get(URL.GetTaskComment+data?.payload.taskId)
    
}