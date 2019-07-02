// import update from 'immutability-helper';
import { 
  GET_PUESTOS_RESULTS,
} from '../actions/types';

const initialState = {
  puestos: []
}

export default (state= initialState,action) => {
  switch(action.type){
    case GET_PUESTOS_RESULTS:
      return{
        ...state,
        puestos: action.payload
      }
    // case SHOW_MODAL:
    //   return{
    //     // ...state,
    //     // saved: action.payload
    //     initialState
    //   }
    default:
      return state;
  }
}