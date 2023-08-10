import * as URL from "../../constants/endpoint"
import { APICore } from "../../helpers/api/apiCore"
const api = new APICore()

export function createTaskApi(data): any {
    return api.create(URL.CREATE_TASK, data.payload)
}