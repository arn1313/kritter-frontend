import uuid from 'uuid/v1';

export const postCreate = (expense) => {
  return {
    type: 'POST_CREATE',
    payload: {...expense, id: uuid(), timestamp: new Date()},
  };
};

export const postUpdate = (expense) => ({
  type: 'POST_UPDATE',
  payload: {...expense},
});

export const postDelete = (expense) => ({
  type: 'POST_DELETE',
  payload: {...expense},
});
