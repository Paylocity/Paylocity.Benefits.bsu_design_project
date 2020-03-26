import { ADD_INSURANCE_PLAN, ADD_DEDUCTIBLE } from '../constants/action-types';

const initialState = {
    insurancePlans: [],
    deductibles: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_INSURANCE_PLAN: {
            return Object.assign({}, state, {
                insurancePlans: state.insurancePlans.concat(action.payload)
            });
        }
        case ADD_DEDUCTIBLE: {
            return Object.assign({}, state, {
                deductibles: state.deductibles.concat(action.payload)
            });
        }
    }

    return state;
}

export default rootReducer;