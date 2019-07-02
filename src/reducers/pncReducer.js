import update from 'immutability-helper';
import {
  GET_LEVELS, SET_SELECT, SET_QS, UPDATE_ROW_PNC, SAVE_TABLE_PNC, GET_CHECKLIST_PNC, SET_ROWS_PNC,
  UPDATE_RESP_PNC,
  SAVE_ANSWER_PNC
} from '../actions/types';

const initialState = {
  allLevels:{},
  levelsSelect: [],
  allQs: [],
  rowsPNC: []
}

export default (state= initialState,action) => {
  switch(action.type){
    case GET_LEVELS: 
      return{
        ...state,
        allLevels: action.payload
      }
    case SET_SELECT:
      //console.log(action.payload);
      // const index=(action.payload.i.index);
      //const info=(action.payload.value);
      // return update(state, {levelsSelect: { [rowIndexInput]:  {$set: newValueInput}}});
      return {
        ...state,
        levelsSelect: action.payload
      }
    case SET_QS:
      console.log(action.payload);
      // const index=(action.payload.i.index);
      //const info=(action.payload.value);
      // return update(state, {levelsSelect: { [rowIndexInput]:  {$set: newValueInput}}});
      return {
        ...state,
        allQs: [...state.allQs,action.payload]
      }
    case GET_CHECKLIST_PNC:
      return{
        ...state,
        checklist: action.payload
      }
    case SET_ROWS_PNC:
      return{
        ...state,
        rowsPNC: action.payload
      }
    case UPDATE_ROW_PNC:
      const rowIndex=(action.payload.i.index);
      const newValue=(action.payload.value);
      return update(state, {allQs: { [rowIndex]: {response: {$set: newValue}}}});
    // used in /view
    case UPDATE_RESP_PNC:
        const rowIndexPNC=(action.payload.i.index);
        const newValuePNC=(action.payload.value);
        return update(state, {rowsPNC: { [rowIndexPNC]: {response: {$set: newValuePNC}}}});
    case SAVE_ANSWER_PNC:
      return{
        ...state,
        saved: action.payload
      }
    case SAVE_TABLE_PNC:
      return{
        ...state,
        saved: action.payload
      }
    default:
      return state;
  }
}

