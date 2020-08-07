// import *  as ActionTypes from './ActionTypes';
 
 
export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: '',
    contactType: 'Tel.',
    message: ''
}

// export const Feedback = (state = {
//     errMess : null,
//     feedback : InitialFeedback
// },action) => {
//     switch(action.type) {
//         case ActionTypes.ADD_FEEDBACK:
//             return {...state,errMess:null,feedback:action.payload};
        
//         case ActionTypes.FEEDBACK_FAILED:
//             return {...state,errMess:action.payload};

//         default:
//             return state;
            
//     }
// }