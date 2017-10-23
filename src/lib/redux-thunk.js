export default store => next => action => {
  console.log(action);
  return typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
};
