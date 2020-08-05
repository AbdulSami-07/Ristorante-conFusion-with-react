import *  as ActionTypes from './ActionTypes';

export const Promotions = (state = {
    isLoading : true,
    errMess : null,
    promotions : []
}, action) => { //Reducer function. 
    switch(action.type) {
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading : false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading : true, errMess: null, promotions: []}; //all states remain except given in argument. 

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading : false, errMess: action.payload};
        
        default:
            return state;
    }
}