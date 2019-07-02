import update from 'immutability-helper';
import { 
  SET_CURRENT_USER_DISPLAY,
  GET_PUESTOS_DISPLAY, 
  ADD_PUESTO_DISPLAY,
  GET_CHECKLIST,
  SET_ROWS,
  UPDATE_ROW_DISPLAY,
  SAVE_TABLE_DISPLAY
} from '../actions/types';

const initialState = {
  user: {},
  puestos: [],
  puestoSelect: '',
  errors: {},
  rows: [],
  saved: {
    Succes:false
  },
  checklist: {}
};

export default (state= initialState,action) => {
  switch(action.type){
    case SET_CURRENT_USER_DISPLAY: 
      return{
        ...state,
        user: action.payload
      }
    case GET_PUESTOS_DISPLAY:
      return{
        ...state,
        puestos: action.payload
      }
    case ADD_PUESTO_DISPLAY:
      return{
        ...state,
        puestoSelect: action.payload
      }
    case GET_CHECKLIST:
      return{
        ...state,
        checklist: action.payload
      }
    case SET_ROWS:
      return{
        ...state,
        rows: action.payload
      }
    case UPDATE_ROW_DISPLAY:
      const rowIndex=(action.payload.i.index);
      const newValue=(action.payload.value);
      return update(state, {rows: { [rowIndex]: {answer: {$set: newValue}}}});
    case SAVE_TABLE_DISPLAY:
      return{
        ...state,
        saved: action.payload
      }
      default:
      return state;
  }
}