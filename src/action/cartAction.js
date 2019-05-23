import * as cartService from '../service/cartService';
import { FAILED, ADD_TO_CART, GET_CART_BY_USER, DELETE_FROM_CART, BUY_COURSE, GET_BOUGHT_COURSE_BY_USER, GET_BUY_ALL_USER } from '../Reducer/cartReducer';

export const addToCart = (data) => {
    return (dispatch) => {
        cartService.addToCart(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_TO_CART,
                        addCartData: response.data
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

export const getCartByUser = (userId) => {
    return (dispatch) => {
        debugger
        cartService.getCartByUser(userId)
            .then((response) => {
                debugger
                if (response.status === 200) {
                    dispatch({
                        type: GET_CART_BY_USER,
                        cart: response.data
                    });
                }
            })
            .catch((error) => {
                debugger
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: error.response.data.message }
                    });
                }
            });
    }
};

export const getCartAllUser = () => {
    return (dispatch) => {
        cartService.getCartAllUser()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_BUY_ALL_USER,
                        cartall: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: "" }
                    });
                }
            });
    }
};

export const removeFromCart = (cartId) => {
    return (dispatch) => {
        cartService.removeFromCart(cartId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_FROM_CART,
                        cartId: cartId
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

export const buyCourse = (cartId) => {
    return (dispatch) => {
        cartService.buyCourse(cartId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: BUY_COURSE,
                        cartId: cartId
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

export const getBoughtCourseByUser = (userId) => {
    return (dispatch) => {
        cartService.getBoughtCourseByUser(userId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_BOUGHT_COURSE_BY_USER,
                        boughtCourse: response.data
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