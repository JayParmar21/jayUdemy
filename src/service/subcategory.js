import BaseService from './baseService'

export function getSubCategory(catId) {
    return BaseService.get('/subcategory/' + catId);
}
