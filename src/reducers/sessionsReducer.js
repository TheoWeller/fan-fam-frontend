import { LOGIN_SUCCESS } from '../actions/sessionActions'

const initialState = {
  error: false,
  authenticated: false,
  currentUser: null,
  loading: true
}

export default (state = initialState, action) => {

  switch(action.type) {

    case LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
        loading: false
      }
    case "LOGIN":
      return {}
    case "LOGOUT":
      localStorage.removeItem("token")
      return {...initialState, loading: false}
    case "LOADING":
      return {...state, loading: true}
    case "ERROR":
    console.log("ERROR AUTH", action);
      return {...state, error: true}
      default:
      return state;
    }
  }
