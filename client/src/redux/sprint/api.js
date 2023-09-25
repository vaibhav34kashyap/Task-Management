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
    return api.updatePatch(URL.DeleteSprint + data.payload)
}
export function getSingleSprintApi(data): any {
    return api.get(URL.ParticularSprintDetail + data?.payload)
}