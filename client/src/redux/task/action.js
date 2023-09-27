import TASK_TYPES from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const createTask = (data): AuthAction => ({
    type: TASK_TYPES.CREATE_TASK,
    payload: data
})
export const getsingleSprintTask = (data): AuthAction => ({
    type: TASK_TYPES.GET_SINGLE_SPRINT_TASK,
    payload: data
})