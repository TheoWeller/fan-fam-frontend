import { combineReducers } from 'redux';
import sessionsReducer from './sessionsReducer';
import subscriptionReducer from './subscriptionReducer';
import blastReducer from './blastReducer';

export default combineReducers({
  sessionsReducer,
  subscriptionReducer,
  blastReducer
});
