import TASK_TYPES from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const createTask = (data): AuthAction => ({
    type: TASK_TYPES.CREATE_TASK,
    payload: data
})