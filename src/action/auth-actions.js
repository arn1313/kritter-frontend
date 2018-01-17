import superagent from 'superagent';
//auth actions
export const userSet = user => ({
  type: 'USER_SET',
  payload: user,
});

export const userCreate = user => ({
  type: 'USER_CREATE',
  payload: user,
});

export const userUpdate = user => ({
  type: 'USER_UPDATE',
  payload: user,
});


export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenSetRequest = token => dispatch => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(tokenSet(token)));
  });
  // window.location.href = '/home'
};


export const tokenDelete = () => ({ type: 'TOKEN_DELETE', payload: null });

export const logoutProfile = () => ({ type: 'LOGOUT_PROFILE', payload: null });

export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/signup`)

    .send(user)
    .attach(user.avatar)
    .then(res => {
      dispatch(tokenSet(res.text));
      try {
        localStorage.token = res.text;
      } catch (e) {
        console.error(e);
      }
      return res;
    })
    // .then(window.location.href = '/settings')
    .catch(console.error);

};
export const loginRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      dispatch(tokenSet(res.text));
      return res;
    })
    .then(localStorage.clear());
};
// .then(window.location.href = '/home');


export const userFetchRequest = () => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.get(`${__API_URL__}/user/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      console.log('hit')
      dispatch(userSet(res.body));
      return res;
    });
};

export const userCreateRequest = user => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.post(`${__API_URL__}/user`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', user.bio)
    // .attach('avatar', user.avatar)
    .then(res => {
      dispatch(userCreate(res.body));
      return res;
    });
};

export const userUpdateRequest = (user) => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.put(`${__API_URL__}/user/${user._id}`)
    .set('Authorization', `Bearer ${auth}`)

    .field('email', user.email)
    .field('bio', user.bio)
    .field('species', user.species)
    .attach('avatar', user.avatar)
    .then(res => {
      dispatch(userUpdate(res.body));
      return res;
    });
};
