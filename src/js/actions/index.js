import { 
    userInsurancePlans,
    deductibles
} from "../constants/api";
import { 
    ADD_INSURANCE_PLAN,
    ADD_DEDUCTIBLE
} from '../constants/action-types';
import store from '../store/index';

export function getUserInsurancePlans(userID) {
    store.dispatch((dispatch) => {
        fetch(userInsurancePlans+userID)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: ADD_INSURANCE_PLAN, payload: json });
        });
    });
}

export function getDeductible(id) {
    store.dispatch((dispatch) => {
        fetch(deductibles+id)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: ADD_DEDUCTIBLE, payload: json });
          });
    });
}