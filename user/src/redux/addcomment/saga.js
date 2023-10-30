import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import Addcomment from '../addcomment/constants';
import { addTaskCommentApi,getTaskCommentApi } from '../addcomment/api';

function* addTaskCommentFunction({ payload }) {
    try {
        yield put({
            type: Addcomment.ADD_COMMENT_LOADING,
            payload: {}
        })
        const response = yield call(addTaskCommentApi, { payload });
        if (response.data.status) {
            yield put({
                type: Addcomment.ADD_COMMENT_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: MileStoneType.GET_ALL_MILESTONES_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: Addcomment.ADD_COMMENT_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: Addcomment.ADD_COMMENT_ERROR,
            payload: { message: error?.message }
        });

    }
}

// function* getTaskCommentFunction({ payload }) {
//     try {
//         yield put({
//             type: Addcomment.GET_COMMENT_LOADING,
//             payload: {}
//         })
//         const response = yield call(getTaskCommentApi, { payload });
//         if (response.data.status) {
//             yield put({
//                 type: Addcomment.GET_COMMENT_SUCCESS,
//                 payload: { ...response.data },
//             });
//             // yield put({
//             //     type: MileStoneType.GET_ALL_MILESTONES_RESET,
//             //     payload: {},
//             // });
//         }
//         else {
//             yield put({
//                 type: Addcomment.GET_COMMENT_ERROR,
//                 payload: { ...response.data }
//             });
//         }

//     } catch (error) {
//         yield put({
//             type: Addcomment.GET_COMMENT_ERROR,
//             payload: { message: error?.message }
//         });

//     }
// }
export function* addAllTaskCommentsSaga(): any {
    yield takeEvery(Addcomment.ADD_COMMENT, addTaskCommentFunction);
}

// export function* getAllTaskCommentsSaga(): any {
//     yield takeEvery(Addcomment.GET_COMMENT, getTaskCommentFunction);
// }
function* Addcommentsaga(): any {
    yield all([

        fork(addAllTaskCommentsSaga),
        // fork(getAllTaskCommentsSaga)


    ])
}

export default Addcommentsaga;