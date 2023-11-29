import { UserProps } from '../../../models/UserProps';
import { UserReducerEnum } from './actionTypes';


export const setUserDataToStore = (userData: UserProps) => {
    console.log(userData, "set Userdata")
    return {type: UserReducerEnum.LOGIN, userData}
}

export const setAccessTokenToStore = (accessToken: string) => {
    console.log(accessToken, 'set access token')
    return {type: UserReducerEnum.SET_ACCESS_TOKEN, accessToken}
}
export const clearUserDataFromStore = () => {
    return {type: UserReducerEnum.LOGOUT}
}