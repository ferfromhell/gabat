import axios from 'axios';
import { 
  GET_PUESTOS, 
  GET_ERRORS, 
  SET_CURRENT_USER, 
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
} from './types';


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
export const getPuestos = () => dispatch => {
  axios
    .get('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=position')
    .then(res =>
      {
        dispatch({
        type: GET_PUESTOS,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const getCategorias = (puesto) => dispatch => {
  axios
    .get('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=category&puesto='+puesto)
    .then(res =>
      {
        dispatch({
        type: GET_CATEGORIAS,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Save table
export const saveTable = (table) => dispatch => {
  console.log(table);
  axios
    .post('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php', JSON.stringify({
      puesto: table.puesto,
      rows: table.rows,
      type: 'checklist'
    }))
    .then(res =>
      {
        console.log(res)
        dispatch({
        type: SAVE_TABLE,
        payload: res.data
      })}
    )
    .catch(err =>{
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    );
};
//ADD PUESTO
export const addPuesto = puesto =>{
  return {
    type: ADD_PUESTO,
    payload: puesto
  };
};
export const showModal = isOpen =>{
  return {
    type: SHOW_MODAL,
    payload: isOpen
  };
};
//
export const addRow = rowData =>{
  return {
    type: ADD_CATEGORY_ROW,
    payload: rowData
  };
};
//Add extra row
export const addExtraRow = rowsData =>{
  return {
    type: ADD_EXTRA_ROW,
    payload: rowsData
  };
};
//update Row
export const updateRow = data =>{
  return {
    type: UPDATE_ROW,
    payload:data
  };
};
//update Row
export const updateRowInput = data =>{
  return {
    type: UPDATE_ROW_INPUT,
    payload:data
  };
};
//update Row
export const updateRowInputCat = data =>{
  return {
    type: UPDATE_ROW_INPUT_CAT,
    payload:data
  };
};
//Delete row
export const deleteRow = rowData =>{
  return {
    type: DELETE_ROW,
    payload: rowData
  };
};

// export const getPuestos = () => dispatch => {
//   axios.get()
//     .then(res =>
//       dispatch({
//         type:GET_PUESTOS,
//         payload: res.data
//       }))
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
// };