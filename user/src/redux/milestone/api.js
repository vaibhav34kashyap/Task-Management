import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()


export function getAllMileStonesApi(data): any {
    const { status } = data?.payload
    return api.get(`${URL.GetAllMileStones}activeStatus=${status}`)
}

export function projectAllMilstonesApi(data):any{
    return api.get(URL.ProjectAllMilestones+"?projectId="+data?.payload.projectId+"&activeStatus="+data.payload.status)
}
export function addAllMilstoneApi(data): any {
    return api.create(URL.MileStoneAdd, data.payload)
}
export function deleteMileStoneApi(data): any {
    return api.update(URL.MileStoneDelete, data.payload)
    // return api.update(`${URL.MileStoneDelete}${data?.payload}`)
}
export function getMileStoneApi(data): any {

    return api.get(URL.ParticularMilestoneDetail + data?.payload)
}
export function UpdateMileStonesApi(data): any {
    return api.update(URL.UPDATE_MILESTONE, data.payload)
}
export function getSinleMileStoneApi(data): any {
    // return api.get(URL.SingleMilestone + data?.payload)
     return api.get(`${URL.SingleMilestone}${data?.payload?.id}&status=${data.payload.status}`)
}