import {
  ADD_REMOVE_STAR_LOADING,
  ADD_REMOVE_STAR_SUCCESS,
  ADD_REMOVE_STAR_ERROR,
} from "../../../constants/actionTypes";
import axiosInstance from "../../../helpers/axiosInstance";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (id, is_favorite) => (dispatch) => {
  dispatch({
    type: ADD_REMOVE_STAR_LOADING,
    payload: id,
  });

  axiosInstance()
    .patch(`/contacts/${id}`, { is_favorite })
    .then((res) => {
      dispatch({
        type: ADD_REMOVE_STAR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_REMOVE_STAR_ERROR,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
    });
};
