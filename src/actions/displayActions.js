import axios from 'axios';
import { 
  GET_PUESTOS_DISPLAY, 
  GET_ERRORS_DISPLAY, 
  SET_CURRENT_USER_DISPLAY, 
  ADD_PUESTO_DISPLAY, 
  GET_CHECKLIST,
  SET_ROWS,
  UPDATE_ROW_DISPLAY,
  UPDATE_ROW_INPUT_DISPLAY,
  SAVE_TABLE_DISPLAY
} from './types';

//Display Checklist
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER_DISPLAY,
    payload: decoded
  };
};
export const getPuestos = () => dispatch => {
  axios
    .get('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=positionCL')
    .then(res =>
      {
        dispatch({
        type: GET_PUESTOS_DISPLAY,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_DISPLAY,
        payload: err.data
      })
    );
};
export const getChecklist = (puesto) => dispatch => {
  const url= 'https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=checklist&puesto='+puesto;
  // console.log(url)
  axios
    .get(url)
    .then(res =>
      {
        let rowsCL = JSON.parse(res.data['Data']['rows']);
        // console.log(rowsCL);
        dispatch({
        type: GET_CHECKLIST,
        payload: res.data
        });
        dispatch(
          {
            type: SET_ROWS,
            payload: rowsCL
          });
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_DISPLAY,
        payload: err.response
      })
    );
};
//ADD PUESTO
export const addPuesto = puesto =>{
  return {
    type: ADD_PUESTO_DISPLAY,
    payload: puesto
  };
};
//update Row
export const updateRowDisplay = data =>{
  return {
    type: UPDATE_ROW_DISPLAY,
    payload:data
  };
};
//update Row
export const updateRowInput = data =>{
  return {
    type: UPDATE_ROW_INPUT_DISPLAY,
    payload:data
  };
};
// export const setRows = rows =>{
//   return {
//     type: SET_ROWS,
//     payload: rows
//   };
// };

// Save table
export const saveTableDisplay = (table) => dispatch => {
  console.log(table);
  axios
    .post('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php', JSON.stringify({
      puesto: table.puesto,
      rows: table.rows,
      type: 'answer'
    }))
    .then(res =>
      {
        console.log(res)
        dispatch({
        type: SAVE_TABLE_DISPLAY,
        payload: res.data
      })}
    )
    .catch(err =>{
        console.log(err);
        dispatch({
          type: GET_ERRORS_DISPLAY,
          payload: err.response.data
        })
      }
    );
};