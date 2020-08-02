import { DISHES } from '../shared/dishes';

export const Dishes = (state = DISHES, action) => { //Reducer function. 
    switch(action.type) {
        default:
            return state;
    }
}