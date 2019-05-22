import BaseService from './baseService'

export function addRatings(rate) {
    return BaseService.post('/rate/addRatings', rate);
}

export function getRatings(userId) {
    return BaseService.get('/rate/ratings/' + userId)
}
export function getAllRate() {
    debugger
    return BaseService.get('/rate/allrate')
}