export default (state=[], action) => {
  let {type, payload} = action;
  switch(type) {
  case 'POST_SET':
    return payload;
  case 'POST_CREATE':
    return [payload, ...state];
  case 'POST_UPDATE':
    return state.map(item => item._id === payload._id ? payload : item);
  case 'POST_DELETE':
    return state.filter(item => item._id !== payload._id);
  default: return state;
  }
};