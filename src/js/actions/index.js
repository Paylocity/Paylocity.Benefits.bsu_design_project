import { userInsurancePlans, deductibles } from "../constants/action-types";

export const getUserInsurancePlans = async () => {
    return fetch(userInsurancePlans)
        .then(response => response.json())
        .then(json => {
            return { type: "USER_INSURANCE_PLANS", payload: json };
        });
}

export const getDeductible = async () => {
    return fetch(deductibles)
        .then(response => response.json())
        .then(json => {
            return { type: "DEDUCTIBLE", payload: json}
        });
}