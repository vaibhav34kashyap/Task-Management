import ProjectTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };


export const addProject = (data): AuthAction => ({
    type: ProjectTypes.ADD_PROJECT,
    payload: data
})

