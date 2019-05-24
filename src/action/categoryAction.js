import * as categoryService from '../service/category';
import * as courseService from '../service/CourseService';
import { FAILED, GET_CATEGORY, GET_COURSE_BY_CID } from '../Reducer/categoryReducer';

export const getCategory = () => {
    return async (dispatch) => {
        categoryService.getCategory()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_CATEGORY,
                        category: response.data
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

export const getCourseByCID = (cid) => {
    return async (dispatch) => {
        courseService.getCourseByCID(cid)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_COURSE_BY_CID,
                        courses: response.data
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