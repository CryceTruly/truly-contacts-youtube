import { CLEAR_ADD_CONTACT } from "../../../constants/actionTypes";

export default () => (dispatch) => {
  dispatch({
    type: CLEAR_ADD_CONTACT,
  });
};
