// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { addProject, getProject, updateProject, deleteProject, getProjectById } from './projects/reducers';
import {
    getAllMileStones,
    deleteMileStone,
    getMileStone,
    updateMilestone,
    addAllmilstones,
    getSigleMileStone,
} from './milestone/reducer';
import { addSprint, getAllSprints, deleteSprint, getSingleSprintReducer, updateSprint ,getAllSingleSprints  } from './sprint/reducres';
import { createTaskReducer, getSigleSprintTask,getAllTaskReducer,UpdateTaskReducer} from './task/reducer';
import { getAllUsers, deleteUser ,createUser} from './user/reducer';
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
    getAllSprints,
    deleteSprint,
    getSingleSprintReducer,
    createTaskReducer,
    updateMilestone,
    getAllUsers,
    deleteUser,
    updateSprint,
    getSigleMileStone,
    getSigleSprintTask,
    getAllSingleSprints,getAllTaskReducer,UpdateTaskReducer,createUser
}): any);
