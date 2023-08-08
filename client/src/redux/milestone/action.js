import MileStoneType from "./constant";
type AuthAction = { type: string, payload: {} | string };


export const getallMileStones = (data): AuthAction => ({
    type: MileStoneType.GET_ALL_MILESTONES,
    payload: data
})
export const deleteMileStone = (data): AuthAction => ({
    type: MileStoneType.DELETE_MILE_STONE,
    payload: data
})