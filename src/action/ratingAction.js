import * as ratingsService from '../service/ratingsService';
import { FAILED, ADD_RATINGS, GET_RATINGS, GET_ALL_RATE } from '../Reducer/ratingReducer';

export const addRatings = (rates) => {
    return (dispatch) => {
        ratingsService.addRatings(rates)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_RATINGS,
                        id: rates.courseId,
                        rates: rates
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

export const getRatings = (userId) => {
    return (dispatch) => {
        ratingsService.getRatings(userId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_RATINGS,
                        ratings: response.data
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

export const getAllRate = () => {
    debugger
    return (dispatch) => {
        ratingsService.getAllRate()
            .then((response) => {
                debugger
                if (response.status === 200) {
                    dispatch({
                        type: GET_ALL_RATE,
                        allrate: response.data
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