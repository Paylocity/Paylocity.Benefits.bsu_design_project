import { userInsurancePlans, deductibles } from "../constants/api";
import { ADD_INSURANCE_PLAN, ADD_DEDUCTIBLE, CHANGE_VIEW } from '../constants/action-types';

export function changeView(payload) {
    return { type: CHANGE_VIEW, payload };
}

export function getUserInsurancePlans() {
    return function(dispatch) {
        return fetch(userInsurancePlans)
          .then(response => response.json())
          .then(json => {
              dispatch({ type: ADD_INSURANCE_PLAN, payload: json });
          });
    }
}

export function getDeductible() {
    return function(dispatch) {
        return fetch(deductibles)
          .then(response => response.json())
          .then(json => {
              dispatch({ type: ADD_DEDUCTIBLE, payload: json });
          });
    }
}