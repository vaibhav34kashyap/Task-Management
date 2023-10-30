import Addcomment from "../../redux/addcomment/constants"

const ADD_ALL_COMMENT={
    data: [],
    message: "",
    loading: false
}

const GET_ALL_COMMENT={
    data: [],
    message: "",
    loading: false
}

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

export const getAddCommentreducer = (state = GET_ALL_COMMENT, action) => {
    switch (action.type) {
        case Addcomment.GET_COMMENT_LOADING:
            return {
                data: GET_ALL_COMMENT.data,
                loading: true,
            };
        case Addcomment.GET_COMMENT_SUCCESS:
            return {
                data: action?.payload,
                loading: false,
            };


        case Addcomment.GET_COMMENT_ERROR:
            return {
                data: [],
                loading: false,
                message: action?.payload,
            };
        default:
            return { ...state };

    }
};