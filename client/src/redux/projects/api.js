import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()

export function addProjectApi(data): any {
    return api.create(URL.AddProject, data.payload)
}
export function getProjectApi(data): any {
    return api.get(URL.GetAllProject, data.payload)
}
export function updateProjectApi(data): any {
    return api.update(URL.UpdateProjectDetails, data.payload)
}
