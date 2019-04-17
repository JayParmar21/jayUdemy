const INITIAL_STATE = {
    subcategory: []
}

export const GET_SUB_CATEGORY = 'GET_SUB_CATEGORY';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SUB_CATEGORY: {
            return Object.assign({}, state, {
                subcategory: action.subcategory
            });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        default:
            return state;
    }
}