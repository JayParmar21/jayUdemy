import BaseService from './baseService'

export function addCourse(data) {
    return BaseService.post('/course/add/course', data);
}

export function getCourse() {
    return BaseService.get('/course/getCourse');
}

export function getCourseByCID(catid) {
    return BaseService.get('/course/getByCategory/' + catid);
}

export function getCourseByCourseID(courseid) {
    return BaseService.get('/course/getCourse/' + courseid);
}

export function getCourseByUID(userid) {
    return BaseService.get('/course/getByUser/' + userid);
}

export function deleteCourse(courseId) {
    return BaseService.delete('/course/remove/course/' + courseId);
}

export function editCourse(courseId, updatedData) {
    return BaseService.put('/course/update/' + courseId, updatedData)
}
