import SprintTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };


export const addSprint = (data): AuthAction => ({
    type: SprintTypes.ADD_SPRINT,
    payload: data
})
export const getAllSprint = (data): AuthAction => ({
    type: SprintTypes.GET_ALL_SPRINT,
    payload: data
})
export const deleteSprint = (data): AuthAction => ({
    type: SprintTypes.DELETE_SPRINT,
    payload: data
})
export const getSprintById = (data): AuthAction => ({
    type: SprintTypes.GET_SPRINT_BY_ID,
    payload: data
})
export const updateSprint = (data): AuthAction => ({
    type: SprintTypes.UPDATE_SPRINT,
    payload: data
})