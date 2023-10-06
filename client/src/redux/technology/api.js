import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()

export function createTechnologyApi(data): any {
    return api.create(URL.AddTechnology, data.payload)
}
export function getAllTechnologyApi(data): any {
    return api.get(`${URL.GetTechnology}${data.payload.status}`)
}
    // return api.get(URL.GetTechnology + data.payload)

export function UpdateTechnologyApi(data): any {
    return api.update(URL.UpdateTechnology, data.payload)
}