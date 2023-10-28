import SUMMARY_TYPES from "./constant";

type AuthAction = { type: string, payload: {} | string };
export const getTaskSummmaryDetail= (data): AuthAction => ({
    type: SUMMARY_TYPES.GET_TASK_SUMMARY,
    payload: data
})
export const getPriorityGraphAction= (data): AuthAction => ({
    type: SUMMARY_TYPES.GET_PRIORITY_GRAPH,
    payload: data
})