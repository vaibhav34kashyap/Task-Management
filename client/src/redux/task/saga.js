import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import TASK_TYPES from './constant';
import { createTaskApi, getSingleSprintTaskApi } from './api';

function* createTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.CREATE_TASK_LOADING,
            payload: {}
        })
        const response = yield call(createTaskApi, { payload });
        
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.CREATE_TASK_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TASK_TYPES.CREATE_TASK_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TASK_TYPES.CREATE_TASK_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.CREATE_TASK_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* getSingleSprintTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_LOADING,
            payload: {}
        })
        const response = yield call(getSingleSprintTaskApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_ERROR,
            payload: { message: error?.message }
        });

    }
}
export function* createTaskSaga(): any {
    yield takeEvery(TASK_TYPES.CREATE_TASK, createTaskFunction);
}
export function* getSingleSprintTaskSaga(): any {
    yield takeEvery(TASK_TYPES.GET_SINGLE_SPRINT_TASK, getSingleSprintTaskFunction);
}
function* AllTaskSaga(): any {
    yield all([
        fork(createTaskSaga),
        fork(getSingleSprintTaskSaga),
    ])
}
export default AllTaskSaga;