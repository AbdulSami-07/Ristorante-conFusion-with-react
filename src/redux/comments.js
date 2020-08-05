import *  as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess : null,
    comments : []
}, action) => { //Reducer function. 
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading : false, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading : false, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)}

        default:
            return state;
    }
}