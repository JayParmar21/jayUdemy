import BaseService from './baseService'

export function addToCart(data) {
    return BaseService.post('/cart/addToCart', data);
}

export function getCartByUser(userId) {
    return BaseService.get('/cart/getByUser/' + userId);
}

export function getCartAllUser() {
    return BaseService.get('/cart/getBuyallUser');
}

export function removeFromCart(cartId) {
    return BaseService.delete('/cart/remove/FromCart/' + cartId);
}

export function buyCourse(cartId) {
    return BaseService.put('/cart/buycourse/' + cartId);
}

export function getBoughtCourseByUser(userId) {
    return BaseService.get('/cart/boughtCourse/user/' + userId);
}