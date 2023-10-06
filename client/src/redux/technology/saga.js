import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import TECHNOLOGY_TYPES from './constant';
import { UpdateTechnologyApi, createTechnologyApi, getAllTechnologyApi } from './api';
function* createTechnologyFunction({ payload }) {
    try {
        yield put({
            type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_LOADING,
            payload: {}
        })
        const response = yield call(createTechnologyApi, { payload });
        
        if (response.data.status) {
            yield put({
                type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_RESET,
                payload: {},
            });
        }
        else {
            yield put({
                type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TECHNOLOGY_TYPES.CREATE_TECHNOLOGY_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* getAllTechnologyFunction({ payload }) {
    try {
        yield put({
            type: TECHNOLOGY_TYPES.GET_TECHNOLOGY_LOADING,
            payload: {}
        })
        const response = yield call(getAllTechnologyApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: TECHNOLOGY_TYPES.GET_TECHNOLOGY_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: TECHNOLOGY_TYPES.GET_TECHNOLOGY_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: TECHNOLOGY_TYPES.GET_TECHNOLOGY_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TECHNOLOGY_TYPES.GET_TECHNOLOGY_ERROR,
            payload: { message: error?.message }
        });

    }
}
function* updateTechnologyFunction({ payload }) {
    try {
        yield put({
            type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_LOADING,
            payload: {}
        })
        const response = yield call(UpdateTechnologyApi, { payload });
        console.log(response,"bbbvvv")
        if (response.data.status) {
            yield put({
                type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_RESET,
            //     payload: {},
            // });
        }
        else {
            yield put({
                type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_ERROR,
                payload: { ...response.data }
            });
        }

    } catch (error) {
        yield put({
            type: TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY_ERROR,
            payload: { message: error?.message }
        });

    }
}
export function* createTechnologySaga(): any {
    yield takeEvery(TECHNOLOGY_TYPES.CREATE_TECHNOLOGY, createTechnologyFunction);
}
export function* getAllTechnology(): any {
    yield takeEvery(TECHNOLOGY_TYPES.GET_TECHNOLOGY, getAllTechnologyFunction);
}
export function* updateTechnology(): any {
    yield takeEvery(TECHNOLOGY_TYPES.UPDATE_TECHNOLOGY, updateTechnologyFunction);
}
function* AllTechnologySaga(): any {
    yield all([
        fork(createTechnologySaga),
        fork(getAllTechnology),
        fork(updateTechnology)
    ])
}
export default AllTechnologySaga;