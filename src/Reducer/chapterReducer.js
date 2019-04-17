const INITIAL_STATE = {
    add_chapter: [],
    chapter: []
}

export const ADD_CHAPTER = 'ADD_CHAPTER';
export const GET_CHAPTER_BY_COURSE = 'GET_CHAPTER_BY_COURSE';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CHAPTER: {
            return Object.assign({}, state, { add_chapter: action.addChapter });
        }
        case GET_CHAPTER_BY_COURSE: {
            return Object.assign({}, state, { chapter: action.chapter })
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg, course: [] });
        }
        default:
            return state;
    }
}