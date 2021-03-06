export default (state=[], action) => {
  let {type, payload} = action;
  switch(type) {

  case 'persist/REHYDRATE':
    return {...state, persistedState: action.payload };
  case 'USER_SET':
    return payload;
  case 'USER_CREATE':
    return [payload, ...state];
  case 'USER_UPDATE':
    return payload;
    // return state.map(item => item._id === payload._id ? payload : item);
  case 'USER_DELETE':
    return state.filter(item => item._id !== payload._id);
  default: return state;
  }
};