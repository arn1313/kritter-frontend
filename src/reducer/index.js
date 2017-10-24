import {combineReducers} from 'redux';
import auth from './auth';
import posts from './posts';
import user from './user';
import username from './username';

export default combineReducers({
  auth,
  user,
  posts,
  username,
});