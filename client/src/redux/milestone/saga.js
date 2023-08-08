import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import MileStoneType from './constant';
import { deleteMileStoneApi, getAllMileStonesApi } from './api';
    function* getAllMileStonesFunction({ payload }) {
        try {
            yield put({
                type: MileStoneType.GET_ALL_MILESTONES_LOADING,
                payload: {}
            })
            const response = yield call(getAllMileStonesApi, { payload });
            console.log(response,"bbbvvv")
            if (response.data.status) {
                yield put({
                    type: MileStoneType.GET_ALL_MILESTONES_SUCCESS,
                    payload: { ...response.data },
                });
                // yield put({
                //     type: MileStoneType.GET_ALL_MILESTONES_RESET,
                //     payload: {},
                // });
            }
            else {
                yield put({
                    type: MileStoneType.GET_ALL_MILESTONES_ERROR,
                    payload: { ...response.data }
                });
            }
    
        } catch (error) {
            yield put({
                type: MileStoneType.GET_ALL_MILESTONES_ERROR,
                payload: { message: error?.message }
            });
    
        }
    }
    function* MileStonedeleteFunction({ payload }) {
        try {
            yield put({
                type: MileStoneType.DELETE_MILE_STONE_LOADING,
                payload: {}
            })
            const response = yield call(deleteMileStoneApi, { payload });
            if (response.data.status) {
                yield put({
                    type: MileStoneType.DELETE_MILE_STONE_SUCCESS,
                    payload: { ...response.data },
                });
                yield put({
                    type: MileStoneType.DELETE_MILE_STONE_RESET,
                    payload: {},
                });
            }
            else {
                yield put({
                    type: MileStoneType.DELETE_MILE_STONE_ERROR,
                    payload: { ...response.data }
                });
            }
    
        } catch (error) {
            yield put({
                type: MileStoneType.DELETE_MILE_STONE_ERROR,
                payload: { message: error?.message }
            });
            yield put({
                type: MileStoneType.DELETE_MILE_STONE_RESET,
                payload: {},
            });
    
        }
    }
    export function* getAllMileStonesSaga(): any {
        yield takeEvery(MileStoneType.GET_ALL_MILESTONES, getAllMileStonesFunction);
    }
    export function* mileStoneDeleteSaga(): any {
        yield takeEvery(MileStoneType.DELETE_MILE_STONE, MileStonedeleteFunction);
    }
    function* AllMileStonesSaga(): any {
        yield all([
 
            fork(getAllMileStonesSaga),
            fork(mileStoneDeleteSaga),
   
        ])
    }
    
    export default AllMileStonesSaga;