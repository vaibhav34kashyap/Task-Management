import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProjectTypes from './constant';
import { addProjectApi, getProjectApi, updateProjectApi } from './api';
function* addProjectFunction({ payload }) {
    try {
        yield put({
            type: ProjectTypes.ADD_PROJECT_LOADING,
            payload: {}
        })
        const response = yield call(addProjectApi, { payload });
        if (response.data.status) {
            yield put({
                type: ProjectTypes.ADD_PROJECT_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProjectTypes.ADD_PROJECT_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: ProjectTypes.ADD_PROJECT_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: ProjectTypes.ADD_PROJECT_ERROR,
            payload: { message: error?.message }
        });
        yield put({
            type: ProjectTypes.ADD_PROJECT_RESET,
            payload: {},
        });

    }
}
function* getProjectFunction({ payload }) {
    try {
        yield put({
            type: ProjectTypes.GET_PROJECT_LOADING,
            payload: {}
        })
        const response = yield call(getProjectApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: ProjectTypes.GET_PROJECT_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: ProjectTypes.GET_PROJECT_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: ProjectTypes.GET_PROJECT_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: ProjectTypes.GET_PROJECT_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* updateProjectFunction({ payload }) {
    try {
        yield put({
            type: ProjectTypes.UPDATE_PROJECT_DETAILS_LOADING,
            payload: {}
        })
        const response = yield call(updateProjectApi, { payload });
        if (response.data.status) {
            yield put({
                type: ProjectTypes.UPDATE_PROJECT_DETAILS_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProjectTypes.UPDATE_PROJECT_DETAILS_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: ProjectTypes.UPDATE_PROJECT_DETAILS_ERROR,
                payload: { ...response.data }
            });
            yield put({
                type: ProjectTypes.UPDATE_PROJECT_DETAILS_RESET,
                payload: {},
            });
        }

    } catch (error) {
        yield put({
            type: ProjectTypes.UPDATE_PROJECT_DETAILS_ERROR,
            payload: { message: error }
        });
        yield put({
            type: ProjectTypes.UPDATE_PROJECT_DETAILS_RESET,
            payload: {},
        });
    }
}
export function* addProjectSaga(): any {
    yield takeEvery(ProjectTypes.ADD_PROJECT, addProjectFunction);
}
export function* getProjectSaga(): any {
    yield takeEvery(ProjectTypes.GET_PROJECT, getProjectFunction);
}
export function* updateProjectSaga(): any {
    yield takeEvery(ProjectTypes.UPDATE_PROJECT_DETAILS, updateProjectFunction);
}
function* AllProjectSaga(): any {
    yield all([
        fork(addProjectSaga),
        fork(getProjectSaga),
        fork(updateProjectSaga)
       
    ])
}

export default AllProjectSaga;