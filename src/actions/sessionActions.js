export { login, autoLogin, signUp, logout, LOGOUT, LOGIN, LOGIN_SUCCESS};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SIGNUP = 'SIGNUP'

const login = (email, password) => {
  return {type: LOGIN, email, password}
}

const autoLogin = (token) => {
  return {type: LOGIN, payload: token}
}

const logout = () => {
  return {type: LOGOUT, payload: {}}
}

const signUp = (email, username, password, phone) => {
  return {type: SIGNUP, email, username, password, phone}
}

/****************************************************************
FETCHES
****************************************************************/
export const postToArtistCreate = (credentials, loginOrSignup) => {
  return (dispatch) => {
    dispatch( { type: "LOADING" } );
    return fetch(`http://localhost:3000/api/v1/artist/${loginOrSignup}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
      .then(data => {
      if (data.error){
        dispatch({ type: "ERROR", payload: data })
      } else {
        console.log("BACK2DATA", data);
        localStorage.setItem("token", data.token)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
      }
      return data
    }

    )
    .catch(error => {
      return error;
    })
  }
}
