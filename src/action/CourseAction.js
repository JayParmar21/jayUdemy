import * as courseService from '../service/CourseService';
import { FAILED, ADD_COURSE, GET_COURSE, GET_COURSE_BY_USER, DELETE_COURSE, UPDATE_COURSE, GET_COURSE_BY_COURSE_ID } from '../Reducer/CourseReducer';

export const addCourse = (data) => {
    return (dispatch) => {
        courseService.addCourse(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_COURSE,
                        add_course: response.data
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

export const getCourse = () => {
    return (dispatch) => {
        courseService.getCourse()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_COURSE,
                        course: response.data
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

export const getCourseByCourseID = (courseId) => {
    return (dispatch) => {
        courseService.getCourseByCourseID(courseId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_COURSE_BY_COURSE_ID,
                        getCourseByCid: response.data
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

export const getCourseByUID = (userId) => {
    return (dispatch) => {
        courseService.getCourseByUID(userId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_COURSE_BY_USER,
                        course: response.data
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

export const deleteCourse = (courseId) => {
    return (dispatch) => {
        courseService.deleteCourse(courseId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_COURSE,
                        courseId: courseId
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

export const editCourse = (courseId, updatedData) => {
    return (dispatch) => {
        courseService.editCourse(courseId, updatedData)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: UPDATE_COURSE,
                        id: courseId,
                        updatedData: response.data[0]
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