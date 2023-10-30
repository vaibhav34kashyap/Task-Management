import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import TASK_TYPES from './constant';
import { GetTaskSummaryApi, TaskStatusApi, UpdateTaskApi, createTaskApi, deleteTaskApi, getAllTaskApi, getSingleSprintTaskApi,updateTaskStatusApi } from './api';

function* createTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.CREATE_TASK_LOADING,
            payload: {}
        })
        
        const response = yield call(createTaskApi, { payload });
    //   alert(response)
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
                payload: { ...response?.data },
            });
            // yield put({
            //     type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_ERROR,
                payload: { ...response?.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.GET_SINGLE_SPRINT_TASK_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* getAllTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.GET_ALL_TASK_LOADING,
            payload: {}
        })
        const response = yield call(getAllTaskApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.GET_ALL_TASK_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: TASK_TYPES.GET_ALL_TASK_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: TASK_TYPES.GET_ALL_TASK_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.GET_ALL_TASK_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* updateTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.UPDATE_TASK_LOADING,
            payload: {}
        })
        const response = yield call(UpdateTaskApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.UPDATE_TASK_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TASK_TYPES.UPDATE_TASK_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TASK_TYPES.UPDATE_TASK_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.UPDATE_TASK_ERROR,
            payload: { message: error?.message }
        });

    }
}


function* deleteTaskFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.DELETE_TASK_LOADING,
            payload: {}
        })
        const response = yield call(deleteTaskApi, { payload });
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.DELETE_TASK_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TASK_TYPES.DELETE_TASK_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TASK_TYPES.DELETE_TASK_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.DELETE_TASK_ERROR,
            payload: { message: error?.message }
        });
        yield put({
            type: TASK_TYPES.DELETE_TASK_RESET,
            payload: {},
        });

    }
}
function* updateTaskStatusFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.UPDATE_TASK_STATU_LOADING,
            payload: {}
        })
        const response = yield call(updateTaskStatusApi, { payload });
        console.log("dssfksf",payload)
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.UPDATE_TASK_STATU_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TASK_TYPES.UPDATE_TASK_STATU_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TASK_TYPES.UPDATE_TASK_STATU_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.UPDATE_TASK_STATU_ERROR,
            payload: { message: error?.message }
        });
        yield put({
            type: TASK_TYPES.UPDATE_TASK_STATU_RESET,
            payload: {},
        });

    }
}

function* TaskStatusFunction({ payload }) {
    try {
        yield put({
            type: TASK_TYPES.TASK_STATUS_LOADING,
            payload: {}
        })
        const response = yield call(TaskStatusApi, { payload });
        console.log("dssfksf",payload)
        if (response.data.status) {
            yield put({
                type: TASK_TYPES.TASK_STATUS_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TASK_TYPES.TASK_STATUS_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TASK_TYPES.TASK_STATUS_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TASK_TYPES.TASK_STATUS_ERROR,
            payload: { message: error?.message }
        });
        yield put({
            type: TASK_TYPES.TASK_STATUS_RESET,
            payload: {},
        });

    }
}

export function* createTaskSaga(): any {
    yield takeEvery(TASK_TYPES.CREATE_TASK, createTaskFunction);
}
export function* getSingleSprintTaskSaga(): any {
    yield takeEvery(TASK_TYPES.GET_SINGLE_SPRINT_TASK, getSingleSprintTaskFunction);
}
export function* getAllTaskSaga(): any {
    yield takeEvery(TASK_TYPES.GET_ALL_TASK, getAllTaskFunction);
}
export function* updateTaskSaga(): any {
    yield takeEvery(TASK_TYPES.UPDATE_TASK, updateTaskFunction);
}
export function* deleteTaskSaga(): any {
    yield takeEvery(TASK_TYPES.DELETE_TASK, deleteTaskFunction);
}
export function* updateTaskStatusSaga(): any {
    yield takeEvery(TASK_TYPES.UPDATE_TASK_STATUS, updateTaskStatusFunction);
}
export function* TaskStatusSaga(): any {
    yield takeEvery(TASK_TYPES.TASK_STATUS, TaskStatusFunction);
}

function* AllTaskSaga(): any {
    yield all([
        fork(createTaskSaga),
        fork(getSingleSprintTaskSaga),
        fork(getAllTaskSaga),
        fork(updateTaskSaga),
        fork(deleteTaskSaga),
        fork(updateTaskStatusSaga),
        fork(TaskStatusSaga),
        
    ])
}
export default AllTaskSaga;