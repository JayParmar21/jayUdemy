import * as authService from '../service/auth.js';
import { FAILED, LOGIN_SUCCESSFUL, LOGOUT } from '../Reducer/authReducer';

export const loginUser = (credentials) => {
    return (dispatch) => {
        authService.login(credentials)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("role", response.data.role)
                    localStorage.setItem("Name", response.data.fullname)
                    localStorage.setItem("userId", response.data.id)
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        data: { token: response.data.token, Role: response.data.role, Name: response.data.fullname, userId: response.data.id }
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: error.response.data.message }
                    });
                }
            });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("Name");
    }
};

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.signUp(credentials)
            .then((response) => {
                if (response.status === 200) {
                    let credentials_Login = {
                        email: credentials.email,
                        password: credentials.password
                    }
                    authService.login(credentials_Login)
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.setItem("token", response.data.token)
                                localStorage.setItem("role", response.data.role)
                                localStorage.setItem("Name", response.data.fullname)
                                localStorage.setItem("userId", response.data.id)
                                dispatch({
                                    type: LOGIN_SUCCESSFUL,
                                    data: { token: response.data.token, Role: response.data.role, Name: response.data.fullname, userId: response.data.id }
                                });
                            }
                        })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.message } });
                }
            })
    }
}