import {all, fork, put, takeEvery } from "redux-saga/effects";
import { actionTypes } from "./constant";




export function* watchAdd() {
    yield takeEvery(actionTypes.ADD_NUMBER, sum);
}