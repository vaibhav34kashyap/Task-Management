import Addcomment from "../../redux/addcomment/constants"


const ADD_ALL_COMMENT={
    data: [],
    message: "",
    loading: false
}
const DELETE_COMMENT={
    data: [],
    message: "",
    loading: false
}

const UPDATE_COMMENT={
    data: [],
    message: "",
    loading: false
}

const GETHISTORY_INITAL_STATE={
    data: [],
    message: "",
    loading: false
}


// const GET_ALL_COMMENT={
//     data: [],
//     message: "",
//     loading: false
// }

export const addComments = (state = ADD_ALL_COMMENT, action) => {
    switch (action.type) {
        case Addcomment.ADD_COMMENT_LOADING:
            return {
                data: ADD_ALL_COMMENT.data,
                loading: true,
            };
        case Addcomment.ADD_COMMENT_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };


        case Addcomment.ADD_COMMENT_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};

export const deleteComment = (state = DELETE_COMMENT, action) => {
    switch (action.type) {
        case Addcomment.DELETE_TASK_LOADING:
            return {
                data: DELETE_COMMENT.data,
                loading: true,
            };
        case Addcomment.DELETE_TASK_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };
        case Addcomment.DELETE_TASK_RESET:
            return {
                data: DELETE_COMMENT.data,
                loading: false
            }

        case Addcomment.DELETE_TASK_ERROR:
            return {
                data: [],
                status: 403,
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};

export const updateComment = (state = UPDATE_COMMENT, action) => {
    switch (action.type) {
        case Addcomment.UPDATE_COMMENT_LOADING:
            return {
                data: UPDATE_COMMENT.data,
                loading: true,
            };
        case Addcomment.UPDATE_COMMENT_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };
        case Addcomment.UPDATE_COMMENT_RESET:
            return {
                data: UPDATE_COMMENT.data,
                loading: false
            }

        case Addcomment.UPDATE_COMMENT_ERROR:
            return {
                data: [],
                status: 403,
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};




export const getHistoryData = (state = GETHISTORY_INITAL_STATE, action) => {
    switch (action.type) {
        case Addcomment.GET_HISTORY_LOADING:
            return {
                data: GETHISTORY_INITAL_STATE.data,
                loading: true,
            };
        case Addcomment.GET_HISTORY_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };


        case Addcomment.GET_HISTORY_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};