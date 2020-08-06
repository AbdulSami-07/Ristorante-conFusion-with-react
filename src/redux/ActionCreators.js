import *  as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


 //this is a thunk.
export const postComment =  (dishId, rating, author, comment) => (dispatch) =>{

    const newComment = { 
        dishId : dishId,
        rating : rating,
        comment: comment,
        author : author
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments',{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment),
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            let error = new Error('Error ' + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>{
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response =>  response.json())
        .then(response => dispatch(addComment(response)))
    .catch(error =>{
        console.log("Post commetns " + error.message);
        alert('Comment not posted: ' + error.message);
    });
};


export const fetchDishes = () => (dispatch) => {             
    dispatch(dishesLoading());
    
    return fetch(baseUrl + 'dishes')
                .then(response => {
                    if(response.ok){
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error =>{
                    let errmess = new Error(error.message);
                    throw errmess;
                })
                .then(response =>  response.json())
                    .then(dishes => dispatch(addDishes(dishes)))
                .catch(error =>dispatch(dishesFailed(error.message)));
}

export const fetchComments = () => (dispatch) => {             
    
    return fetch(baseUrl + 'comments')
                .then(response => {
                    if(response.ok){
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error =>{
                    let errmess = new Error(error.message);
                    throw errmess;
                })
                .then(response =>  response.json())
                    .then(comments => dispatch(addComments(comments)))
                .catch(error =>dispatch(commentsFailed(error.message)));
}

export const fetchPromos = () => (dispatch) => {             
    dispatch(promosLoading());
    
    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            let error = new Error('Error ' + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>{
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response =>  response.json())
        .then(promos => dispatch(addPromos(promos)))
    .catch(error =>dispatch(promosFailed(error.message)));
}

//action creaters
export const addComment = (comment) => ({  
    type : ActionTypes.ADD_COMMENT,
    payload : comment
});

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHED_FAILED,
    payload : errmess
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload : errmess
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});


export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload : errmess
});

export  const addDishes = (dishes) =>({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export  const addComments = (comments) =>({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export  const addPromos = (promos) =>({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});