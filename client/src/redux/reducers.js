// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { addProject, getProject, updateProject, deleteProject, getProjectById } from './projects/reducers';
import { getAllMileStones, deleteMileStone, getMileStone ,updateMilestone,addAllmilstones } from './milestone/reducer';
import { addSprint ,getAllSprints ,deleteSprint,getSingleSprint,updateSprint } from './sprint/reducres';
import { createTaskReducer } from './task/reducer';
import { getAllUsers,deleteUser } from './user/reducer';
export default (combineReducers({
    Auth,
    Layout,
    addProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllMileStones,
    addAllmilstones,
    deleteMileStone,
    getMileStone,
    addSprint,
    getAllSprints,deleteSprint,getSingleSprint,createTaskReducer,updateMilestone,getAllUsers,deleteUser,updateSprint
}): any);
