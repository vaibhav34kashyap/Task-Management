// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { addProject, getProject, updateProject, deleteProject, getProjectById } from './projects/reducers';
import { getAllMileStones, deleteMileStone, getMileStone } from './milestone/reducer';
import { addSprint ,getAllSprints ,deleteSprint,getSingleSprint } from './sprint/reducres';
export default (combineReducers({
    Auth,
    Layout,
    addProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllMileStones,
    deleteMileStone,
    getMileStone,
    addSprint,
    getAllSprints,deleteSprint,getSingleSprint
}): any);
