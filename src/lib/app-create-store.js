import reducer from '../reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';

let appStoreCreate = () =>
  createStore(reducer, undefined, compose(applyMiddleware(thunk, reporter), autoRehydrate({log:true})));


export default appStoreCreate;


