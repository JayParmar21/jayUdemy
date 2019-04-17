import BaseService from './baseService'

export function login(credential) {
    return BaseService.post('/user/login', credential);
}

export function signUp(data) {
    debugger
    return BaseService.post('/user/signup', data);
}