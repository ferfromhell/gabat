import axios from 'axios';
import { 
  GET_PUESTOS_RESULTS, 
  GET_ERRORS_RESULTS, 
} from './types';

export const getPuestos = () => dispatch => {
  axios
    .get('https://gabat.ac-labs.com.mx/NewSIIL/Mantenimiento/Development/PNC/api_cl_aclab.php?api=positionCL')
    .then(res =>
      {
        dispatch({
        type: GET_PUESTOS_RESULTS,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_RESULTS,
        payload: err.data
      })
    );
};

