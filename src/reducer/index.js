import {combineReducers} from 'redux';
import auth from './auth';
import post from './post';
import user from './user';
import username from './username';

export default combineReducers({
  auth,
  user,
  post,
  username,
});