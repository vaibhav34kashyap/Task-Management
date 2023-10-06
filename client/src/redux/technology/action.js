import TECHNOLOGY_TYPES from "./constant";

type AuthAction = { type: string, payload: {} | string };

export const createTechnology = (data): AuthAction => ({
    type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY,
    payload: data
})

export const getAllTechnology= (data): AuthAction => ({
    type: TECHNOLOGY_TYPES.GET_TECHNOLOGY,
    payload: data
})
export const updateTechnology= (data): AuthAction => ({
    type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY,
    payload: data
})