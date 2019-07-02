import axios from 'axios';
import {
  GET_LEVELS,
  GET_ERRORS_PNC,
  SET_SELECT,
  SET_QS,
  UPDATE_ROW_PNC,
  SAVE_TABLE_PNC,
  GET_ERRORS,
  GET_CHECKLIST_PNC,
  SET_ROWS_PNC,
  UPDATE_ROW_INPUT_PNC,
  UPDATE_RESP_PNC,
  SAVE_ANSWER_PNC
} from './types';

export const getLevels = (level,parent) => dispatch => {
  axios
    .get('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=LevelsPNC&level='+level+'&parent='+parent)
    .then(res =>
      {
        dispatch({
        type: GET_LEVELS,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_PNC,
        payload: err.response.data
      })
    );
};
export const setSelect = data =>{
  return {
    type: SET_SELECT,
    payload:data
  };
};
export const setQs = data =>{
  return {
    type: SET_QS,
    payload:data
  };
};
// GET checlist
export const getChecklistPNC = (puesto) => dispatch => {
  const url= 'https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=checklistPNC&puesto='+puesto;
  // console.log(url)
  axios
    .get(url)
    .then(res =>
      {
        let rowsCL = JSON.parse(res.data['Data']['rows']);
        console.log(rowsCL);
        dispatch({
        type: GET_CHECKLIST_PNC,
        payload: res.data
        });
        dispatch(
          {
            type: SET_ROWS_PNC,
            payload: rowsCL
          });
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_PNC,
        payload: err.response
      })
    );
};
//update Row
export const updateRowPNC = data =>{
  return {
    type: UPDATE_ROW_PNC,
    payload:data
  };
};
export const updateRespPNC = data =>{
  return {
    type: UPDATE_RESP_PNC,
    payload:data
  };
};
//update Row
export const updateRowInputPNC = data =>{
  return {
    type: UPDATE_ROW_INPUT_PNC,
    payload:data
  };
};
//Save table
export const saveTablePNC = (table) => dispatch => {
  console.log(table);
  axios
    .post('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php', JSON.stringify({
      puesto: table.puesto,
      rows: table.rows,
      type: 'checklistPNC'
    }))
    .then(res =>
      {
        console.log(res)
        dispatch({
        type: SAVE_TABLE_PNC,
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
//save answers PNC
export const saveAnswerPNC = (table) => dispatch => {
  console.log('save pnc');
  console.log(table);
  axios
    .post('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php', JSON.stringify({
      puesto: table.puesto,
      rows: table.rowsPNC,
      type: 'answerPNC'
    }))
    .then(res =>
      {
        console.log(res)
        dispatch({
        type: SAVE_ANSWER_PNC,
        payload: res.data
      })}
    )
    .catch(err =>{
        console.log(err);
        dispatch({
          type: GET_ERRORS_PNC,
          payload: err.response.data
        })
      }
    );
};
