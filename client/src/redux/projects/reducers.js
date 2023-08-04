import ProjectTypes from "./constant";

const ADD_PROJECT_INITIAL_STATE = {
    data: [],
    message: "",
    loading: false
}
export const addProject = (state = ADD_PROJECT_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectTypes.ADD_PROJECT_LOADING:
            return {
                data: ADD_PROJECT_INITIAL_STATE.data,
                loading: true,
            };
        case ProjectTypes.ADD_PROJECT_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };
        case ProjectTypes.ADD_PROJECT_RESET:
            return {
                data: ADD_PROJECT_INITIAL_STATE.data,
                loading: false,
            };
        case ProjectTypes.ADD_PROJECT_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};