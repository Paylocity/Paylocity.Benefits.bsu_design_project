import { ADD_INSURANCE_PLAN, ADD_DEDUCTIBLE } from '../constants/action-types';

const initialState = {
    insurancePlans: [{"ID":"2","Description":"United Health Care COMPASS (individual in-network)"},{"ID":"12","Description":"Oxford Health (individual in-network)"},{"ID":"22","Description":"Harvard Pilgrim (individual in-network)"}],
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
        default: {
            return state;
        }
    }
}

export default rootReducer;