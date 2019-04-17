const INITIAL_STATE = {
    add_course: [],
    error_msg: "",
    course: [],
    coursebyuser: [],
    getCourseByCid: []
}

export const ADD_COURSE = 'ADD_COURSE';
export const FAILED = 'FAILED';
export const GET_COURSE = 'GET_COURSE';
export const GET_COURSE_BY_USER = 'GET_COURSE_BY_USER';
export const GET_COURSE_BY_COURSE_ID = 'GET_COURSE_BY_COURSE_ID';
export const DELETE_COURSE = 'DELETE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_COURSE: {
            return Object.assign({}, state, { course: state.course.concat(action.add_course) });
        }
        case GET_COURSE: {
            return Object.assign({}, state, { course: action.course, error_msg: "" });
        }
        case GET_COURSE_BY_COURSE_ID: {
            return Object.assign({}, state, { getCourseByCid: action.getCourseByCid, error_msg: "" });
        }
        case GET_COURSE_BY_USER: {
            return Object.assign({}, state, { coursebyuser: action.course, error_msg: "" });
        }
        case DELETE_COURSE: {
            return Object.assign({}, state, { coursebyuser: state.coursebyuser.filter(data => data.id !== action.courseId) });
        }
        case UPDATE_COURSE: {
            var data = state.coursebyuser.map(c => c.id === action.id ? action.updatedData : c)
            return Object.assign({}, state, { coursebyuser: data });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg, course: [] });
        }
        default:
            return state;
    }
}