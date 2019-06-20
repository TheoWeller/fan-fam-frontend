export default (state = {loading: false, error: false, isSubscribed: false}, action) => {

switch(action.type) {

  case "SUBSCRIPTION_SUCCESS":
    console.log("SUB-SUCESS", action.payload);
    return {...state, loading: false, isSubscribed: true}
  case "SUBSCRIPTION_LOADING":
  return {...state, loading: true}
  case "SUB-ERROR":
  console.log("SUB-ERROR", action.payload);
    return {...state, error: true}
    default:
    return state;
  }
}
