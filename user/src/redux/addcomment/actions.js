import Addcomment from "../../redux/addcomment/constants"

export const addComment = (data) => ({
    type: Addcomment.ADD_COMMENT,
    payload: data
})

export const getComment = (data) => ({
    type: Addcomment.GET_COMMENT,
    payload: data
})