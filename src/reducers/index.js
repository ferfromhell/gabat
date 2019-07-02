import { combineReducers} from 'redux';
import checklistReducer from './checklistReducer';
import displayReducer from './displayReducer';
import resultReducer from './resultsReducer';
import pncReducer from './pncReducer';

export default combineReducers({
  checklist: checklistReducer,
  display: displayReducer,
  results: resultReducer,
  pnc: pncReducer
})