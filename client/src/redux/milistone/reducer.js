import { actionTypes } from './constant';

const INTIAL_STATE={
    addition:0
}
export const AddReducer=(state=INTIAL_STATE, action)=>{
    console.log(state,"state");
    switch(action.type){
        case actionTypes.ADD_NUMBER:{
            return{
                ...state,
                addition:state.addition+1
            }
        }
    }
}