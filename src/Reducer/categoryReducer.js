const INITIAL_STATE = {
    category: [],
    courses: [],
    error_msg: ""
}

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_COURSE_BY_CID = 'GET_COURSE_BY_CID';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORY: {
            return Object.assign({}, state, {
                category: action.category
            });
        }
        case GET_COURSE_BY_CID: {
            return Object.assign({}, state, {
                courses: action.courses, error_msg: ""
            });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg, courses: [] });
        }
        default:
            return state;
    }
}