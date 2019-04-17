import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer/index';

const composeEnhancer =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const Role = localStorage.getItem("role");
const Name = localStorage.getItem("Name");
const INITIAL_STATE = {
    auth: {
        token: "",
        Role: '',
        userId: '',
        Name: ""
    }
}

if (token && userId && Role) {
    INITIAL_STATE.auth.token = token;
    INITIAL_STATE.auth.userId = userId;
    INITIAL_STATE.auth.Role = Role;
    INITIAL_STATE.auth.Name = Name;
}

export default createStore(rootReducer, INITIAL_STATE, enhancer);   