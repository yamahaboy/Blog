import {Reducer} from "@reduxjs/toolkit";
import {UserReducerEnum} from "./actionTypes";
import { getLocalStorageWithTime } from '../../../utils/addTimeToExpireToStorage';
import { UserProps } from "../../../models/UserProps";


type UserReducerType = {
    user: UserProps | null | undefined
    accessToken: string | null

}

const defaultState:UserReducerType = {
    user: null,
    accessToken: getLocalStorageWithTime('authToken') === false ? getLocalStorageWithTime('authToken') as string : null
}


const userReducer: Reducer<UserReducerType> = (state = defaultState, action) => {
    switch (action.type) {
        case UserReducerEnum.LOGIN:
            return {...state, user: action.userData}
        case UserReducerEnum.LOGOUT:
            return {...state, user: null}
        case UserReducerEnum.LOGOUT_BY_REFRESH:
            return {...state, user: null}
        case UserReducerEnum.SET_ACCESS_TOKEN:
            return {...state, accessToken: action.accessToken}
        default:
            return {...state}
    }
}

export default userReducer