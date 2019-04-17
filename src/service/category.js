import BaseService from './baseService'

export function getCategory() {
    return BaseService.get('/category/getCategory');
}
