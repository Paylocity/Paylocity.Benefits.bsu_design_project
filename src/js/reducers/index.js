import {
    ADD_INSURANCE_PLAN,
    ADD_DEDUCTIBLE
} from '../constants/action-types';

const initialState = {
    insurancePlans: [],
    deductibles: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_INSURANCE_PLAN: {
            return { ...state,
                insurancePlans: action.payload['UserInsurancePlans']
            };
        }
        case ADD_DEDUCTIBLE: {
            return { ...state,
                deductibles: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export default rootReducer;