// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { addProject } from './projects/reducers';
export default (combineReducers({
    Auth,
    Layout,
    addProject
}): any);
