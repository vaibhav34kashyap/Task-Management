// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import { addProject ,getProject ,updateProject,deleteProject,getProjectById} from './projects/reducers';
import { getAllMileStones ,deleteMileStone} from './milestone/reducer';
export default (combineReducers({
    Auth,
    Layout,
    addProject,getProject,updateProject,deleteProject,getProjectById,getAllMileStones,deleteMileStone
}): any);
