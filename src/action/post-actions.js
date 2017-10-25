import uuid from 'uuid/v1';
import superagent from 'superagent';


export const postCreate = (post) => {
  return {
    type: 'POST_CREATE',
    payload: {...post, id: uuid()},
  };
};

export const postUpdate = (post) => ({
  type: 'POST_UPDATE',
  payload: {...post},
});

export const postDelete = (post) => ({
  type: 'POST_DELETE',
  payload: {...post},
});

export const postSet = post => ({
  type:'POST_SET',
  payload: post,
});


export const postFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/post/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(postSet(res.body.data));
      return res;
    });
};

export const postFetchAllRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/post`)
    .then(res => {
      dispatch(postSet(res.body.data));
      return res;
    });
};

export const postCreateRequest = (post) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/post`)
    .set('Authorization', `Bearer ${auth}`)
    .set('Content-Type', 'application/json')
    // .field('description', post.description)
    // .field('url', post.url)
    // .field('timeStamp', post.timeStamp)
    // .field('ownerName', post.ownerName)
    // .field('ownerAvatar', post.ownerAvatar)
    // .attach('post', post.post)
    .send(post)
    .then((res) => {
      dispatch(postCreate(res.body));
      return res;
    });
};

export const postDeleteRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/post/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(postDelete(photo));
      return res;
    });
};

export const postUpdateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.put(`${__API_URL__}/post/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
  // .attach('photo', photo.photo)
    .then(res => {
      dispatch(postUpdate(res.body));
      return res;
    });
};