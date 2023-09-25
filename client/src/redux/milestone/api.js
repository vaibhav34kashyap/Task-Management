import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()


export function getAllMileStonesApi(data): any {
    return api.get(URL.GetAllMileStones, data.payload)
}
export function deleteMileStoneApi(data): any {
    return api.updatePatch(URL.MileStoneDelete + data?.payload)
}
export function getMileStoneApi(data): any {
    console.log(data ,"ritika")
    return api.get(URL.ParticularMilestoneDetail + data?.payload)
}
export function UpdateMileStonesApi(data): any {
    return api.update(URL.UPDATE_MILESTONE, data.payload)
}