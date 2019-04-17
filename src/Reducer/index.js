import { combineReducers } from 'redux';

import auth from './authReducer';
import category from './categoryReducer'
import subcategory from './subcategoryReducer'
import course from './CourseReducer';
import chapter from './chapterReducer'
import cart from './cartReducer';


export default combineReducers({ auth, category, subcategory, course, chapter, cart });