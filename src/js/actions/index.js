import { userInsurancePlans, deductibles } from "../constants/api";
import { ADD_INSURANCE_PLAN, ADD_DEDUCTIBLE } from '../constants/action-types';

export const getUserInsurancePlans = async () => {
    return function(dispatch) {
        return fetch(userInsurancePlans)
          .then(response => response.json())
          .then(json => {
              dispatch({ type: ADD_INSURANCE_PLAN, payload: json });
          });
    }
}

export const getDeductible = async () => {
    return function(dispatch) {
        return fetch(deductibles)
          .then(response => response.json())
          .then(json => {
              dispatch({ type: ADD_DEDUCTIBLE, payload: json});
          });
    }
}