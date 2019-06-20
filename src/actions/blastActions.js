
/****************************************************************
FETCH
****************************************************************/
export const postToBlastCreate = (blastContent, route) => {
  return (dispatch) => {
      dispatch( { type: "BLAST_PENDING" } );
      return fetch(`http://localhost:3000/api/v1/blast/${route}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blastContent)
      })
      .then(response => response.json())
        .then(data => {
        if (data.error){
          dispatch({ type: "BLAST_ERROR", payload: data })
        } else {
          dispatch({ type: "BLAST_SUCCESS", payload: data })
        }
        return data
      }
    )
    .catch(error => {
      return error;
    })
  }
}
