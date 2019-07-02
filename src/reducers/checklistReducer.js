import update from 'immutability-helper';
import { 
  SET_CURRENT_USER,
  GET_PUESTOS, 
  GET_CATEGORIAS, 
  ADD_CATEGORY_ROW, 
  DELETE_ROW,
  ADD_EXTRA_ROW, 
  ADD_PUESTO,
  SAVE_TABLE,
  UPDATE_ROW,
  UPDATE_ROW_INPUT,
  UPDATE_ROW_INPUT_CAT,
  SHOW_MODAL
} from '../actions/types';

const initialState = {
  user: {},
  puestos: [],
  puestoSelect: '',
  categorias: [],
  errors: {},
  rows: [],
  saved: {
    Succes:false
  },
  checklist: {}
};

export default (state= initialState,action) => {
  switch(action.type){
    case SET_CURRENT_USER: 
      return{
        ...state,
        user: action.payload
      }
    case GET_PUESTOS:
      return{
        ...state,
        puestos: action.payload
      }
    case ADD_PUESTO:
      return{
        ...state,
        puestoSelect: action.payload
      }
    case GET_CATEGORIAS:
      return{
        ...state,
        categorias: action.payload
      }
    case ADD_CATEGORY_ROW:
      return{
        ...state,
        rows: [...state.rows,action.payload]
      }
    case ADD_EXTRA_ROW:
      return{
        ...state,
        rows: action.payload
      }
    case DELETE_ROW:
      return{
        ...state,
        rows: action.payload
      }
    case UPDATE_ROW:
      const rowIndex=(action.payload.i.index);
      const newValue=(action.payload.value);
      return update(state, {rows: { [rowIndex]: {response: {$set: newValue}}}});
    case UPDATE_ROW_INPUT:
      const rowIndexInput=(action.payload.i.index);
      const newValueInput=(action.payload.value);
      return update(state, {rows: { [rowIndexInput]: {activityInput: {$set: newValueInput}}}});
    case UPDATE_ROW_INPUT_CAT:
      const rowIndexCat=(action.payload.i.index);
      const newValueCat=(action.payload.value);
      return update(state, {rows: { [rowIndexCat]: {categorySelect: {$set: newValueCat}}}});
    case SAVE_TABLE:
      return{
        ...state,
        saved: action.payload
      }
    case SHOW_MODAL:
      return{
        // ...state,
        // saved: action.payload
        initialState
      }
    default:
      return state;
  }
}