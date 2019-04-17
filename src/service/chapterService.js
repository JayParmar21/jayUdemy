import BaseService from './baseService'

export function addChapter(data) {
    return BaseService.post('/chapter/add/chapter', data);
}

export function getChapterByCourseId(courseId) {
    return BaseService.get('/chapter/getChapter/' + courseId);
}
