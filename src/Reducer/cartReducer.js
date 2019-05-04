const INITIAL_STATE = {
    cart: [],
    error_msg: "",
    getCart: [],
    boughtCourse: [],
    alluser: [],
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const FAILED = 'FAILED';
export const GET_CART_BY_USER = 'GET_CART_BY_USER';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const BUY_COURSE = 'BUY_COURSE';
export const GET_BOUGHT_COURSE_BY_USER = 'GET_BOUGHT_COURSE_BY_USER';
export const GET_BUY_ALL_USER = 'GET_BUY_ALL_USER'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return Object.assign({}, state, { getCart: state.getCart.concat(action.addCartData), totalCart: state.totalCart + 1 });
        }
        case DELETE_FROM_CART: {
            return Object.assign({}, state, { getCart: [...state.getCart.filter(data => data.id !== action.cartId)] });
        }
        case GET_CART_BY_USER: {
            return Object.assign({}, state, { getCart: action.cart })
        }
        case GET_BOUGHT_COURSE_BY_USER: {
            return Object.assign({}, state, { boughtCourse: action.boughtCourse })
        }
        case GET_BUY_ALL_USER: {
            return Object.assign({}, state, { alluser: action.cartall })
        }
        case BUY_COURSE: {
            return Object.assign({}, state, { getCart: [...state.getCart.filter(data => data.id !== action.cartId)] })
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}