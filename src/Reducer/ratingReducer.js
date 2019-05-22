const INITIAL_STATE = {
    ratings: [],
    rate:[]
}

export const ADD_RATINGS = 'ADD_RATINGS';
export const GET_RATINGS = 'GET_RATINGS';
export const FAILED = 'FAILED';
export const GET_ALL_RATE = 'GET_ALL_RATE'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_RATINGS: {
            var data = state.ratings.map(ratings => ratings.courseId === action.id ? action.rates : ratings)
            return Object.assign({}, state, { ratings: data });
        }
        case GET_RATINGS: {
            return Object.assign({}, state, { ratings: action.ratings });
        }
        case GET_ALL_RATE: {
            return Object.assign({}, state, { rate: action.allrate });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}