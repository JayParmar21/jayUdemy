import * as chapterService from '../service/chapterService';
import { FAILED, ADD_CHAPTER, GET_CHAPTER_BY_COURSE } from '../Reducer/chapterReducer';

export const addChapter = (data) => {
    return (dispatch) => {
        chapterService.addChapter(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_CHAPTER,
                        addChapter: response.data
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

export const getChapterByCourseId = (courseId) => {
    return (dispatch) => {
        chapterService.getChapterByCourseId(courseId)
            .then((response) => {
                if (response.status === 200) {
                    var files = [];
                    response.data.map((item, i) => {
                        files[i] = JSON.parse(item.files);
                        response.data[i].files = files[i];
                        return item.files;
                    })
                    dispatch({
                        type: GET_CHAPTER_BY_COURSE,
                        chapter: response.data
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