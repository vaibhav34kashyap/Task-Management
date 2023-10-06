
import TECHNOLOGY_TYPES from "./constant";
const INITIAL_STATE = {
    data:[],
    loading:false,
    message:""
}
export const createTechnologyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_LOADING:
            return {
                data: INITIAL_STATE.data,
                loading: true,
            };
        case TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };
        case TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_RESET:
            return {
                data: INITIAL_STATE.data,
                loading: false,
            };
        case TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};

export const getAllTechnologyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TECHNOLOGY_TYPES.GET_TECHNOLOGY_LOADING:
            return {
                data: INITIAL_STATE.data,
                loading: true,
            };
        case TECHNOLOGY_TYPES.GET_TECHNOLOGY_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };


        case TECHNOLOGY_TYPES.GET_TECHNOLOGY_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};
export const UpdateTechnologyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_LOADING:
            return {
                data: INITIAL_STATE.data,
                loading: true,
            };
        case TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };


        case TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};