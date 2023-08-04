import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProjectTypes from './constant';
import { addProjectApi } from './api';
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
export function* addProjectSaga(): any {
    yield takeEvery(ProjectTypes.ADD_PROJECT, addProjectFunction);
}

function* AllProjectSaga(): any {
    yield all([
        fork(addProjectSaga),
       
    ])
}

export default AllProjectSaga;