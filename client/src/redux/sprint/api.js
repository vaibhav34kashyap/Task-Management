import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()

export function addSprintApi(data): any {
    return api.create(URL.AddSprint, data.payload)
}
export function getallSprintApi(data): any {
    return api.get(URL.GetAllSprints, data.payload)
}
export function deleteSprintApi(data): any {
    return api.update(URL.DeleteSprint , data.payload)
}
export function getSingleSprintApi(data): any {
    return api.get(URL.ParticularSprintDetail + data?.payload)
}
export function getAllSingleSprintApi(data): any {
    // return api.get(URL.getAllSingleSprint + data?.payload)
    return api.get(`${URL.getAllSingleSprint}${data?.payload?.id}&status=${data.payload.status}`)
}
export function updateSprintApi(data): any {
    return api.update(URL.UpdateSprint, data.payload)
}

