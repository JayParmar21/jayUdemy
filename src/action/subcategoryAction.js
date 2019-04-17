import * as subcategoryService from '../service/subcategory';
import { FAILED, GET_SUB_CATEGORY } from '../Reducer/subcategoryReducer';

export const getSubCategory = (catId) => {
    return (dispatch) => {
        subcategoryService.getSubCategory(catId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_SUB_CATEGORY,
                        subcategory: response.data
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
