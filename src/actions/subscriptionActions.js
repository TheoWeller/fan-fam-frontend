

/****************************************************************
FETCHES
****************************************************************/
export const postToSubscriptionCreate = (credentials) => {

  return (dispatch) => {
      dispatch( { type: "SUBSCRIPTION_LOADING" } );
      return fetch(`http://fan-fam-backend.herokuapp.com/api/v1/subscribe`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      .then(response => response.json())
        .then(data => {
          console.log("SUB DATA", data);
        if (data.error){
          dispatch({ type: "SUBSCRIPTION_ERROR", payload: data })
        } else {
          dispatch({ type: "SUBSCRIPTION_SUCCESS", payload: data })
        }
      }
    )
    .catch(error => {
      return error;
    })
  }
}

export const updateSubscriptionProps = (props) => {
  return (dispatch) => {
      dispatch( { type: "SUBSCRIPTION_LOADING" } );
      return fetch(`http://fan-fam-backend.herokuapp.com/api/v1/subscribe/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props)
      })
      .then(response => response.json())
        .then(data => {
          console.log("SUB DATA", data);
        if (data.error){
          dispatch({ type: "SUBSCRIPTION_ERROR", payload: data })
        } else {
          dispatch({ type: "SUBSCRIPTION_SUCCESS", payload: data })
        }
      }
    )
    .catch(error => {
      return error;
    })
  }
}
