import axiosInstance from "../../../helpers/axiosInstance";
import { CONNECTION_ERROR } from "../../../constants/api";
import {
  CONTACTS_LOADING,
  CONTACTS_LOAD_SUCCESS,
  CONTACTS_LOAD_ERROR,
} from "../../../constants/actionTypes";

export default (history) => (dispatch) => {
  dispatch({
    type: CONTACTS_LOADING,
  });
  axiosInstance(history)
    .get("/contacts/")
    .then((res) => {
      dispatch({
        type: CONTACTS_LOAD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CONTACTS_LOAD_ERROR,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
    });
};
