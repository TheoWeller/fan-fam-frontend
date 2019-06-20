
export default (state = {loading: false, error: false, blastData: null}, action) => {

  switch(action.type) {
    case "BLAST_SUCCESS":
      console.log("SUCCESS", action.payload);
      return {...state, loading: false}
    case "BLAST_PENDING":
      return {...state, loading: true}
    case "BLAST_ERROR":
      console.log("BLAST ERROR", action);
      return {...state, error: true, blastData: action.payload}
    default:
      return state;
    }

  }
